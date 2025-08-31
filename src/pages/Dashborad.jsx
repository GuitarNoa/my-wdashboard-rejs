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

export default function Dashborad() {
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
      <main>
        <div className="flex flex-wrap justify-center gap-12">
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
        <div className="p-6 grid grid-cols-1 md:grid-cols gap-6">
          <div className="bg-white rounded-2xl grid-cols-1 md:grid-cols shadow p-4">
            <h3 className="font-semibold mb-2">Sales Overview</h3>
            <Line data={lineData} />
          </div>
        </div>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Header 1
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Header 2
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">Data 1A</td>
              <td class="px-6 py-4 whitespace-nowrap">Data 1B</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">Data 2A</td>
              <td class="px-6 py-4 whitespace-nowrap">Data 2B</td>
            </tr>
          </tbody>
        </table>
      </main>
    </DefaultLayout>
  );
}
