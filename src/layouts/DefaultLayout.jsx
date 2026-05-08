import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DefaultLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false); // desktop: icon-only
  const [mobileOpen, setMobileOpen] = useState(false); // mobile: open/close

  const isMobile = () => window.innerWidth < 1024;

  const toggleSidebar = () => {
    if (isMobile()) {
      setMobileOpen((v) => !v);
    } else {
      setCollapsed((v) => !v);
    }
  };

  // ปิด mobile drawer เมื่อ resize ขึ้น desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Overlay มือถือ */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          transform transition-all duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={!collapsed}
        />
        <main className="flex-1 bg-gray-50 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}