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
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";
import StatisticsCard from "../components/StatisticsCard";
import {
  TvIcon,
  CurrencyDollarIcon,
  CubeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { data } from "react-router";

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
  // Scatter Chart
  const DoughnutData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <DefaultLayout>
      <main>
        <h1>Overvieww</h1>
        <div className="flex flex-wrap justify-center gap-4">
          <StatisticsCard icon={UsersIcon} title="ผู้ใช้" value="1,234" />
          <StatisticsCard icon={CubeIcon} title="ยอดขาย" value="5,678" />
          <StatisticsCard
            icon={CurrencyDollarIcon}
            title="รายได้"
            value="$12,345"
          />
          <StatisticsCard
            icon={CurrencyDollarIcon}
            title="ราบจ่าย"
            value="$2,345"
          />
        </div>
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
          <div className="bg-white rounded-2xl shadow p-4 md:col-span-2">
            <h3 className="font-semibold mb-2">Line Chart</h3>
            <Doughnut data={DoughnutData} />
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}
