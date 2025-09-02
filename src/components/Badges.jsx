import React from "react";
import { FiCheck, FiX, FiAlertTriangle } from "react-icons/fi";

export default function Badges() {
  return (
    <div className="space-y-4">
      {/* Default Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded">Default</span>
        <span className="bg-blue-500 text-white px-3 py-1 rounded">Primary</span>
        <span className="bg-green-500 text-white px-3 py-1 rounded">Success</span>
        <span className="bg-yellow-400 text-white px-3 py-1 rounded">Warning</span>
        <span className="bg-red-500 text-white px-3 py-1 rounded">Danger</span>
      </div>

      {/* Pill Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="bg-blue-500 text-white px-4 py-1 rounded-full">Pill</span>
        <span className="bg-green-500 text-white px-4 py-1 rounded-full">Success</span>
        <span className="bg-red-500 text-white px-4 py-1 rounded-full">Danger</span>
      </div>

      {/* Badges with Icons */}
      <div className="flex flex-wrap gap-2">
        <span className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1">
          <FiCheck /> Approved
        </span>
        <span className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1">
          <FiX /> Rejected
        </span>
        <span className="bg-yellow-400 text-white px-3 py-1 rounded flex items-center gap-1">
          <FiAlertTriangle /> Pending
        </span>
      </div>
    </div>
  );
}
