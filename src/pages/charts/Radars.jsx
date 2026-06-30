// RadarCharts.jsx
import { useRef, useEffect, useState, useMemo } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useTheme } from "../../context/ThemeContext";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  RadarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  RadarController,
);

// ─── CONSTANTS ───────────────────────────────────────────────
const LABELS = ["Running", "Swimming", "Cycling", "Climbing", "Yoga", "Gym"];

const SERIES = [
  {
    label: "Person A",
    data: [65, 59, 90, 81, 56, 55],
    border: "#f43f5e",
    flat: "rgba(244,63,94,0.2)",
    gradientFrom: "rgba(244,63,94,0.5)",
    gradientTo: "rgba(251,146,60,0.1)",
  },
  {
    label: "Person B",
    data: [28, 48, 40, 19, 96, 27],
    border: "#3b82f6",
    flat: "rgba(59,130,246,0.2)",
    gradientFrom: "rgba(59,130,246,0.5)",
    gradientTo: "rgba(139,92,246,0.1)",
  },
];

// ─── HELPERS ─────────────────────────────────────────────────
function makeGradient(ctx, area, from, to) {
  const g = ctx.createLinearGradient(
    area.left,
    area.top,
    area.right,
    area.bottom,
  );
  g.addColorStop(0, from);
  g.addColorStop(1, to);
  return g;
}

function buildOptions(dark) {
  const gridColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const tickColor = dark ? "#64748b" : "#94a3b8";
  const labelColor = dark ? "#cbd5e1" : "#475569";
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
      },
    },
    scales: {
      r: {
        angleLines: { color: gridColor },
        grid: { color: gridColor },
        pointLabels: { color: labelColor, font: { size: 12 } },
        ticks: {
          color: tickColor,
          backdropColor: "transparent",
          font: { size: 10 },
        },
        suggestedMin: 0,
        suggestedMax: 100,
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
      <div style={{ height: 320 }}>{children}</div>
    </div>
  );
}

// ─── COMPONENT ───────────────────────────────────────────────
export default function RadarCharts() {
  const { dark } = useTheme();
  const chartRef = useRef(null);
  const [gradientDatasets, setGradientDatasets] = useState([]);

  const normalData = useMemo(
    () => ({
      labels: LABELS,
      datasets: SERIES.map((s) => ({
        label: s.label,
        data: s.data,
        fill: true,
        borderColor: s.border,
        backgroundColor: s.flat,
        borderWidth: 2,
        pointBackgroundColor: s.border,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: s.border,
        pointRadius: 3,
      })),
    }),
    [],
  );

  const buildGradientDatasets = () => {
    const chart = chartRef.current;
    if (!chart?.chartArea) return;
    const { ctx, chartArea } = chart;

    setGradientDatasets(
      SERIES.map((s) => ({
        label: s.label,
        data: s.data,
        fill: true,
        borderColor: s.border,
        backgroundColor: makeGradient(
          ctx,
          chartArea,
          s.gradientFrom,
          s.gradientTo,
        ),
        borderWidth: 2,
        pointBackgroundColor: s.border,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: s.border,
        pointRadius: 3,
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
            Radar Charts
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Radar chart variants with flat and gradient fill
          </p>
        </div>

        <ChartCard title="Normal fill">
          <Chart type="radar" data={normalData} options={options} />
        </ChartCard>

        <ChartCard title="Gradient fill">
          <Chart
            ref={chartRef}
            type="radar"
            data={gradientData}
            options={options}
          />
        </ChartCard>
      </div>
    </DefaultLayout>
  );
}
