import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChartPieIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  SquaresPlusIcon,
  DocumentTextIcon,
  TableCellsIcon,
  ChartBarSquareIcon,
  LockClosedIcon,
  UserPlusIcon,
  Cog6ToothIcon,
  ExclamationCircleIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import Logo from "../assets/MetreeUI.png";

export default function Sidebar() {
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openUI, setOpenUI] = useState(false);
  const [openForm, setForm] = useState(false);
  const [openTable, setTable] = useState(false);
  const [openChart, setChart] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger สำหรับมือถือ */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-3 bg-gradient-to-t from-green-400 to-cyan-400 text-white rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XMarkIcon className="w-7 h-7" />
        ) : (
          <Bars3Icon className="w-7 h-7" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-gradient-to-t from-green-400 to-cyan-400 text-white p-4 transform transition-transform duration-300 ease-in-out shadow-xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          {/* ✅ ถ้าใช้ public folder → <img src="/MetreeUI.png" alt="Logo" className="w-28 h-auto" /> */}
          <img src={Logo} alt="Logo" className="w-28 h-auto" />
        </div>

        <nav className="space-y-2">
          {/* Dashboard */}
          <button
            onClick={() => setOpenDashboard(!openDashboard)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
          >
            <ChartPieIcon className="w-6 h-6" />
            <span>Dashboard</span>
            <svg
              className={`w-5 h-5 ml-auto transition-transform ${
                openDashboard ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openDashboard ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="mt-2 flex flex-col gap-2 pl-6">
              <li>
                <Link
                  to="/"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                >
                  Analytic
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/ecommerce"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                >
                  eCommerce
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/crm"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                >
                  CRM
                </Link>
              </li>
            </ul>
          </div>

          {/* UI Elements */}
          <button
            onClick={() => setOpenUI(!openUI)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
          >
            <SquaresPlusIcon className="w-6 h-6" />
            <span>UI Elements</span>
            <svg
              className={`w-5 h-5 ml-auto transition-transform ${
                openUI ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openUI ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="mt-2 flex flex-col gap-2 pl-6">
              <li>
                <Link
                  to="/ui/buttons"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                >
                  Buttons
                </Link>
              </li>
              <li>
                <Link
                  to="/ui/badges"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                >
                  Badges
                </Link>
              </li>
              <li>
                <Link
                  to="/ui/cards"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                >
                  Cards
                </Link>
              </li>
              <li>
                <Link
                  to="/ui/tabs"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                >
                  Tabs
                </Link>
              </li>
            </ul>
          </div>

          {/* Forms */}
          <button
            onClick={() => setForm(!openForm)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
          >
            <DocumentTextIcon className="w-6 h-6" />
            <span>Forms</span>
            <svg
              className={`w-5 h-5 ml-auto transition-transform ${
                openForm ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openForm ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="mt-2 flex flex-col gap-2 pl-6">
              <li>
                <Link
                  to="/ui/buttons"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                >
                  Form Elements
                </Link>
              </li>
              <li>
                <Link
                  to="/ui/badges"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                >
                  Form Validation
                </Link>
              </li>
              <li>
                <Link
                  to="/ui/cards"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                >
                  Form Wizard
                </Link>
              </li>
            </ul>
          </div>

          {/* Tabs */}
          <button
            onClick={() => setTable(!openTable)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
          >
            <TableCellsIcon className="w-6 h-6" />
            <span>Tabs</span>
            <svg
              className={`w-5 h-5 ml-auto transition-transform ${
                openTable ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openTable ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="mt-2 flex flex-col gap-2 pl-6">
              <li>
                <Link
                  to="/ui/buttons"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                >
                  Form Elements
                </Link>
              </li>
              <li>
                <Link
                  to="/ui/badges"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                >
                  Form Validation
                </Link>
              </li>
              <li>
                <Link
                  to="/ui/cards"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                >
                  Form Wizard
                </Link>
              </li>
            </ul>
          </div>

          {/* Charts */}
          <button
            onClick={() => setChart(!openChart)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
          >
            <ChartBarSquareIcon className="w-6 h-6" />
            <span>Charts</span>
            <svg
              className={`w-5 h-5 ml-auto transition-transform ${
                openChart ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openChart ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="mt-2 flex flex-col gap-2 pl-6">
              <li>
                <Link
                  to="/ui/buttons"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                >
                  Line
                </Link>
              </li>
              <li>
                <Link
                  to="/ui/badges"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                >
                  Bar
                </Link>
              </li>
              <li>
                <Link
                  to="/ui/cards"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                >
                  Pie
                </Link>
              </li>
              <li>
                <Link
                  to="/ui/cards"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                >
                  Donut
                </Link>
              </li>
            </ul>
          </div>
          <a>Pages</a>

          {/* Login */}
          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
          >
            <LockClosedIcon className="w-6 h-6" />
            Login
          </Link>
          {/* Register */}
          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
          >
            <UserPlusIcon className="w-6 h-6" />
            Register
          </Link>
          {/* Profile */}
          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
          >
            <UserCircleIcon className="w-6 h-6" />
            Profile
          </Link>
          {/* Settings */}
          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
          >
            <Cog6ToothIcon className="w-6 h-6" />
            Setting
          </Link>
          {/* Error(404/500) */}
          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
          >
            <ExclamationCircleIcon className="w-6 h-6" />
            Error(404/500)
          </Link>
          {/* Invoice / Pricing */}
          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
          >
            <CurrencyDollarIcon className="w-6 h-6" />
            Invoice / Pricing
          </Link>
          {/* FAQ/Help */}
          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
          >
            <QuestionMarkCircleIcon className="w-6 h-6" />
            FAQ/Help
          </Link>
        </nav>
      </aside>
    </>
  );
}
