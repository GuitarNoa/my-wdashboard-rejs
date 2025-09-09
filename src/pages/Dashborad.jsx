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
import StatisticsCard from "../components/StatisticsCard";
import { faker } from "@faker-js/faker";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UsersIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

import { FaReact, FaVuejs, FaAngular } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";

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

  // ฟังก์ชันเลือก Icon ตาม Tool
  const getToolIcon = (tool) => {
    switch (tool) {
      case "React":
        return <FaReact className="text-sky-500 w-5 h-5" />;
      case "Vue":
        return <FaVuejs className="text-green-500 w-5 h-5" />;
      case "Next.JS":
        return <SiNextdotjs className="text-gray-900 w-5 h-5" />;
      case "Angular":
        return <FaAngular className="text-red-500 w-5 h-5" />;
      default:
        return null;
    }
  };
  const getProgressBarColor = (tool) => {
    switch (tool) {
      case "React":
        return "bg-gradient-to-r from-sky-500 to-blue-400"; // React → ฟ้า
      case "Vue":
        return "bg-gradient-to-r from-green-500 to-emerald-400"; // Vue → เขียว
      case "Next.JS":
        return "bg-gradient-to-r from-gray-700 to-gray-400"; // Next.js → เทา
      case "Angular":
        return "bg-gradient-to-r from-red-500 to-orange-400"; // Angular → แดง-ส้ม
      default:
        return "bg-gradient-to-r from-gray-300 to-gray-200"; // Default → เทาอ่อน
    }
  };

  // ข้อมูล Project Website
  const [projects, setProjects] = useState([
    {
      id: 1,
      themename: "CyanovaUI",
      website: "Admin Dashboard",
      tool: "React",
      process: "90%",
    },
    {
      id: 2,
      themename: "CyanovaUI",
      website: "Admin Dashboard",
      tool: "Vue",
      process: "20%",
    },
    {
      id: 3,
      themename: "CyanovaUI",
      website: "Admin Dashboard",
      tool: "Next.JS",
      process: "30%",
    },
    {
      id: 4,
      themename: "CyanovaUI",
      website: "CRM",
      tool: "React",
      process: "40%",
    },
    {
      id: 5,
      themename: "CyanovaUI",
      website: "Blog",
      tool: "Vue",
      process: "60%",
    },
    {
      id: 6,
      themename: "CyanovaUI",
      website: "eCommerce",
      tool: "Next.JS",
      process: "75%",
    },
    {
      id: 7,
      themename: "CyanovaUI",
      website: "Admin Dashboard",
      tool: "Angular",
      process: "15%",
    },
  ]);

  // ฟังก์ชันลบ Project
  const handleDelete = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <DefaultLayout>
      <main>
        <div className="h-full px-2 sm:px-4 space-y-4 sm:space-y-6">
          {/* Hero Section */}
          <div
            className="relative w-full rounded-2xl overflow-hidden shadow-lg 
                       p-4 sm:p-6 md:p-8
                       min-h-[180px] sm:min-h-[220px] md:min-h-[280px]
                       bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            {/* Title Bar */}
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white rounded-2xl shadow-md">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Overview
              </h1>
            </div>

            {/* Statistic Cards */}
            <div className="relative z-10 mt-4 sm:mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
              <h3 className="font-semibold mb-2 text-base md:text-lg">
                Sales Overview
              </h3>
              <Line data={lineData} />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
              <h3 className="font-semibold mb-2 text-base md:text-lg">
                Preview Overview
              </h3>
              <Line data={lineData} />
            </div>
          </div>

          {/* Data Table Section */}
          <div className="overflow-x-auto rounded-2xl shadow-md bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gradient-to-t from-green-400/90 to-cyan-400/90">
                <tr>
                  {["Themename", "Website", "Tool", "Progress", "Action"].map(
                    (title) => (
                      <th
                        key={title}
                        className="px-3 sm:px-4 py-3 text-left font-medium text-white uppercase tracking-wider text-xs sm:text-sm"
                      >
                        {title}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    {/* Name */}
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap font-medium text-gray-800">
                      {project.themename}
                    </td>

                    {/* Website */}
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-gray-600">
                      {project.website}
                    </td>

                    {/* Tool + Icon */}
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap flex items-center gap-2">
                      {getToolIcon(project.tool)}
                      <span className="text-gray-700">{project.tool}</span>
                    </td>

                    {/* Progress Bar */}
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(
                            project.tool
                          )}`}
                          style={{ width: project.process }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {project.process}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap flex flex-col sm:flex-row gap-2">
                      <button className="text-blue-500 hover:underline">
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDelete(project.id)}
                      >
                        Delete
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
