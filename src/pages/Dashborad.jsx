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
  // ข้อมูล Line Chart
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
      <main className="p-4">
        {/* Statistics Cards */}
        <div className="flex flex-wrap justify-center gap-10 mb-6">
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
          <StatisticsCard icon={ShoppingCartIcon} title="Sales" value="2,000" />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="font-semibold mb-2">Sales Overview</h3>
            <Line data={lineData} />
          </div>
          <div className="bg-gradient-to-t from-green-400 to-cyan-400 rounded-2xl p-4 flex items-center justify-center">
            <span className="text-white font-semibold">Additional Info</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-t from-green-400 to-cyan-400 rounded-2xl p-4 flex flex-col items-center justify-center">
            <span className="text-white font-semibold">Team Members</span>
            <h2>HelloWorld</h2>
            <h2>WWWWW</h2>
          </div>
          <div className="bg-gradient-to-t from-green-400 to-cyan-400 rounded-2xl p-4 flex items-center justify-center">
            <span className="text-white font-semibold">To do List</span>
          </div>
          <div className="bg-gradient-to-t from-green-400 to-cyan-400 rounded-2xl p-4 flex items-center justify-center">
            <span className="text-white font-semibold">Progress track</span>
          </div>
        </div>

        {/* Data Table */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Author
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Function
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Technology
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Employed
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="flex flex-row px-6 py-4">
                <UsersIcon className="w-8" />
                Noah
              </td>
              <td className="px-6 py-4 whitespace-nowrap">Data 1B</td>
              <td className="px-6 py-4 whitespace-nowrap">Data 1B</td>
              <td className="px-6 py-4 whitespace-nowrap">Data 1B</td>
              <td className="px-6 py-4 whitespace-nowrap">Data 1B</td>
            </tr>
            <tr>
              <td className="flex flex-row px-6 py-4">
                <UsersIcon className="w-8" />
                Data 1A
              </td>
              <td className="px-6 py-4 whitespace-nowrap">Data 1B</td>
              <td className="px-6 py-4 whitespace-nowrap">Data 2B</td>
              <td className="px-6 py-4 whitespace-nowrap">Data 2B</td>
              <td className="px-6 py-4 whitespace-nowrap">Data 2B</td>
            </tr>
          </tbody>
        </table>
      </main>
    </DefaultLayout>
  );
}
