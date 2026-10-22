// DefaultLayout.jsx
import { Suspense, useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const BREAKPOINT = 768; // md — iPad portrait ถือเป็น mobile, landscape ถือเป็น desktop

export default function DefaultLayout() {
  const { pathname } = useLocation();
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= BREAKPOINT,
  );

  const toggleSidebar = () => {
    if (!isDesktop) {
      setMobileOpen((v) => !v);
    } else {
      setCollapsed((v) => !v);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= BREAKPOINT;
      setIsDesktop(desktop);
      if (desktop) setMobileOpen(false);
    };
    handleResize(); // sync ค่าตอน mount ด้วย (กัน mismatch ถ้า render แรกยังไม่มี window)
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSidebarOpen = isDesktop ? !collapsed : mobileOpen;

  useEffect(() => {
    setMobileOpen(false);
    contentRef.current?.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.activeElement;
    const focusable = () => [...sidebarRef.current.querySelectorAll('a, button')].filter(node => node.getClientRects().length && !node.disabled);
    focusable()[0]?.focus();
    const close = (event) => {
      if (event.key === "Tab") {
        const items = focusable();
        const first = items[0];
        const last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
      if (event.key === "Escape") {
        setMobileOpen(false);
        document.querySelector('[aria-controls="sidebar"]')?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => { window.removeEventListener("keydown", close); previous?.focus(); };
  }, [mobileOpen]);

  return (
    <div className="flex h-dvh bg-slate-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
      <a href="#page-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:p-3 focus:text-teal-800">Skip to content</a>
      {/* Overlay — portrait (mobile + iPad portrait) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebarRef}
        role={mobileOpen ? "dialog" : undefined}
        aria-modal={mobileOpen ? true : undefined}
        aria-label={mobileOpen ? "Navigation" : undefined}
        inert={!isDesktop && !mobileOpen ? true : undefined}
        className={`
          fixed md:static inset-y-0 left-0 z-50
          transform transition-all duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <Sidebar key={pathname} collapsed={isDesktop && collapsed} onExpand={() => setCollapsed(false)} onClose={() => setMobileOpen(false)} onNavigate={() => setMobileOpen(false)} />
      </div>

      {/* Content */}
      <div inert={mobileOpen ? true : undefined} className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div id="page-content" tabIndex={-1} ref={contentRef} className="flex-1 overflow-y-auto bg-slate-50 dark:bg-gray-900">
          <div className="mx-auto w-full max-w-[1440px]"><Suspense fallback={<p role="status" className="p-10 text-center text-slate-500">Loading page…</p>}><Outlet /></Suspense></div>
        </div>
      </div>
    </div>
  );
}
