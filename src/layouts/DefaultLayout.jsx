import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";

export default function DefaultLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
