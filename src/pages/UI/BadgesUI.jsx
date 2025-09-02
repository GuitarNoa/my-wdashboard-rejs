import React from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { FiCheck, FiX, FiAlertTriangle } from "react-icons/fi";

export default function BadgesUI() {
  return (
    <DefaultLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Badges UI</h1>
        <p className="mb-4 text-gray-600">
          ตัวอย่าง Badges ทั้งหมด: Basic, Pill, Outline และ Badges พร้อมไอคอน
        </p>

        {/* Basic Badges */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Basic Badges</h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded">Default</span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded">Primary</span>
            <span className="bg-green-500 text-white px-3 py-1 rounded">Success</span>
            <span className="bg-yellow-400 text-white px-3 py-1 rounded">Warning</span>
            <span className="bg-red-500 text-white px-3 py-1 rounded">Danger</span>
          </div>
        </div>

        {/* Pill Badges */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Pill Badges</h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-500 text-white px-4 py-1 rounded-full">Pill</span>
            <span className="bg-green-500 text-white px-4 py-1 rounded-full">Success</span>
            <span className="bg-red-500 text-white px-4 py-1 rounded-full">Danger</span>
            <span className="bg-gray-500 text-white px-4 py-1 rounded-full">Default</span>
          </div>
        </div>

        {/* Badges with Icons */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Badges with Icons</h2>
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

        {/* Outline Badges */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Outline Badges</h2>
          <div className="flex flex-wrap gap-2">
            <span className="border border-gray-400 text-gray-800 px-3 py-1 rounded">Default</span>
            <span className="border border-blue-500 text-blue-500 px-3 py-1 rounded">Primary</span>
            <span className="border border-green-500 text-green-500 px-3 py-1 rounded">Success</span>
            <span className="border border-yellow-400 text-yellow-500 px-3 py-1 rounded">Warning</span>
            <span className="border border-red-500 text-red-500 px-3 py-1 rounded">Danger</span>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
