"use client";
import React, { useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";

const tabs = [
  { id: "users", label: "Users" },
  { id: "sales", label: "Sales" },
  { id: "reports", label: "Reports" },
];

export default function TabsUI() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <DefaultLayout>
      <div className="w-full max-w-2xl mx-auto mt-10">
        {/* Tab Buttons */}
        <div className="flex border-b border-gray-200 rounded-t-xl overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-center font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "border-b-4 border-green-500 text-green-600 bg-green-50"
                  : "text-gray-500 hover:text-green-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 bg-white shadow rounded-b-xl transition-all duration-300">
          {activeTab === "users" && (
            <div className="text-gray-700 text-lg">
              📊 ผู้ใช้งานวันนี้: <span className="font-bold">1,234</span>
            </div>
          )}
          {activeTab === "sales" && (
            <div className="text-gray-700 text-lg">
              🛒 ยอดขายวันนี้: <span className="font-bold">$12,345</span>
            </div>
          )}
          {activeTab === "reports" && (
            <div className="text-gray-700 text-lg">
              📑 รายงานสรุปประจำสัปดาห์
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
