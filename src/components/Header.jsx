import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header({ onToggleSidebar, isSidebarOpen }) {
  return (
    <header
      className="
        sticky top-0 z-30
        flex items-center justify-between
        px-6 py-3
        bg-white/80 backdrop-blur
        border-b border-gray-100
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          {isSidebarOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-700" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          )}
        </button>

        <span className="hidden md:block text-sm text-gray-500">
          Dashboard
        </span>
      </div>

      {/* CENTER */}
      <div className="hidden md:flex flex-1 justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="
            w-full max-w-md
            px-4 py-2
            border border-gray-200
            rounded-lg text-sm
            focus:outline-none
            focus:ring-2 focus:ring-blue-200
            transition
          "
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <a
          href="/auth/login"
          className="
            text-sm font-medium
            text-gray-700 hover:text-black
            transition
          "
        >
          Sign In
        </a>
      </div>
    </header>
  );
}