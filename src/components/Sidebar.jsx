import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChartPieIcon,
  UserCircleIcon,
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

import Logo from "../assets/Logo-v3.png";

export default function Sidebar({ isOpen }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
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
        { to: "/charts/radars", label: "Radar" },
        { to: "/charts/scatter", label: "Scatter" },
      ],
    },
  ];

  const singleLinks = [
    { to: "/auth/login", label: "Login", icon: LockClosedIcon },
    { to: "/auth/register", label: "Register", icon: UserPlusIcon },
    { to: "/profile", label: "Profile", icon: UserCircleIcon },
    { to: "/setting", label: "Setting", icon: Cog6ToothIcon },
    { to: "/error", label: "Error", icon: ExclamationCircleIcon },
    { to: "/pricing", label: "Pricing", icon: CurrencyDollarIcon },
    { to: "/faq", label: "FAQ", icon: QuestionMarkCircleIcon },
  ];

  return (
    <aside
      className={`
        top-0 left-0 z-50 h-screen w-64
        bg-gradient-to-t from-green-400/90 to-cyan-400/90
        text-white overflow-hidden
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="h-full flex flex-col overflow-y-auto p-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-32" />
        </div>

        <nav className="space-y-2 flex-1">
          {/* Menus */}
          {menus.map(({ key, label, icon: Icon, children }) => (
            <div key={key}>
              <button
                onClick={() => toggleMenu(key)}
                className={`${baseLinkStyle} w-full`}
              >
                <Icon className="w-6 h-6" />
                <span>{label}</span>
                <span className="ml-auto">
                  {openMenu === key ? "▲" : "▼"}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openMenu === key ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="mt-2 flex flex-col gap-2 pl-6">
                  {children.map(({ to, label }) => (
                    <li key={to}>
                      <NavLink
                        to={to}
                        className={({ isActive }) =>
                          `${baseLinkStyle} ${
                            isActive ? activeLinkStyle : ""
                          } text-sm`
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
              className={({ isActive }) =>
                `${baseLinkStyle} ${isActive ? activeLinkStyle : ""}`
              }
            >
              <Icon className="w-6 h-6" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}