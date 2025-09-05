// components/Header.tsx
import { BiMenu } from "react-icons/bi";

export default function Header() {
  return (
    <header className="bg-gradient-to-t from-green-400/90 to-cyan-400/90">
      {/* Left: Breadcrumb + Title (ซ่อนในจอเล็ก) */}
      <div className="hidden md:flex items-center space-x-4">
        <nav className="text-sm text-gray-500 flex items-center space-x-1">
          <span>🏠</span>
          <span>/</span>
          <span>Pages</span>
          <span>/</span>
          <span className="text-gray-700 font-medium">CRM</span>
        </nav>
        <h1 className="text-lg font-semibold text-gray-700">CRM</h1>
      </div>

      {/* Middle: Menu Button (โชว์เฉพาะมือถือ) */}
      <div className="flex md:hidden">
        <button className="p-2 rounded hover:bg-gray-100">
          <BiMenu className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Right: Search + Sign In */}
      <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="Type here..."
          className="hidden sm:block px-3 py-1 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <a
          href="/auth/login"
          className="text-sm font-medium text-gray-600 hover:text-gray-800"
        >
          Sign In
        </a>
      </div>
    </header>
  );
}
