import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDownIcon, Squares2X2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MENUS, SINGLE_LINKS } from "../navigation";

const linkStyle = ({ isActive }) => "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition " + (isActive ? "bg-teal-50 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-gray-800");

export default function Sidebar({ collapsed = false, onNavigate, onExpand, onClose }) {
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState(() => MENUS.find(menu => menu.children.some(child => child.to.toLowerCase() === pathname.toLowerCase()))?.key);
  return <aside className={"flex h-full flex-col border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-gray-900 " + (collapsed ? "w-20" : "w-64")}>
    <div className="flex h-[76px] shrink-0 items-center justify-between px-5">
      <Link to="/" onClick={onNavigate} aria-label="Cyanova home" className="flex items-center gap-3">
        <span className="rounded-xl bg-teal-700 p-2 text-white"><Squares2X2Icon className="h-5 w-5" /></span>
        {!collapsed && <span className="text-lg font-bold tracking-tight">Cyanova<span className="text-teal-600">.</span></span>}
      </Link>
      <button type="button" onClick={onClose} aria-label="Close navigation" className="rounded-lg p-2 md:hidden"><XMarkIcon className="h-5 w-5" /></button>
    </div>
    <nav aria-label="Main navigation" className="flex-1 space-y-1 overflow-y-auto px-3 pb-6" onClick={event => { if (event.target.closest("a")) onNavigate?.(); }}>
      {!collapsed && <p className="px-3 pb-3 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Workspace</p>}
      {MENUS.map(menu => {
        const Icon = menu.icon;
        const active = menu.children.some(child => child.to.toLowerCase() === pathname.toLowerCase());
        const open = !collapsed && openMenu === menu.key;
        return <div key={menu.key}>
          <button type="button" aria-label={menu.label} title={collapsed ? menu.label : undefined} aria-expanded={open} aria-controls={"menu-" + menu.key} onClick={() => { if (collapsed) onExpand?.(); setOpenMenu(open ? null : menu.key); }} className={"flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium hover:bg-slate-50 dark:hover:bg-gray-800 " + (active ? "text-teal-700 dark:text-teal-300" : "text-slate-600 dark:text-slate-300")}>
            <Icon className="h-5 w-5 shrink-0" />{!collapsed && <><span>{menu.label}</span><ChevronDownIcon className={"ml-auto h-3.5 w-3.5 transition " + (open ? "rotate-180" : "")} /></>}
          </button>
          <ul id={"menu-" + menu.key} hidden={!open} className="ml-5 space-y-1 border-l border-slate-200 py-1 pl-3 dark:border-slate-700">{menu.children.map(child => <li key={child.to}><NavLink end to={child.to} className={linkStyle}>{child.label}</NavLink></li>)}</ul>
        </div>;
      })}
      {!collapsed && <p className="px-3 pb-2 pt-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Account & resources</p>}
      {SINGLE_LINKS.map(link => { const Icon = link.icon; return <NavLink key={link.to} to={link.to} aria-label={link.label} title={collapsed ? link.label : undefined} className={linkStyle}><Icon className="h-5 w-5 shrink-0" />{!collapsed && link.label}</NavLink>; })}
    </nav>
    {!collapsed && <div className="m-4 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-500 dark:bg-gray-800 dark:text-slate-400"><p className="font-semibold text-slate-700 dark:text-slate-200">Explore the demo</p>Sample data · No live account connected</div>}
  </aside>;
}
