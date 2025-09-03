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
import { Line } from "react-chartjs-2";
import StatisticsCard from "../components/StatisticsCard";
import { faker } from "@faker-js/faker";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UsersIcon,
  UserPlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import bgImage from "../assets/Page-g1.png";
import profileImg from "../assets/my_profile.jpg";

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

  return (
    <DefaultLayout>
      <main>
        <div className="h-full px-2 space-y-2">
          {/* Hero Section with Background */}
          <div
            className="relative w-full rounded-2xl overflow-hidden shadow-lg p-4"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow">
              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-800">Overview</h1>

              {/* Search + Profile */}
              <div className="flex items-center space-x-4">
                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="search here.."
                    className="w-full border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                {/* Profile Avatar */}
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </div>
            {/* Overlay */}
            {/* <div className="absolute inset-0 bg-white/30" /> */}

            {/* Content */}
            <div className="relative z-10 p-6 space-y-6">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatisticsCard
                  icon={UsersIcon}
                  title="Today's Users"
                  value="1,234"
                />
                <StatisticsCard
                  icon={CurrencyDollarIcon}
                  title="Today's Money"
                  value="5,678"
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
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow p-4">
              <h3 className="font-semibold mb-2">Sales Overview</h3>
              <Line data={lineData} />
            </div>
            <div className="bg-gradient-to-t from-green-400 to-cyan-400 rounded-2xl p-4 flex items-center justify-center">
              <span className="text-white font-semibold">Additional Info</span>
            </div>
          </div>
          {/* 3 Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-t from-green-400 to-cyan-400 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <span className="text-white font-semibold">Team Members</span>
              <h2 className="text-white">HelloWorld</h2>
              <h2 className="text-white">WWWWW</h2>
            </div>
            <div className="bg-gradient-to-t from-green-400 to-cyan-400 rounded-2xl p-4 flex items-center justify-center">
              <span className="text-white font-semibold">To do List</span>
            </div>
            <div className="bg-gradient-to-t from-green-400 to-cyan-400 rounded-2xl p-4 flex items-center justify-center">
              <span className="text-white font-semibold">Progress track</span>
            </div>
          </div>{" "}
          F{/* Data Table */}
          <div className="overflow-x-auto rounded-2xl shadow">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Author",
                    "Function",
                    "Technology",
                    "Employed",
                    "Action",
                  ].map((title) => (
                    <th
                      key={title}
                      className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="flex items-center gap-2 px-4 py-3">
                    <UsersIcon className="w-6" />
                    Noah
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">Data 1B</td>
                  <td className="px-4 py-3 whitespace-nowrap">Data 1B</td>
                  <td className="px-4 py-3 whitespace-nowrap">Data 1B</td>
                  <td className="px-4 py-3 whitespace-nowrap">Data 1B</td>
                </tr>
                <tr>
                  <td className="flex items-center gap-2 px-4 py-3">
                    <UsersIcon className="w-6" />
                    Data 1A
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">Data 1B</td>
                  <td className="px-4 py-3 whitespace-nowrap">Data 2B</td>
                  <td className="px-4 py-3 whitespace-nowrap">Data 2B</td>
                  <td className="px-4 py-3 whitespace-nowrap">Data 2B</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}
