// AreaCharts.jsx
import { useRef, useEffect, useState, useMemo } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useTheme } from "../../context/ThemeContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
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
  Filler,
  Tooltip,
  Legend,
);

// ─── CONSTANTS ───────────────────────────────────────────────
const LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const SERIES = [
  {
    label: "Dataset 1",
    border: "#3b82f6",
    gradientFrom: "rgba(59,130,246,0.5)",
    gradientTo: "rgba(59,130,246,0.02)",
    flat: "rgba(59,130,246,0.2)",
  },
  {
    label: "Dataset 2",
    border: "#10b981",
    gradientFrom: "rgba(16,185,129,0.5)",
    gradientTo: "rgba(16,185,129,0.02)",
    flat: "rgba(16,185,129,0.2)",
  },
];

// ─── HELPERS ─────────────────────────────────────────────────
const randomData = () =>
  LABELS.map(() => faker.number.int({ min: 10, max: 100 }));

function makeGradient(ctx, area, from, to) {
  const g = ctx.createLinearGradient(0, area.top, 0, area.bottom);
  g.addColorStop(0, from);
  g.addColorStop(1, to);
  return g;
}

function buildChartOptions(dark) {
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
        grid: { color: gridColor },
        border: { color: "transparent" },
        ticks: { color: tickColor, font: { size: 12 } },
      },
      y: {
        grid: { color: gridColor },
        border: { color: "transparent" },
        ticks: { color: tickColor, font: { size: 12 } },
        min: 0,
        max: 110,
      },
    },
  };
}

// ─── CARD WRAPPER ────────────────────────────────────────────
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
export default function AreaCharts() {
  const { dark } = useTheme();
  const chartRef = useRef(null);
  const [gradientDatasets, setGradientDatasets] = useState([]);

  // สร้าง data ครั้งเดียว ไม่ generate ใหม่ทุก render
  const staticData = useMemo(() => SERIES.map(() => randomData()), []);

  // Normal datasets
  const normalData = useMemo(
    () => ({
      labels: LABELS,
      datasets: SERIES.map((s, i) => ({
        label: s.label,
        data: staticData[i],
        borderColor: s.border,
        backgroundColor: s.flat,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: s.border,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      })),
    }),
    [staticData],
  );

  // Gradient datasets — สร้างหลัง chart mount
  const buildGradientDatasets = () => {
    const chart = chartRef.current;
    if (!chart?.chartArea) return;
    const { ctx, chartArea } = chart;

    setGradientDatasets(
      SERIES.map((s, i) => ({
        label: s.label,
        data: staticData[i],
        borderColor: s.border,
        backgroundColor: makeGradient(
          ctx,
          chartArea,
          s.gradientFrom,
          s.gradientTo,
        ),
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: s.border,
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
  const options = buildChartOptions(dark);

  return (
    <DefaultLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Area Charts
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Line chart with filled area variants
          </p>
        </div>

        <ChartCard title="Normal fill">
          <Chart type="line" data={normalData} options={options} />
        </ChartCard>

        <ChartCard title="Gradient fill">
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
