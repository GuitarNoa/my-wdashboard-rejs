// Header.jsx
import { useState, useEffect } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";

function SearchInput({ autoFocus = false, className = "" }) {
  return (
    <input
      type="text"
      placeholder="Search..."
      autoFocus={autoFocus}
      className={`w-full px-4 py-2 border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
        placeholder:text-gray-400 dark:placeholder:text-gray-500
        rounded-lg text-sm focus:outline-none focus:ring-2
        focus:ring-blue-200 dark:focus:ring-blue-800 transition ${className}`}
    />
  );
}

export default function Header({ onToggleSidebar, isSidebarOpen }) {
  const { dark, toggle } = useTheme();
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => {
      if (e.matches) setShowSearch(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <header
      className="sticky top-0 z-30 flex flex-col
      bg-white/80 dark:bg-gray-900/80 backdrop-blur
      border-b border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between px-4 py-3 gap-2">
        {/* Toggle sidebar */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition flex-shrink-0"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          )}
        </button>

        <span className="hidden sm:block text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
          Dashboard
        </span>

        {/* Search — desktop */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <SearchInput className="max-w-md" />
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggle}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? (
              <SunIcon className="w-5 h-5 text-gray-400 dark:text-gray-300" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Search toggle — mobile */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={() => setShowSearch((v) => !v)}
            aria-label={showSearch ? "Close search" : "Open search"}
            aria-expanded={showSearch}
          >
            {showSearch ? (
              <XMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          <a
            href="/auth/login"
            className="text-sm font-medium text-gray-700 dark:text-gray-300
              hover:text-black dark:hover:text-white transition px-2 py-1"
          >
            Sign In
          </a>
        </div>
      </div>

      {/* Search — mobile expanded */}
      {showSearch && (
        <div className="md:hidden px-4 pb-3">
          <SearchInput autoFocus />
        </div>
      )}
    </header>
  );
}
