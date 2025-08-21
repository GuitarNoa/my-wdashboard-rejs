import React from "react";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Breadcrumb() {
  return (
    <nav
      className="flex items-center space-x-2 text-gray-600 text-sm mb-4"
      aria-label="Breadcrumb"
    >
      {/* หน้าแรก */}
      <a href="/" className="flex items-center hover:text-blue-600">
        <HomeIcon className="h-4 w-4 mr-1" />
        Home
      </a>

      <ChevronRightIcon className="h-4 w-4 text-gray-400" />

      {/* หน้า Dashboard */}
      <a href="/dashboard" className="hover:text-blue-600">
        Dashboard
      </a>

      <ChevronRightIcon className="h-4 w-4 text-gray-400" />

      {/* หน้าที่เปิดอยู่ */}
      <span className="text-gray-500">Reports</span>
    </nav>
  );
}
