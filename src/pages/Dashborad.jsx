// Dashboard.jsx
import { useState, useMemo } from "react";
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
import { Link } from "react-router-dom";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UsersIcon,
  UserPlusIcon,

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
          data: [420, 680, 540, 820, 610, 940, 780],
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
          data: [1080, 820, 610, 430, 760, 520],
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

  const [deleted, setDeleted] = useState(null);
  const handleDelete = (id) => {
    setDeleted(projects.find(project => project.id === id));
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const getToolIcon = (tool) => TOOL_ICONS[tool] || null;
  const getProgressColor = (tool) => TOOL_COLORS[tool] || TOOL_COLORS.default;
  const getToolBadge = (tool) =>
    TOOL_BADGE[tool] ||
    "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 ring-1 ring-gray-200 dark:ring-gray-600";

  const lineOptions = buildChartOptions(dark, "line");
  const barOptions = buildChartOptions(dark, "bar");

  return (
    <main className="p-4 sm:p-6 space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-teal-950 to-teal-800 p-6 sm:p-8">
        <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
        <div className="relative z-10">
          <p className="text-sm font-medium text-white/70 uppercase tracking-widest mb-1">
            Workspace analytics
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Overview
          </h1>
          <p className="mb-6 text-sm text-teal-100">A snapshot of your workspace. Sample data for exploration.</p>
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

      <section aria-label="Quick actions" className="grid gap-4 sm:grid-cols-3">
        {[{ to: "/CRM", title: "Manage customers", text: "Explore contacts and customer records." }, { to: "/ECommerce", title: "Track inventory", text: "Review products, stock and value." }, { to: "/profile", title: "Make it yours", text: "Update your profile and skills." }].map(item => <Link key={item.to} to={item.to} className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-teal-500 dark:border-slate-700 dark:bg-gray-800 dark:hover:border-teal-500"><h2 className="font-semibold">{item.title} <span aria-hidden="true" className="float-right text-teal-600">↗</span></h2><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{item.text}</p></Link>)}
      </section>

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

      {deleted && <p role="status" className="rounded-xl bg-teal-50 p-4 text-sm text-teal-800 dark:bg-teal-950 dark:text-teal-200">Project removed from this demo. <button type="button" className="ml-2 font-semibold underline" onClick={() => { setProjects(current => [...current, deleted].sort((a, b) => a.id - b.id)); setDeleted(null); }}>Undo</button></p>}
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
              {projects.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-slate-500">No projects left in this demo. Refresh to restore sample data.</td></tr>}
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
                        title="Delete"
                        aria-label={"Delete " + project.website + " (" + project.tool + ")"}
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
  );
}
