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
  const handleLinkClick = () => {
    if (window.innerWidth < 768) setIsOpen(false);
  };

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
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-gradient-to-t from-green-400 to-cyan-400 text-white p-4 transform transition-transform duration-300 ease-in-out shadow-xl overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-28 h-auto" />
        </div>

        <nav className="space-y-2">
          {/* Dashboard */}
          <button
            onClick={() => setOpenDashboard(!openDashboard)}
            className="w-full flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
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
                  onClick={handleLinkClick}
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                >
                  Analytic
                </Link>
              </li>
              <li>
                <Link
                  to="/ECommerce"
                  onClick={handleLinkClick}
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                >
                  eCommerce
                </Link>
              </li>
              <li>
                <Link
                  to="/CRM"
                  onClick={handleLinkClick}
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
                  to="/ui/buttonsUI"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                  onClick={handleLinkClick}
                >
                  Buttons
                </Link>
              </li>
              <li>
                <Link
                  to="/ui/badgesUI"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                  onClick={handleLinkClick}
                >
                  Badges
                </Link>
              </li>
              <li>
                <Link
                  to="/ui/cardsUI"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                  onClick={handleLinkClick}
                >
                  Cards
                </Link>
              </li>
              <li>
                <Link
                  to="/ui/tabsUI"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                  onClick={handleLinkClick}
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
                  to="/forms/formelements"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                  onClick={handleLinkClick}
                >
                  Form Elements
                </Link>
              </li>
              <li>
                <Link
                  to="/forms/formvalidation"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                  onClick={handleLinkClick}
                >
                  Form Validation
                </Link>
              </li>
              <li>
                <Link
                  to="/forms/formwizard"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                  onClick={handleLinkClick}
                >
                  Form Wizard
                </Link>
              </li>
            </ul>
          </div>

          {/* Tables */}
          <button
            onClick={() => setTable(!openTable)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
          >
            <TableCellsIcon className="w-6 h-6" />
            <span>Tables</span>
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
                  to="/tables/basictable"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                  onClick={handleLinkClick}
                >
                  Basic Tables
                </Link>
              </li>
              <li>
                <Link
                  to="/tables/datatable"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                  onClick={handleLinkClick}
                >
                  DataTables
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
                  to="/charts/line"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                  onClick={handleLinkClick}
                >
                  Line
                </Link>
              </li>
              <li>
                <Link
                  to="/charts/bar"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                  onClick={handleLinkClick}
                >
                  Bar
                </Link>
              </li>
              <li>
                <Link
                  to="/charts/pie"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                  onClick={handleLinkClick}
                >
                  Pie
                </Link>
              </li>
              <li>
                <Link
                  to="/charts/donut"
                  className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]"
                  onClick={handleLinkClick}
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
            onClick={handleLinkClick}
          >
            <LockClosedIcon className="w-6 h-6" />
            Login
          </Link>
          {/* Register */}
          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
            onClick={handleLinkClick}
          >
            <UserPlusIcon className="w-6 h-6" />
            Register
          </Link>
          {/* Profile */}
          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
            onClick={handleLinkClick}
          >
            <UserCircleIcon className="w-6 h-6" />
            Profile
          </Link>
          {/* Settings */}
          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
            onClick={handleLinkClick}
          >
            <Cog6ToothIcon className="w-6 h-6" />
            Setting
          </Link>
          {/* Error(404/500) */}
          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
            onClick={handleLinkClick}
          >
            <ExclamationCircleIcon className="w-6 h-6" />
            Error(404/500)
          </Link>
          {/* Invoice / Pricing */}
          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
            onClick={handleLinkClick}
          >
            <CurrencyDollarIcon className="w-6 h-6" />
            Invoice / Pricing
          </Link>
          {/* FAQ/Help */}
          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400 transition"
            onClick={handleLinkClick}
          >
            <QuestionMarkCircleIcon className="w-6 h-6" />
            FAQ/Help
          </Link>
        </nav>
      </aside>
    </>
  );
}
