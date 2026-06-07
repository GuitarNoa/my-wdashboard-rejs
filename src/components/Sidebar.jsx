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

// ─── ย้ายข้อมูลออกนอก component เพื่อไม่ให้ re-create ทุก render ───────────

const MENUS = [
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

const SINGLE_LINKS = [
  { to: "/auth/login", label: "Login", icon: LockClosedIcon },
  { to: "/auth/register", label: "Register", icon: UserPlusIcon },
  { to: "/profile", label: "Profile", icon: UserCircleIcon },
  { to: "/setting", label: "Setting", icon: Cog6ToothIcon },
  { to: "/error", label: "Error", icon: ExclamationCircleIcon },
  { to: "/pricing", label: "Pricing", icon: CurrencyDollarIcon },
  { to: "/faq", label: "FAQ", icon: QuestionMarkCircleIcon },
];

// ─── styles constant ───────────────────────────────────────────────────────

const styles = {
  link: "flex items-center gap-2 px-3 py-2 rounded-lg transition hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400",
  activeLink: "bg-gradient-to-r from-indigo-600 to-teal-500",
};

// ─── Sub-components ────────────────────────────────────────────────────────

function MenuDropdown({ menu, isExpanded, isOpen, onToggle }) {
  const { key, label, icon: Icon, children } = menu;

  return (
    <div>
      <button
        onClick={() => onToggle(key)}
        title={!isExpanded ? label : undefined}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg w-full transition
          hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400
          ${!isExpanded ? "justify-center" : ""}`}
      >
        <Icon className="w-6 h-6 flex-shrink-0" />
        {isExpanded && (
          <>
            <span>{label}</span>
            <span className="ml-auto">{isOpen ? "▲" : "▼"}</span>
          </>
        )}
      </button>

      {isExpanded && (
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="mt-1 flex flex-col gap-1 pl-6">
            {children.map(({ to, label: childLabel }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.activeLink : ""} text-sm`
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
  );
}

function SingleLink({ to, label, icon: Icon, isExpanded }) {
  return (
    <NavLink
      to={to}
      title={!isExpanded ? label : undefined}
      className={({ isActive }) =>
        `${styles.link} ${isActive ? styles.activeLink : ""} ${
          !isExpanded ? "justify-center" : ""
        }`
      }
    >
      <Icon className="w-6 h-6 flex-shrink-0" />
      {isExpanded && label}
    </NavLink>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export default function Sidebar({ collapsed = false }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const isExpanded = !collapsed || isHovered;

  const toggleMenu = (key) => {
    if (!isExpanded) return;
    setOpenMenu((prev) => (prev === key ? null : key));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOpenMenu(null);
  };

  return (
    <aside
      onMouseEnter={() => collapsed && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`h-screen bg-gradient-to-t from-green-400/90 to-cyan-400/90 text-white
        transition-all duration-300 ease-in-out
        ${isExpanded ? "w-64 overflow-hidden" : "w-16 overflow-visible"}`}
    >
      <div className="h-full flex flex-col overflow-y-auto overflow-x-visible p-2">
        {/* Logo */}
        <div className="flex justify-center mb-6 mt-2">
          <img
            src={Logo}
            alt="Logo"
            className={isExpanded ? "w-32" : "w-8 h-8 object-contain"}
          />
        </div>

        <nav className="space-y-1 flex-1">
          {/* Dropdown menus */}
          {MENUS.map((menu) => (
            <MenuDropdown
              key={menu.key}
              menu={menu}
              isExpanded={isExpanded}
              isOpen={openMenu === menu.key}
              onToggle={toggleMenu}
            />
          ))}

          {/* Pages heading */}
          {isExpanded && (
            <span className="px-3 py-2 text-sm font-semibold block">Pages</span>
          )}

          {/* Single links */}
          {SINGLE_LINKS.map((link) => (
            <SingleLink key={link.to} {...link} isExpanded={isExpanded} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
