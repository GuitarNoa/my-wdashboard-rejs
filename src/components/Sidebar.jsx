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
  // state สำหรับเก็บว่า dropdown menu ไหนเปิดอยู่ (ใช้ key ของ menu)
  const [openMenu, setOpenMenu] = useState(null);

  // state สำหรับตรวจจับว่าเมาส์อยู่บน sidebar หรือไม่
  const [isHovered, setIsHovered] = useState(false);

  // sidebar จะแสดงแบบขยาย (expanded) ถ้า:
  // 1. collapsed = false (โหมดปกติ) หรือ
  // 2. collapsed = true แต่เมาส์ hover อยู่บน sidebar
  const isExpanded = !collapsed || isHovered;

  // ฟังก์ชัน toggle เปิด/ปิด dropdown sub-menu
  // จะทำงานเฉพาะเมื่อ sidebar กำลังแสดงแบบขยายอยู่เท่านั้น
  const toggleMenu = (menu) => {
    if (!isExpanded) return;
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // style พื้นฐานสำหรับทุก link ใน sidebar
  const baseLinkStyle =
    "flex items-center gap-2 px-3 py-2 rounded-lg transition hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400";

  // style สำหรับ link ที่กำลัง active อยู่
  const activeLinkStyle = "bg-gradient-to-r from-indigo-600 to-teal-500";

  // รายการ menu ที่มี sub-menu (dropdown)
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

  // รายการ link แบบเดี่ยว (ไม่มี sub-menu)
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
      // เมื่อเมาส์เข้า sidebar และอยู่ในโหมด collapsed → ให้ขยาย sidebar ชั่วคราว
      onMouseEnter={() => collapsed && setIsHovered(true)}
      // เมื่อเมาส์ออกจาก sidebar → ยุบ sidebar กลับ และปิด dropdown ทั้งหมด
      onMouseLeave={() => {
        setIsHovered(false);
        setOpenMenu(null); // ปิด dropdown ทุกตัวเมื่อเมาส์ออก
      }}
      className={`
        h-screen
        bg-gradient-to-t from-green-400/90 to-cyan-400/90
        text-white
        transition-all duration-300 ease-in-out
        ${isExpanded ? "w-64 overflow-hidden" : "w-16 overflow-visible"}
      `}
    >
      <div className="h-full flex flex-col overflow-y-auto overflow-x-visible p-2">

        {/* ── Logo ── */}
        <div className="flex justify-center mb-6 mt-2">
          {/* แสดง logo เล็กเมื่อยุบ / logo ใหญ่เมื่อขยาย */}
          {isExpanded ? (
            <img src={Logo} alt="Logo" className="w-32" />
          ) : (
            <img src={Logo} alt="Logo" className="w-8 h-8 object-contain" />
          )}
        </div>

        <nav className="space-y-1 flex-1">

          {/* ── Dropdown Menus ── */}
          {menus.map(({ key, label, icon: Icon, children }) => (
            <div key={key}>

              {/* ปุ่มหลักของ menu แต่ละรายการ */}
              <button
                onClick={() => toggleMenu(key)}
                // แสดง tooltip เมื่อ sidebar ยุบ (icon-only mode)
                title={!isExpanded ? label : undefined}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg w-full
                  transition hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400
                  ${!isExpanded ? "justify-center" : ""}
                `}
              >
                {/* ไอคอนแสดงเสมอ */}
                <Icon className="w-6 h-6 flex-shrink-0" />

                {/* label และลูกศร แสดงเฉพาะเมื่อ sidebar ขยาย */}
                {isExpanded && (
                  <>
                    <span>{label}</span>
                    <span className="ml-auto">
                      {openMenu === key ? "▲" : "▼"}
                    </span>
                  </>
                )}
              </button>

              {/* Sub-menu — แสดงเฉพาะเมื่อ sidebar ขยายและ menu นั้น open อยู่ */}
              {isExpanded && (
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
                            `${baseLinkStyle} ${isActive ? activeLinkStyle : ""} text-sm`
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

          {/* ── หัวข้อ Pages — แสดงเฉพาะเมื่อ sidebar ขยาย ── */}
          {isExpanded && (
            <span className="px-3 py-2 text-sm font-semibold block">Pages</span>
          )}

          {/* ── Single Links (ไม่มี sub-menu) ── */}
          {singleLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              // แสดง tooltip เมื่อ sidebar ยุบ
              title={!isExpanded ? label : undefined}
              className={({ isActive }) =>
                `${baseLinkStyle} ${isActive ? activeLinkStyle : ""} ${
                  !isExpanded ? "justify-center" : ""
                }`
              }
            >
              {/* ไอคอนแสดงเสมอ */}
              <Icon className="w-6 h-6 flex-shrink-0" />

              {/* label แสดงเฉพาะเมื่อ sidebar ขยาย */}
              {isExpanded && label}
            </NavLink>
          ))}

        </nav>
      </div>
    </aside>
  );
}