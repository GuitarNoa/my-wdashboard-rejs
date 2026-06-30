// LineCharts.jsx
import { useRef, useEffect, useState, useMemo } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useTheme } from "../../context/ThemeContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

// ─── CONSTANTS ───────────────────────────────────────────────
const LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const SERIES = [
  {
    label: "Revenue",
    border: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    gradientStops: ["#6366f1", "#3b82f6", "#06b6d4"],
  },
  {
    label: "Expenses",
    border: "#f43f5e",
    bg: "rgba(244,63,94,0.12)",
    gradientStops: ["#f43f5e", "#fb923c", "#fbbf24"],
  },
];

// ─── HELPERS ─────────────────────────────────────────────────
const randomData = () =>
  LABELS.map(() => faker.number.int({ min: -1000, max: 1000 }));

function makeLineGradient(ctx, area, stops) {
  const g = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  stops.forEach((color, i) => g.addColorStop(i / (stops.length - 1), color));
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
        callbacks: {
          label: (ctx) => {
            const v = ctx.raw;
            return ` ${ctx.dataset.label}: ${v >= 0 ? "+" : ""}${v.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: gridColor },
        border: { color: "transparent" },
        ticks: { color: tickColor, font: { size: 12 } },
      },
      y: {
        grid: { color: gridColor },
        border: { color: "transparent" },
        ticks: {
          color: tickColor,
          font: { size: 12 },
          callback: (v) => `${v >= 0 ? "+" : ""}${v.toLocaleString()}`,
        },
      },
    },
  };
}

// ─── CARD ─────────────────────────────────────────────────────
function ChartCard({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5">
      <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        {title}
      </h2>
      <div style={{ height: 280 }}>{children}</div>
    </div>
  );
}

// ─── COMPONENT ───────────────────────────────────────────────
export default function LineCharts() {
  const { dark } = useTheme();
  const chartRef = useRef(null);
  const [gradientDatasets, setGradientDatasets] = useState([]);

  // generate ครั้งเดียว
  const staticData = useMemo(() => SERIES.map(() => randomData()), []);

  const normalData = useMemo(
    () => ({
      labels: LABELS,
      datasets: SERIES.map((s, i) => ({
        label: s.label,
        data: staticData[i],
        borderColor: s.border,
        backgroundColor: s.bg,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: s.border,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      })),
    }),
    [staticData],
  );

  const buildGradientDatasets = () => {
    const chart = chartRef.current;
    if (!chart?.chartArea) return;
    const { ctx, chartArea } = chart;

    setGradientDatasets(
      SERIES.map((s, i) => ({
        label: s.label,
        data: staticData[i],
        borderColor: makeLineGradient(ctx, chartArea, s.gradientStops),
        backgroundColor: "transparent",
        borderWidth: 2.5,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: s.gradientStops[1],
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      })),
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
            Line Charts
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Line chart variants with flat and gradient stroke
          </p>
        </div>

        <ChartCard title="Normal line">
          <Chart type="line" data={normalData} options={options} />
        </ChartCard>

        <ChartCard title="Gradient line">
          <Chart
            ref={chartRef}
            type="line"
            data={gradientData}
            options={options}
          />
        </ChartCard>
      </div>
    </DefaultLayout>
  );
}
