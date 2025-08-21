import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";

export default function DefaultLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Breadcrumb />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
