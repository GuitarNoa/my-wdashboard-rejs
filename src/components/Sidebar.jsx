/* eslint-disable no-unused-vars */
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

export default function Sidebar({ collapsed = false }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    if (collapsed) return; // ไม่ toggle เมื่อ icon-only
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
        h-screen
        bg-gradient-to-t from-green-400/90 to-cyan-400/90
        text-white overflow-hidden
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-16" : "w-64"}
        ${collapsed ? "overflow-visible" : "overflow-hidden"}
      `}
    >
      <div className="h-full flex flex-col overflow-y-auto overflow-x-visible p-2">
        {/* Logo */}
        <div className="flex justify-center mb-6 mt-2">
          {collapsed ? (
            <img src={Logo} alt="Logo" className="w-8 h-8 object-contain" />
          ) : (
            <img src={Logo} alt="Logo" className="w-32" />
          )}
        </div>

        <nav className="space-y-1 flex-1">
          {/* Dropdown Menus */}
          {menus.map(({ key, label, icon: Icon, children }) => (
            <div key={key}>
              <button
                onClick={() => toggleMenu(key)}
                title={collapsed ? label : undefined}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg w-full
                  transition hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400
                  ${collapsed ? "justify-center" : ""}
                `}
              >
                <Icon className="w-6 h-6 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span>{label}</span>
                    <span className="ml-auto">
                      {openMenu === key ? "▲" : "▼"}
                    </span>
                  </>
                )}
              </button>

              {/* Sub-menu — ซ่อนเมื่อ collapsed */}
              {!collapsed && (
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openMenu === key
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="mt-1 flex flex-col gap-1 pl-6">
                    {children.map(({ to, label: childLabel }) => (
                      <li key={to}>
                        <NavLink
                          to={to}
                          className={({ isActive }) =>
                            `${baseLinkStyle} ${
                              isActive ? activeLinkStyle : ""
                            } text-sm`
                          }
                        >
                          {childLabel}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {/* Pages label */}
          {!collapsed && (
            <span className="px-3 py-2 text-sm font-semibold block">
              Pages
            </span>
          )}

          {/* Single Links */}
          {singleLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                `${baseLinkStyle} ${isActive ? activeLinkStyle : ""} ${
                  collapsed ? "justify-center" : ""
                }`
              }
            >
              <Icon className="w-6 h-6 flex-shrink-0" />
              {!collapsed && label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}