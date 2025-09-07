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
} from "@heroicons/react/24/outline";
import bgImage from "../assets/Page-g1.png";

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
            <div
              className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between 
                            gap-3 p-4 bg-white rounded-2xl shadow-md"
            >
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Overview
              </h1>
            </div>

            {/* Statistic Cards */}
            <div className="relative z-10 mt-4 sm:mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center">
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

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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

          {/* Data Table */}
          <div className="overflow-x-auto rounded-2xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gradient-to-t from-green-400/90 to-cyan-400/90">
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
                      className="px-3 sm:px-4 py-3 text-left font-medium text-white 
                                   uppercase tracking-wider text-xs sm:text-sm"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="flex items-center gap-2 px-3 sm:px-4 py-3 whitespace-nowrap">
                    <UsersIcon className="w-5 sm:w-6" />
                    Noah
                  </td>
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                    Data 1B
                  </td>
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                    Data 1B
                  </td>
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                    Data 1B
                  </td>
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                    Data 1B
                  </td>
                </tr>
                <tr>
                  <td className="flex items-center gap-2 px-3 sm:px-4 py-3 whitespace-nowrap">
                    <UsersIcon className="w-5 sm:w-6" />
                    Data 1A
                  </td>
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                    Data 1B
                  </td>
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                    Data 2B
                  </td>
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                    Data 2B
                  </td>
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                    Data 2B
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </DefaultLayout>
  );
}
