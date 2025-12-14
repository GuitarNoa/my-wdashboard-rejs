import React, { useState } from "react";
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
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UsersIcon,
  UserPlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { FaReact, FaVuejs, FaAngular } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";

import StatisticsCard from "../components/StatisticsCard";
import bgImage from "../assets/Page-g1.png";

// Register Chart.js Modules
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

// ─── CONSTANTS ──────────────────────────────────────────────
const TABLE_HEADERS = ["Website", "Tool", "Progress", "Action"];
const TOOL_ICONS = {
  React: <FaReact className="text-sky-500 w-5 h-5" />,
  Vue: <FaVuejs className="text-green-500 w-5 h-5" />,
  "Next.JS": <SiNextdotjs className="text-gray-900 w-5 h-5" />,
  Angular: <FaAngular className="text-red-500 w-5 h-5" />,
};
const TOOL_COLORS = {
  React: "bg-gradient-to-r from-sky-500 to-blue-400",
  Vue: "bg-gradient-to-r from-green-500 to-emerald-400",
  "Next.JS": "bg-gradient-to-r from-gray-700 to-gray-400",
  Angular: "bg-gradient-to-r from-red-500 to-orange-400",
  default: "bg-gradient-to-r from-gray-300 to-gray-200",
};

// ─── COMPONENT ──────────────────────────────────────────────
export default function Dashboard() {
  // Chart data
  const lineData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Product",
        data: Array.from({ length: 7 }, () =>
          faker.number.int({ min: 100, max: 1000 })
        ),
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Project data
  const [projects, setProjects] = useState([
    {
      id: 1,

      website: "Admin Dashboard",
      tool: "React",
      process: "90%",
    },
    {
      id: 2,

      website: "Admin Dashboard",
      tool: "Vue",
      process: "20%",
    },
    {
      id: 3,

      website: "Admin Dashboard",
      tool: "Next.JS",
      process: "30%",
    },
    {
      id: 4,

      website: "CRM",
      tool: "React",
      process: "40%",
    },
    {
      id: 5,

      website: "Blog",
      tool: "Vue",
      process: "60%",
    },
    {
      id: 6,

      website: "eCommerce",
      tool: "Next.JS",
      process: "75%",
    },
    {
      id: 7,

      website: "Admin Dashboard",
      tool: "Angular",
      process: "15%",
    },
  ]);

  const handleDelete = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // ─── HELPERS ─────────────────────────────────────────────
  const getToolIcon = (tool) => TOOL_ICONS[tool] || null;
  const getProgressBarColor = (tool) =>
    TOOL_COLORS[tool] || TOOL_COLORS.default;

  // ─── RENDER ──────────────────────────────────────────────
  return (
    <DefaultLayout>
      <main>
        <div className="h-full">
          {/* Hero Section */}
          <div
            className="relative rounded-2xl bg-gradient-to-t from-green-400/90 to-cyan-400/90 
             overflow-hidden shadow-lg p-4 sm:p-6 md:p-8 bg-cover bg-center"
          >
            {/* Title Bar */}
            <div className="flex items-center justify-between bg-white rounded-2xl shadow-md h-64">
              <h1 className="text-xl sm:text-7xl font-bold text-gray-800 p-4">
                Overview
              </h1>
            </div>

            {/* Statistic Cards */}
            <div className="mt-6 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
                <StatisticsCard
                  icon={UsersIcon}
                  title="Today's Users"
                  value="1,234"
                />
                <StatisticsCard
                  icon={CurrencyDollarIcon}
                  title="Today's Money"
                  value="$5,678"
                />
                <StatisticsCard
                  icon={UserPlusIcon}
                  title="New Clients"
                  value="2,000"
                />
                <StatisticsCard
                  icon={ShoppingCartIcon}
                  title="Sales"
                  value="2,000"
                />
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 p-2">
            {["Sales Overview", "Preview Overview"].map((title) => (
              <div
                key={title}
                className="bg-white rounded-2xl shadow-md p-4 sm:p-6"
              >
                <h3 className="font-semibold mb-2 text-base md:text-lg">
                  {title}
                </h3>
                <Line data={lineData} />
              </div>
            ))}
          </div>

          {/* Data Table Section */}
          <div className="overflow-x-auto rounded-2xl shadow-md bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gradient-to-t from-green-400/90 to-cyan-400/90">
                <tr>
                  {TABLE_HEADERS.map((header) => (
                    <th
                      key={header}
                      className="px-3 sm:px-4 py-3 text-left font-medium text-white uppercase tracking-wider text-xs sm:text-sm"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-gray-600">
                      {project.website}
                    </td>
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap flex items-center gap-2">
                      {getToolIcon(project.tool)}
                      <span className="text-gray-700">{project.tool}</span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getProgressBarColor(
                            project.tool
                          )}`}
                          style={{ width: project.process }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {project.process}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap flex flex-col sm:flex-row gap-2">
                      <button
                        className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-800 transition"
                        title="Edit"
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 transition"
                        title="Delete"
                        onClick={() => handleDelete(project.id)}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}
