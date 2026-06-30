// PolarAreaCharts.jsx
import { useRef, useEffect, useState, useMemo } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useTheme } from "../../context/ThemeContext";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  PolarAreaController,
  RadialLinearScale,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  PolarAreaController,
  RadialLinearScale,
);

// ─── CONSTANTS ───────────────────────────────────────────────
const SEGMENTS = [
  {
    label: "Electronics",
    flat: "rgba(59,130,246,0.7)",
    from: "rgba(59,130,246,0.9)",
    to: "rgba(59,130,246,0.15)",
  },
  {
    label: "Clothing",
    flat: "rgba(139,92,246,0.7)",
    from: "rgba(139,92,246,0.9)",
    to: "rgba(139,92,246,0.15)",
  },
  {
    label: "Food",
    flat: "rgba(251,146,60,0.7)",
    from: "rgba(251,146,60,0.9)",
    to: "rgba(251,146,60,0.15)",
  },
  {
    label: "Books",
    flat: "rgba(20,184,166,0.7)",
    from: "rgba(20,184,166,0.9)",
    to: "rgba(20,184,166,0.15)",
  },
  {
    label: "Sports",
    flat: "rgba(239,68,68,0.7)",
    from: "rgba(239,68,68,0.9)",
    to: "rgba(239,68,68,0.15)",
  },
  {
    label: "Beauty",
    flat: "rgba(251,113,133,0.7)",
    from: "rgba(251,113,133,0.9)",
    to: "rgba(251,113,133,0.15)",
  },
];

const LABELS = SEGMENTS.map((s) => s.label);
const TOTAL = (values) => values.reduce((a, b) => a + b, 0);

// ─── HELPERS ─────────────────────────────────────────────────
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
  const gridColor = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const tickColor = dark ? "#64748b" : "#94a3b8";
  const textColor = dark ? "#94a3b8" : "#64748b";
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: textColor,
          boxWidth: 10,
          boxHeight: 10,
          borderRadius: 3,
          useBorderRadius: true,
          padding: 14,
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
            const pct = (
              (ctx.raw / TOTAL(ctx.chart.data.datasets[0].data)) *
              100
            ).toFixed(1);
            return ` ${ctx.label}: ${ctx.raw} (${pct}%)`;
          },
        },
      },
    },
    scales: {
      r: {
        grid: { color: gridColor },
        ticks: {
          color: tickColor,
          backdropColor: "transparent",
          font: { size: 11 },
        },
        pointLabels: { display: false },
      },
    },
  };
}

// ─── CUSTOM LEGEND (mobile) ───────────────────────────────────
function CustomLegend({ values }) {
  const total = TOTAL(values);
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 sm:hidden">
      {SEGMENTS.map((s, i) => (
        <div key={s.label} className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
            style={{ background: s.flat }}
          />
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {s.label}
          </span>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 ml-auto">
            {((values[i] / total) * 100).toFixed(0)}%
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── CARD ─────────────────────────────────────────────────────
function ChartCard({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5">
      <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

// ─── COMPONENT ───────────────────────────────────────────────
export default function PolarAreaCharts() {
  const { dark } = useTheme();
  const chartRef = useRef(null);
  const [gradientBg, setGradientBg] = useState(SEGMENTS.map((s) => s.flat));

  // generate ครั้งเดียว
  const values = useMemo(
    () => SEGMENTS.map(() => faker.number.int({ min: 10, max: 100 })),
    [],
  );

  const buildGradients = () => {
    const chart = chartRef.current;
    if (!chart?.chartArea) return;
    const { ctx, chartArea } = chart;
    setGradientBg(
      SEGMENTS.map((s) => makeGradient(ctx, chartArea, s.from, s.to)),
    );
  };

  useEffect(() => {
    buildGradients();
    window.addEventListener("resize", buildGradients);
    return () => window.removeEventListener("resize", buildGradients);
  }, []);

  const baseDataset = {
    label: "Sales",
    data: values,
    borderWidth: 0,
  };

  const normalData = useMemo(
    () => ({
      labels: LABELS,
      datasets: [
        { ...baseDataset, backgroundColor: SEGMENTS.map((s) => s.flat) },
      ],
    }),
    [values],
  );

  const gradientData = {
    labels: LABELS,
    datasets: [{ ...baseDataset, backgroundColor: gradientBg }],
  };

  const isMobile = window.innerWidth < 640;
  const options = buildOptions(dark);
  const mobileOptions = {
    ...options,
    plugins: { ...options.plugins, legend: { display: false } },
  };

  return (
    <DefaultLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Polar Area Charts
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Polar area chart variants with flat and gradient fill
          </p>
        </div>

        <ChartCard title="Normal fill">
          <div style={{ height: 300 }}>
            <Chart
              type="polarArea"
              data={normalData}
              options={isMobile ? mobileOptions : options}
            />
          </div>
          <CustomLegend values={values} />
        </ChartCard>

        <ChartCard title="Gradient fill">
          <div style={{ height: 300 }}>
            <Chart
              ref={chartRef}
              type="polarArea"
              data={gradientData}
              options={isMobile ? mobileOptions : options}
            />
          </div>
          <CustomLegend values={values} />
        </ChartCard>
      </div>
    </DefaultLayout>
  );
}
