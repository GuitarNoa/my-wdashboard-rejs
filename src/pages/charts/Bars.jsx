// BarCharts.jsx
import { useRef, useEffect, useState, useMemo } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useTheme } from "../../context/ThemeContext";
import {
  Chart as ChartJS,
  CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ─── CONSTANTS ───────────────────────────────────────────────
const LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const SERIES = [
  {
    label: "Sales",
    flat: "rgba(59,130,246,0.75)",
    gradientFrom: "rgba(16,185,129,0.85)",
    gradientTo:   "rgba(139,92,246,0.85)",
    hoverFlat: "rgba(59,130,246,1)",
  },
  {
    label: "Returns",
    flat: "rgba(251,146,60,0.75)",
    gradientFrom: "rgba(251,146,60,0.85)",
    gradientTo:   "rgba(239,68,68,0.85)",
    hoverFlat: "rgba(251,146,60,1)",
  },
];

// ─── HELPERS ─────────────────────────────────────────────────
const randomData = () =>
  LABELS.map(() => faker.number.int({ min: 100, max: 500 }));

function makeGradient(ctx, area, from, to) {
  const g = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  g.addColorStop(0, from);
  g.addColorStop(1, to);
  return g;
}

function buildOptions(dark) {
  const gridColor = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const tickColor = dark ? "#64748b" : "#94a3b8";
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          color: tickColor,
          boxWidth: 10,
          boxHeight: 10,
          borderRadius: 3,
          useBorderRadius: true,
          padding: 16,
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: dark ? "#0f172a" : "#1e293b",
        titleColor: "#f1f5f9",
        bodyColor: "#94a3b8",
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { color: "transparent" },
        ticks: { color: tickColor, font: { size: 12 } },
      },
      y: {
        grid: { color: gridColor },
        border: { color: "transparent" },
        ticks: { color: tickColor, font: { size: 12 } },
        min: 0,
      },
    },
    borderRadius: 6,
    borderSkipped: false,
  };
}

// ─── CARD ────────────────────────────────────────────────────
function ChartCard({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5">
      <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        {title}
      </h2>
      <div style={{ height: 260 }}>{children}</div>
    </div>
  );
}

// ─── COMPONENT ───────────────────────────────────────────────
export default function BarCharts() {
  const { dark } = useTheme();
  const chartRef = useRef(null);
  const [gradientDatasets, setGradientDatasets] = useState([]);

  // generate ครั้งเดียว
  const staticData = useMemo(() => SERIES.map(() => randomData()), []);

  // Normal datasets
  const normalData = useMemo(() => ({
    labels: LABELS,
    datasets: SERIES.map((s, i) => ({
      label: s.label,
      data: staticData[i],
      backgroundColor: s.flat,
      hoverBackgroundColor: s.hoverFlat,
      borderWidth: 0,
    })),
  }), [staticData]);

  // Gradient datasets
  const buildGradientDatasets = () => {
    const chart = chartRef.current;
    if (!chart?.chartArea) return;
    const { ctx, chartArea } = chart;

    setGradientDatasets(
      SERIES.map((s, i) => ({
        label: s.label,
        data: staticData[i],
        backgroundColor: makeGradient(ctx, chartArea, s.gradientFrom, s.gradientTo),
        borderWidth: 0,
      }))
    );
  };

  useEffect(() => {
    buildGradientDatasets();
    window.addEventListener("resize", buildGradientDatasets);
    return () => window.removeEventListener("resize", buildGradientDatasets);
  }, []);

  const gradientData = { labels: LABELS, datasets: gradientDatasets };
  const options = buildOptions(dark);

  return (
    <DefaultLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Bar Charts
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Bar chart variants with flat and gradient fill
          </p>
        </div>

        <ChartCard title="Normal fill">
          <Bar data={normalData} options={options} />
        </ChartCard>

        <ChartCard title="Gradient fill">
          <Bar ref={chartRef} data={gradientData} options={options} />
        </ChartCard>
      </div>
    </DefaultLayout>
  );
}