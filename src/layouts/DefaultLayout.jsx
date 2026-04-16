import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DefaultLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-0 "
        }`}
      >
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      {/* Main area */}
      <div className="flex flex-col flex-1 transition-all duration-300 p-4">
        <Header
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="flex-1 bg-gray-50 overflow-y-auto">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}