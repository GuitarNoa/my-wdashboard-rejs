// DonutCharts.jsx
import { useRef, useEffect, useState, useMemo } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useTheme } from "../../context/ThemeContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// ─── CONSTANTS ───────────────────────────────────────────────
const SEGMENTS = [
  {
    label: "Electronics",
    value: 32,
    flat: "rgba(59,130,246,0.75)",
    from: "rgba(59,130,246,0.9)",
    to: "rgba(34,211,238,0.9)",
  },
  {
    label: "Clothing",
    value: 24,
    flat: "rgba(139,92,246,0.75)",
    from: "rgba(139,92,246,0.9)",
    to: "rgba(236,72,153,0.9)",
  },
  {
    label: "Food",
    value: 18,
    flat: "rgba(251,146,60,0.75)",
    from: "rgba(251,146,60,0.9)",
    to: "rgba(251,191,36,0.9)",
  },
  {
    label: "Books",
    value: 12,
    flat: "rgba(20,184,166,0.75)",
    from: "rgba(20,184,166,0.9)",
    to: "rgba(59,130,246,0.9)",
  },
  {
    label: "Sports",
    value: 8,
    flat: "rgba(239,68,68,0.75)",
    from: "rgba(239,68,68,0.9)",
    to: "rgba(251,146,60,0.9)",
  },
  {
    label: "Beauty",
    value: 6,
    flat: "rgba(251,113,133,0.75)",
    from: "rgba(251,113,133,0.9)",
    to: "rgba(139,92,246,0.9)",
  },
];

const LABELS = SEGMENTS.map((s) => s.label);
const VALUES = SEGMENTS.map((s) => s.value);
const TOTAL = VALUES.reduce((a, b) => a + b, 0);

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
  const textColor = dark ? "#94a3b8" : "#64748b";
  return {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
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
            const pct = ((ctx.raw / TOTAL) * 100).toFixed(1);
            return ` ${ctx.label}: ${ctx.raw} (${pct}%)`;
          },
        },
      },
    },
  };
}

// ─── LEGEND ──────────────────────────────────────────────────
// legend แยกเพื่อแสดงบน mobile ที่ position:"right" คับแคบ
function CustomLegend() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 sm:hidden">
      {SEGMENTS.map((s) => (
        <div key={s.label} className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
            style={{ background: s.flat }}
          />
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {s.label}
          </span>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 ml-auto">
            {((s.value / TOTAL) * 100).toFixed(0)}%
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
export default function DonutCharts() {
  const { dark } = useTheme();
  const chartRef = useRef(null);
  const [gradientBg, setGradientBg] = useState(SEGMENTS.map((s) => s.flat));

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
    data: VALUES,
    borderWidth: 0,
    hoverOffset: 6,
  };

  const normalData = useMemo(
    () => ({
      labels: LABELS,
      datasets: [
        { ...baseDataset, backgroundColor: SEGMENTS.map((s) => s.flat) },
      ],
    }),
    [],
  );

  const gradientData = {
    labels: LABELS,
    datasets: [{ ...baseDataset, backgroundColor: gradientBg }],
  };

  const options = buildOptions(dark);

  // mobile: ซ่อน legend ใน chart ใช้ CustomLegend แทน
  const mobileOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      legend: { display: false },
    },
  };
  const isMobile = window.innerWidth < 640;

  return (
    <DefaultLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Donut Charts
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Doughnut chart variants with flat and gradient fill
          </p>
        </div>

        <ChartCard title="Normal fill">
          <div style={{ height: 280 }}>
            <Doughnut
              data={normalData}
              options={isMobile ? mobileOptions : options}
            />
          </div>
          <CustomLegend />
        </ChartCard>

        <ChartCard title="Gradient fill">
          <div style={{ height: 280 }}>
            <Doughnut
              ref={chartRef}
              data={gradientData}
              options={isMobile ? mobileOptions : options}
            />
          </div>
          <CustomLegend />
        </ChartCard>
      </div>
    </DefaultLayout>
  );
}
