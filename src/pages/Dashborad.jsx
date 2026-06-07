// Dashboard.jsx
import { useState, useMemo } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { useTheme } from "../context/ThemeContext";
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
import { Line, Bar } from "react-chartjs-2";
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

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
);

// ─── CONSTANTS ───────────────────────────────────────────────
const TABLE_HEADERS = ["Website", "Tool", "Progress", "Action"];

const TOOL_ICONS = {
  React: <FaReact className="text-sky-400 w-4 h-4" />,
  Vue: <FaVuejs className="text-emerald-400 w-4 h-4" />,
  "Next.JS": (
    <SiNextdotjs className="text-gray-700 dark:text-gray-300 w-4 h-4" />
  ),
  Angular: <FaAngular className="text-red-400 w-4 h-4" />,
};

const TOOL_COLORS = {
  React: "bg-gradient-to-r from-sky-500 to-cyan-400",
  Vue: "bg-gradient-to-r from-emerald-500 to-green-400",
  "Next.JS": "bg-gradient-to-r from-gray-600 to-gray-400",
  Angular: "bg-gradient-to-r from-red-500 to-orange-400",
  default: "bg-gradient-to-r from-gray-300 to-gray-200",
};

const TOOL_BADGE = {
  React:
    "bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 ring-1 ring-sky-200 dark:ring-sky-800",
  Vue: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-800",
  "Next.JS":
    "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 ring-1 ring-gray-300 dark:ring-gray-600",
  Angular:
    "bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 ring-1 ring-red-200 dark:ring-red-800",
};

// ─── CHART OPTIONS (dark-aware) ───────────────────────────────
function buildChartOptions(dark, type = "line") {
  const gridColor = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const tickColor = dark ? "#64748b" : "#94a3b8";
  const tooltipBg = dark ? "#0f172a" : "#1e293b";

  const base = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: "#f1f5f9",
        bodyColor: "#94a3b8",
        padding: 10,
        cornerRadius: 8,
        callbacks: { label: (ctx) => ` $${ctx.raw.toLocaleString()}` },
      },
    },
    scales: {
      x: {
        grid: { color: type === "bar" ? "transparent" : gridColor },
        ticks: { color: tickColor, font: { size: 12 } },
        border: { color: "transparent" },
      },
      y: {
        grid: { color: gridColor },
        ticks: {
          color: tickColor,
          font: { size: 12 },
          callback: (v) => `$${v}`,
        },
        border: { color: "transparent" },
      },
    },
  };

  if (type === "bar") {
    base.borderRadius = 8;
    base.borderSkipped = false;
  }

  return base;
}

// ─── COMPONENT ───────────────────────────────────────────────
export default function Dashboard() {
  const { dark } = useTheme();

  // useMemo ป้องกัน chart re-generate ทุก render
  const lineData = useMemo(
    () => ({
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: "Revenue",
          data: Array.from({ length: 7 }, () =>
            faker.number.int({ min: 100, max: 1000 }),
          ),
          borderColor: "#10b981",
          backgroundColor: "rgba(16,185,129,0.08)",
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: "#10b981",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
        },
      ],
    }),
    [],
  );

  const barData = useMemo(
    () => ({
      labels: ["Electronics", "Clothing", "Food", "Books", "Sports", "Beauty"],
      datasets: [
        {
          label: "Sales",
          data: Array.from({ length: 6 }, () =>
            faker.number.int({ min: 200, max: 1200 }),
          ),
          backgroundColor: [
            "rgba(20,184,166,0.85)",
            "rgba(139,92,246,0.85)",
            "rgba(251,146,60,0.85)",
            "rgba(56,189,248,0.85)",
            "rgba(52,211,153,0.85)",
            "rgba(251,113,133,0.85)",
          ],
          hoverBackgroundColor: [
            "rgba(20,184,166,1)",
            "rgba(139,92,246,1)",
            "rgba(251,146,60,1)",
            "rgba(56,189,248,1)",
            "rgba(52,211,153,1)",
            "rgba(251,113,133,1)",
          ],
          borderWidth: 0,
        },
      ],
    }),
    [],
  );

  const [projects, setProjects] = useState([
    { id: 1, website: "Admin Dashboard", tool: "React", process: "90%" },
    { id: 2, website: "Admin Dashboard", tool: "Vue", process: "20%" },
    { id: 3, website: "Admin Dashboard", tool: "Next.JS", process: "30%" },
    { id: 4, website: "CRM", tool: "React", process: "40%" },
    { id: 5, website: "Blog", tool: "Vue", process: "60%" },
    { id: 6, website: "eCommerce", tool: "Next.JS", process: "75%" },
    { id: 7, website: "Admin Dashboard", tool: "Angular", process: "15%" },
  ]);

  const handleDelete = (id) =>
    setProjects((prev) => prev.filter((p) => p.id !== id));

  const getToolIcon = (tool) => TOOL_ICONS[tool] || null;
  const getProgressColor = (tool) => TOOL_COLORS[tool] || TOOL_COLORS.default;
  const getToolBadge = (tool) =>
    TOOL_BADGE[tool] ||
    "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-600";

  const lineOptions = buildChartOptions(dark, "line");
  const barOptions = buildChartOptions(dark, "bar");

  return (
    <DefaultLayout>
      <main className="p-4 sm:p-6 space-y-6">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500 via-cyan-500 to-emerald-500 p-6 sm:p-8">
          <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="relative z-10">
            <p className="text-sm font-medium text-white/70 uppercase tracking-widest mb-1">
              Welcome back
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Overview
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatisticsCard
                icon={UsersIcon}
                title="Today's Users"
                value="1,234"
              />
              <StatisticsCard
                icon={CurrencyDollarIcon}
                title="Revenue"
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

        {/* Banner */}
        <div className="overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row">
          <div className="md:w-48 flex-shrink-0">
            <img
              className="h-40 w-full object-cover md:h-full"
              src="src/assets/Logo-website-1.png"
              alt="Company logo"
            />
          </div>
          <div className="p-6 flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-500 mb-1">
              Company Retreats
            </span>
            <a
              href="#"
              className="text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors leading-snug mb-2"
            >
              Incredible accommodation for your team
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Looking to take your team away on a retreat to enjoy awesome food
              and take in some sunshine? We have a list of places to do just
              that.
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  Sales Overview
                </h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  Weekly revenue trend
                </p>
              </div>
              <span className="text-xs text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 ring-1 ring-teal-200 dark:ring-teal-800 px-2.5 py-1 rounded-full font-medium">
                This Week
              </span>
            </div>
            <Line data={lineData} options={lineOptions} />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  Top Categories
                </h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  Sales by product category
                </p>
              </div>
              <span className="text-xs text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30 ring-1 ring-violet-200 dark:ring-violet-800 px-2.5 py-1 rounded-full font-medium">
                This Month
              </span>
            </div>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">
              Projects
            </h3>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {projects.length} total
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700 text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  {TABLE_HEADERS.map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-gray-50/60 dark:hover:bg-gray-700/40 transition-colors duration-150"
                  >
                    <td className="px-5 py-3.5 whitespace-nowrap font-medium text-gray-700 dark:text-gray-200">
                      {project.website}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getToolBadge(project.tool)}`}
                      >
                        {getToolIcon(project.tool)}
                        {project.tool}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-28 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getProgressColor(project.tool)}`}
                            style={{ width: project.process }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 w-8 text-right">
                          {project.process}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          title="Edit"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/30 transition-colors"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          title="Delete"
                          onClick={() => handleDelete(project.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
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
