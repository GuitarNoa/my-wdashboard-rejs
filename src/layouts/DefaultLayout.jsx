import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DefaultLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Desktop */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex flex-col flex-1 md:ml-64">
        <Header className="w=full" />
        {/* Header */}
        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 bg-gray-100 rounded-tl-2xl">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
