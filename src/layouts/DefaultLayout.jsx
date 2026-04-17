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
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-0 overflow-hidden"
          }`}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </div>
      </div>

      {/* ===== Sidebar (Mobile / iPad) ===== */}
      {isMobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg md:hidden">
            <Sidebar isOpen={true} />
          </div>
        </>
      )}

      {/* ===== Main ===== */}
      <div className="flex flex-col flex-1">
        <Header
          onToggleSidebar={() => setIsSidebarOpen((p) => !p)}
          onToggleMobile={() => setIsMobileOpen((p) => !p)}
        />

        <main className="flex-1 bg-gray-50 overflow-y-auto">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
}
