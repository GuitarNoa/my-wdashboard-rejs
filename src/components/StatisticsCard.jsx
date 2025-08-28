import React from "react";

export default function StatisticsCard({ icon: Icon, title = "Title", value = "0" }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center w-64 h-64">
      {Icon && <Icon className="h-12 w-12 text-green-500 mb-4" />}
      <div className="text-gray-500 font-medium">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </div>
  );
}
