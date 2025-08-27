import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

export default function Dashborad() {
  // ข้อมูล Pie Chart
  const pieData = {
    labels: ["A", "B", "C"],
    datasets: [
      {
        label: "Example Pie",
        data: [30, 40, 30],
        backgroundColor: ["#10b981", "#3b82f6", "#f59e0b"],
      },
    ],
  };

  // ข้อมูล Bar Chart
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "ยอดขาย",
        data: [12, 19, 8, 15, 22],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  // ข้อมูล Line Chart
  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "ผู้ใช้เข้าเว็บ",
        data: [200, 400, 300, 500, 700],
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };
  return (
    <DefaultLayout>
      <main>
        <h1>Overview</h1>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="font-semibold mb-2">Pie Chart</h3>
            <Pie data={pieData} />
          </div>

          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="font-semibold mb-2">Bar Chart</h3>
            <Bar data={barData} />
          </div>

          <div className="bg-white rounded-2xl shadow p-4 md:col-span-2">
            <h3 className="font-semibold mb-2">Line Chart</h3>
            <Line data={lineData} />
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}
