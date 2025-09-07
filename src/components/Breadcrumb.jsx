import React from "react";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Breadcrumb() {
  const items = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <nav className="flex items-center text-sm text-gray-600">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <a
            href={item.href}
            className={`hover:text-blue-600 ${
              index === items.length - 1 ? "font-semibold text-gray-900" : ""
            }`}
          >
            {item.label}
          </a>
          {index < items.length - 1 && (
            <ChevronRightIcon className="mx-2 h-4 w-4 text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  );
}
