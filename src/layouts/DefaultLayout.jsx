import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DefaultLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Desktop & Mobile */}
      {/* Desktop Sidebar (always visible on md+) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar (slide in/out) */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
        {/* Sidebar content */}
        <div className="relative w-64 bg-white h-full shadow-lg">
          <Sidebar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:ml-64">
        {/* Header with toggle button */}
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-full"
        />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 bg-gray-50 rounded-tl-2xl">
          {children}
        </main>
      </div>
    </div>
  );
}
