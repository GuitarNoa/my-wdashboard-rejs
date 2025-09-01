import { useState } from "react";
import { NavLink } from "react-router-dom";
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
  const [openMenu, setOpenMenu] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const closeSidebar = () => {
    if (window.innerWidth < 768) setIsOpen(false);
  };

  const baseLinkStyle =
    "flex items-center gap-2 px-3 py-2 rounded-lg transition hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400";
  const activeLinkStyle = "bg-gradient-to-r from-indigo-600 to-teal-500";

  const menus = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: ChartPieIcon,
      children: [
        { to: "/", label: "Overview" },
        { to: "/ECommerce", label: "eCommerce" },
        { to: "/CRM", label: "CRM" },
      ],
    },
    {
      key: "ui",
      label: "UI Elements",
      icon: SquaresPlusIcon,
      children: [
        { to: "/ui/buttonsUI", label: "Buttons" },
        { to: "/ui/badgesUI", label: "Badges" },
        { to: "/ui/cardsUI", label: "Cards" },
        { to: "/ui/tabsUI", label: "Tabs" },
      ],
    },
    {
      key: "forms",
      label: "Forms",
      icon: DocumentTextIcon,
      children: [
        { to: "/forms/formelements", label: "Form Elements" },
        { to: "/forms/formvalidation", label: "Form Validation" },
        { to: "/forms/formwizard", label: "Form Wizard" },
      ],
    },
    {
      key: "tables",
      label: "Tables",
      icon: TableCellsIcon,
      children: [
        { to: "/tables/basictable", label: "Basic Tables" },
        { to: "/tables/datatable", label: "DataTables" },
      ],
    },
    {
      key: "charts",
      label: "Charts",
      icon: ChartBarSquareIcon,
      children: [
        { to: "/charts/areas", label: "Area" },
        { to: "/charts/bars", label: "Bar" },
        { to: "/charts/bubbles", label: "Bubble" },
        { to: "/charts/donuts", label: "Donut" },
        { to: "/charts/lines", label: "Line" },
        { to: "/charts/pies", label: "Pie" },
        { to: "/charts/polararea", label: "PolarArea" },
        { to: "/charts/radars", label: "Radars" },
        { to: "/charts/scatter", label: "Scatter" },
      ],
    },
  ];

  const singleLinks = [
    { to: "/auth/login", label: "Login", icon: LockClosedIcon },
    { to: "/auth/register", label: "Register", icon: UserPlusIcon },
    { to: "/profile", label: "Profile", icon: UserCircleIcon },
    { to: "/setting", label: "Setting", icon: Cog6ToothIcon },
    { to: "/error", label: "Error(404/500)", icon: ExclamationCircleIcon },
    { to: "/pricing", label: "Invoice / Pricing", icon: CurrencyDollarIcon },
    { to: "/faq", label: "FAQ/Help", icon: QuestionMarkCircleIcon },
  ];

  return (
    <>
      {/* Hamburger Mobile */}
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
        className={`fixed top-0 left-0 z-50 w-70 h-full bg-gradient-to-t from-green-400 to-cyan-400 text-white p-4 transform transition-transform duration-300 ease-in-out shadow-xl overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-28 h-auto" />
        </div>

        <nav className="space-y-2">
          {/* Menus with sub-items */}
          {menus.map(({ key, label, icon: Icon, children }) => (
            <div key={key}>
              <button
                onClick={() => toggleMenu(key)}
                className={`${baseLinkStyle} w-full`}
              >
                <Icon className="w-6 h-6" />
                <span>{label}</span>
                <svg
                  className={`w-5 h-5 ml-auto transition-transform ${
                    openMenu === key ? "rotate-180" : ""
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
                className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
                  openMenu === key
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="mt-2 flex flex-col gap-2 pl-6">
                  {children.map(({ to, label }) => (
                    <li key={to}>
                      <NavLink
                        to={to}
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                          `${baseLinkStyle} ${
                            isActive ? activeLinkStyle : ""
                          } block px-2 py-2`
                        }
                      >
                        {label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Static Pages */}
          <span className="px-3 py-2 text-sm font-semibold">Pages</span>
          {singleLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `${baseLinkStyle} ${isActive ? activeLinkStyle : ""}`
              }
            >
              <Icon className="w-6 h-6" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
