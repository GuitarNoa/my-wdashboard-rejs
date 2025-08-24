"use client";
import React, { useState } from "react";
import { Link } from "react-router";
import {
  ChartPieIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
// import Image from "next/image";
// import Logo from "/MetreeUI.png";
import Logo from "/public/MetreeUI.png"; // ✅ Logo ควรอยู่ใน public/

export default function Sidebar() {
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openUI, setOpenUI] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // ✅ สำหรับมือถือ

  return (
    <div className="flex">
      {/* ปุ่ม Hamburger (มือถือเท่านั้น) */}
      <button
        className="md:hidden p-3 bg-gradient-to-t from-green-400 to-cyan-400 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 w-64 bg-gradient-to-t from-green-400 to-cyan-400 text-white min-h-screen p-2 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex justify-center">
          <img src={Logo} alt="Logo" width={120} height={120} />
        </div>

        <nav className="space-y-2">
          {/* Dashboard */}
          <button
            onClick={() => setOpenDashboard(!openDashboard)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg transition hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400"
          >
            <ChartPieIcon className="w-6 h-6" />
            <span>Dashboard</span>
            <svg
              className={`w-5 h-5 ml-auto transition-transform ${openDashboard ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openDashboard ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="mt-2 flex flex-col gap-2 pl-6">
              <li><Link href="/" className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]">Analytic</Link></li>
              <li><Link href="/dashboard/ecommerce" className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]">eCommerce</Link></li>
              <li><Link href="/dashboard/glides" className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]">CRM</Link></li>
            </ul>
          </div>

          {/* UI Elements */}
          <button
            onClick={() => setOpenUI(!openUI)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg transition hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400"
          >
            <ChartPieIcon className="w-6 h-6" />
            <span>UI Elements</span>
            <svg
              className={`w-5 h-5 ml-auto transition-transform ${openUI ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openUI ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="mt-2 flex flex-col gap-2 pl-6">
              <li><Link href="/ui/buttons" className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]">Buttons</Link></li>
              <li><Link href="/ui/badges" className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]">Badges</Link></li>
              <li><Link href="/ui/cards" className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]">Cards</Link></li>
              <li><Link href="/ui/tabs" className="block px-2 py-2 rounded-md hover:bg-[#0a8a94]">Tabs</Link></li>
            </ul>
          </div>

          {/* Profile */}
          <Link
            href="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400"
          >
            <UserCircleIcon className="w-6 h-6" />
            Profile
          </Link>

          {/* Table */}
          <Link
            href="/table"
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400"
          >
            Table
          </Link>
        </nav>
      </aside>
    </div>
  );
}
