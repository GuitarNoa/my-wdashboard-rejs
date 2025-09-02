import React from "react";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Breadcrumb() {
  return (
    <nav
      className="flex items-center space-x-2 text-gray-600 text-sm mb-4 
             overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-4"
      aria-label="Breadcrumb"
    >
      {/* หน้าแรก */}
      <a
        href="/"
        className="flex items-center hover:text-blue-600 flex-shrink-0"
      >
        <HomeIcon className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline">Home</span>
      </a>

      <ChevronRightIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />

      {/* Dashboard */}
      <a
        href="/dashboard"
        className="hover:text-blue-600 flex-shrink-0 hidden sm:inline"
      >
        Dashboard
      </a>

      <ChevronRightIcon className="h-4 w-4 text-gray-400 flex-shrink-0 hidden sm:inline" />

      {/* Current Page */}
      <span className="text-gray-500 flex-shrink-0">Reports</span>
    </nav>
  );
}
