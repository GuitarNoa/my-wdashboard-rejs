// DefaultLayout.jsx
import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const BREAKPOINT = 768; // md — iPad portrait ถือเป็น mobile, landscape ถือเป็น desktop

export default function DefaultLayout() {
  const { pathname } = useLocation();
  const contentRef = useRef(null);
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
    const close = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        document.querySelector('[aria-controls="sidebar"]')?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [mobileOpen]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
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
        inert={!isDesktop && !mobileOpen ? true : undefined}
        className={`
          fixed md:static inset-y-0 left-0 z-50
          transform transition-all duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <Sidebar key={pathname} collapsed={isDesktop && collapsed} onNavigate={() => setMobileOpen(false)} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div ref={contentRef} className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
