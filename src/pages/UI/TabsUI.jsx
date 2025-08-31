"use client";
import React, { useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";

const tabs = [
  { id: "users", label: "Users" },
  { id: "sales", label: "Sales" },
  { id: "reports", label: "Reports" },
];

export default function TabsUI() {
  const [activeTab, setActiveTab] = useState("users"); // <-- เพิ่มตรงนี้

  return (
    <DefaultLayout>
      <div className="w-full max-w-2xl mx-auto">
        {/* Tab Buttons */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 text-center font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-green-500 text-green-600"
                  : "text-gray-500 hover:text-green-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 bg-white shadow rounded-b-xl">
          {activeTab === "users" && <div>📊 ผู้ใช้งานวันนี้: 1,234</div>}
          {activeTab === "sales" && <div>🛒 ยอดขายวันนี้: $12,345</div>}
          {activeTab === "reports" && <div>📑 รายงานสรุปประจำสัปดาห์</div>}
        </div>
      </div>
    </DefaultLayout>
  );
}
