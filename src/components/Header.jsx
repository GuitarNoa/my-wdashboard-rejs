// Header.jsx
import { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function Header({ onToggleSidebar, isSidebarOpen }) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex flex-col bg-white/80 backdrop-blur border-b border-gray-100">
      {/* Main bar */}
      <div className="flex items-center justify-between px-4 py-3 gap-2">
        {/* LEFT — hamburger */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 transition flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-700" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          )}
        </button>

        {/* Breadcrumb — ซ่อนบนมือถือเล็ก */}
        <span className="hidden sm:block text-sm text-gray-500 flex-shrink-0">
          Dashboard
        </span>

        {/* CENTER — search bar (ซ่อนบนมือถือ แสดงบน md ขึ้นไป) */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-md px-4 py-2 border border-gray-200 rounded-lg text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Search icon บนมือถือ */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
            onClick={() => setShowSearch((v) => !v)}
            aria-label="Search"
          >
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
          </button>

          <a
            href="/auth/login"
            className="text-sm font-medium text-gray-700 hover:text-black transition px-2 py-1"
          >
            Sign In
          </a>
        </div>
      </div>

      {/* Search bar ขยายบนมือถือ เมื่อกดไอคอน */}
      {showSearch && (
        <div className="md:hidden px-4 pb-3">
          <input
            type="text"
            placeholder="Search..."
            autoFocus
            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>
      )}
    </header>
  );
}