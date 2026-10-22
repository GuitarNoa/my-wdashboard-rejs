// BubbleCharts.jsx
import { useMemo } from "react";
import { chartGradient } from "./chartUtils";
import { useTheme } from "../../context/ThemeContext";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  BubbleController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, BubbleController);

// ─── CONSTANTS ───────────────────────────────────────────────
const SERIES = [
  {
    label: "Product A",
    flat: "rgba(239,68,68,0.65)",
    hoverFlat: "rgba(239,68,68,0.9)",
    gradientFrom: "rgba(239,68,68,0.85)",
    gradientTo: "rgba(251,146,60,0.85)",
  },
  {
    label: "Product B",
    flat: "rgba(59,130,246,0.65)",
    hoverFlat: "rgba(59,130,246,0.9)",
    gradientFrom: "rgba(59,130,246,0.85)",
    gradientTo: "rgba(34,211,238,0.85)",
  },
];

// ─── HELPERS ─────────────────────────────────────────────────
const sampleData = (series) =>
  Array.from({ length: 10 }, (_, index) => ({
    x: 10 + ((index * 23 + series * 37) % 81),
    y: 10 + ((index * 41 + series * 19) % 81),
    r: 5 + ((index * 7 + series * 3) % 14),
  }));

function makeGradient(ctx, area, from, to) {
  const g = ctx.createLinearGradient(
    area.left,
    area.bottom,
    area.right,
    area.top,
  );
  g.addColorStop(0, from);
  g.addColorStop(1, to);
  return g;
}

function buildOptions(dark) {
  const gridColor = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const tickColor = dark ? "#94a3b8" : "#64748b";
  return {
    responsive: true,
    maintainAspectRatio: false,
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
          label: (ctx) =>
            ` ${ctx.dataset.label}: (${ctx.raw.x}, ${ctx.raw.y}) — size ${ctx.raw.r}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: gridColor },
        border: { color: "transparent" },
        ticks: { color: tickColor, font: { size: 12 } },
        // padding รอบขอบ ป้องกัน bubble ถูกตัด
        min: 0,
        max: 100,
      },
      y: {
        grid: { color: gridColor },
        border: { color: "transparent" },
        ticks: { color: tickColor, font: { size: 12 } },
        min: 0,
        max: 100,
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
      <div style={{ height: 300 }}>{children}</div>
    </div>
  );
}

// ─── COMPONENT ───────────────────────────────────────────────
export default function BubbleCharts() {
  const { dark } = useTheme();

  const staticData = useMemo(() => SERIES.map((_, index) => sampleData(index)), []);

  const normalData = useMemo(
    () => ({
      datasets: SERIES.map((s, i) => ({
        label: s.label,
        data: staticData[i],
        backgroundColor: s.flat,
        hoverBackgroundColor: s.hoverFlat,
        borderWidth: 0,
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

  const options = buildOptions(dark);

  return (
    <main>
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Bubble Charts
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Bubble chart variants with flat and gradient fill
          </p>
        </div>

        <ChartCard title="Normal fill">
          <Chart type="bubble" data={normalData} options={options} />
        </ChartCard>

        <ChartCard title="Gradient fill">
          <Chart
            type="bubble"
            data={gradientData}
            options={options}
          />
        </ChartCard>
      </div>
    </main>
  );
}
