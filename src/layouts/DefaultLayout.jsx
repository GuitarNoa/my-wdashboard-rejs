import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DefaultLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar - Mobile (Drawer with animation) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="relative z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 translate-x-0">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:ml-64">
        {/* Header */}
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 bg-gray-50 rounded-tl-2xl">
          {children}
        </main>
      </div>
    </div>
  );
}
