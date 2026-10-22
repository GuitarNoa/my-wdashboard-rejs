// LineCharts.jsx
import { useMemo } from "react";
import { chartGradient } from "./chartUtils";
import { useTheme } from "../../context/ThemeContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
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
const sampleData = (series) =>
  LABELS.map((_, index) => -500 + ((index * 257 + series * 431) % 1501));

function makeLineGradient(ctx, area, stops) {
  const g = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  stops.forEach((color, i) => g.addColorStop(i / (stops.length - 1), color));
  return g;
}

function buildOptions(dark) {
  const gridColor = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const tickColor = dark ? "#94a3b8" : "#64748b";
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

  const staticData = useMemo(() => SERIES.map((_, index) => sampleData(index)), []);

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

  const gradientData = useMemo(() => ({
    ...normalData,
    datasets: normalData.datasets.map((dataset, index) => {
      const series = SERIES[index];
      return {
        ...dataset,
        borderColor: chartGradient((ctx, area) => makeLineGradient(ctx, area, series.gradientStops), series.border),
      };
    }),
  }), [normalData]);

  const options = buildOptions(dark);

  return (
    <main>
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Line Charts
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Line chart variants with flat and gradient stroke
          </p>
        </div>

        <ChartCard title="Normal line">
          <Chart type="line" data={normalData} options={options} />
        </ChartCard>

        <ChartCard title="Gradient line">
          <Chart
            type="line"
            data={gradientData}
            options={options}
          />
        </ChartCard>
      </div>
    </main>
  );
}
