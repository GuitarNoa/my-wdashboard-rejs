// AreaCharts.jsx
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
  Filler,
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
const sampleData = (series) =>
  LABELS.map((_, index) => 10 + ((index * 23 + series * 37) % 91));

function makeGradient(ctx, area, from, to) {
  const g = ctx.createLinearGradient(0, area.top, 0, area.bottom);
  g.addColorStop(0, from);
  g.addColorStop(1, to);
  return g;
}

function buildChartOptions(dark) {
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

  const staticData = useMemo(() => SERIES.map((_, index) => sampleData(index)), []);

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

  const gradientData = useMemo(() => ({
    ...normalData,
    datasets: normalData.datasets.map((dataset, index) => {
      const series = SERIES[index];
      return {
        ...dataset,
        backgroundColor: chartGradient((ctx, area) => makeGradient(ctx, area, series.gradientFrom, series.gradientTo), series.flat),
      };
    }),
  }), [normalData]);

  const options = buildChartOptions(dark);

  return (
    <main>
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Area Charts
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Line chart with filled area variants
          </p>
        </div>

        <ChartCard title="Normal fill">
          <Chart type="line" data={normalData} options={options} />
        </ChartCard>

        <ChartCard title="Gradient fill">
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
