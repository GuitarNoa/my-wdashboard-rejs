import React from "react";

export default function StatisticsCard({
  icon: Icon,
  title = "Title",
  value = 0,
}) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center w-64 h-48">
      {Icon && <Icon className="bg-gradient-to-t from-green-400 to-cyan-400 text-white rounded-lg h-16 w-16 mb-2 p-2" />}
      <div className="text-gray-500 font-medium">{title}</div>
      <div className="text-2xl font-bold mt-2">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
    </div>
  );
}
