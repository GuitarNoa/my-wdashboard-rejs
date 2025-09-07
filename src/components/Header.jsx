// components/Header.tsx
import { BiMenu } from "react-icons/bi";
import Breadcrumb from "./Breadcrumb";

export default function Header() {
  return (
    <header className="px-4 py-2 flex items-center justify-between">
      {/* Left: Menu + Breadcrumb */}
      <div className="flex items-center space-x-4">
        {/* Breadcrumb (ซ่อนบนจอเล็ก) */}
        <div className="hidden sm:block">
          <Breadcrumb />
        </div>
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
          className="text-sm font-medium text-gray-800 hover:text-black"
        >
          Sign In
        </a>
      </div>
    </header>
  );
}
