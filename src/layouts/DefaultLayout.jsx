import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DefaultLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      
      {/* ===== Sidebar (Desktop) ===== */}
      <div className="hidden md:block">
        <div
          className={`fixed top-0 left-0 h-screen w-64 bg-white z-40 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar isOpen={true} />
        </div>
      </div>

      {/* ===== Sidebar (Mobile) ===== */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          isMobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isMobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar isOpen={true} />
        </div>
      </div>

      {/* ===== Main ===== */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        <Header
          onToggleSidebar={() => setIsSidebarOpen((p) => !p)}
          onToggleMobile={() => setIsMobileOpen((p) => !p)}
        />

        <main className="flex-1 bg-gray-50 overflow-y-auto">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}