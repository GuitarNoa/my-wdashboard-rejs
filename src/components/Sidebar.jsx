import React from "react";
import { NavLink } from "react-router-dom";
import { ChartPieIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Logo from "/MetreeUI.png";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-t from-green-400 to-cyan-400 h-auto text-white p-4 min-h-screen">
      <img src={Logo} alt="Logo" className="h-42 w-42" />
      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg transition 
             ${
               isActive
                 ? "bg-gradient-to-r from-indigo-500 to-teal-400"
                 : "hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400"
             }`
          }
        >
          <ChartPieIcon className="w-6 h-6" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/Profile"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg transition 
             ${
               isActive
                 ? "bg-gradient-to-r from-indigo-500 to-teal-400"
                 : "hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400"
             }`
          }
        ><UserCircleIcon className="w-6 h-6" />
          Profile
        </NavLink>

        <NavLink
          to="/Table"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg transition 
             ${
               isActive
                 ? "bg-gradient-to-r from-indigo-500 to-teal-400"
                 : "hover:bg-gradient-to-r hover:from-indigo-500 hover:to-teal-400"
             }`
          }
        >
          Table
        </NavLink>
      </nav>
    </aside>
  );
}
