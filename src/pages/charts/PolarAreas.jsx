import React, { useRef, useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

// Register Chart.js modules
ChartJS.register(ArcElement, Tooltip, Legend);

const labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
const colors = ["red", "blue", "yellow", "green", "purple", "orange"];

// Data Normal
const baseData = {
  labels,
  datasets: [
    {
      label: "Polar Votes",
      data: labels.map(() => faker.number.int({ min: 10, max: 100 })),
      backgroundColor: colors.map((c) => c + "99"),
    },
  ],
};

// Gradient helper
function createGradient(ctx, area, color1, color2) {
  const gradient = ctx.createLinearGradient(
    area.left,
    area.bottom,
    area.right,
    area.top
  );
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
}

export default function PolarAreaChart() {
  const chartRef = useRef(null);
  const [gradientData, setGradientData] = useState({ datasets: [] });

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const { ctx, chartArea } = chart;
    if (!chartArea) return;

    const newData = {
      ...baseData,
      datasets: [
        {
          ...baseData.datasets[0],
          backgroundColor: labels.map((_, i) =>
            createGradient(ctx, chartArea, colors[i], "white")
          ),
        },
      ],
    };

    setGradientData(newData);

    const handleResize = () => {
      if (!chart.chartArea) return;
      const updated = {
        ...baseData,
        datasets: [
          {
            ...baseData.datasets[0],
            backgroundColor: labels.map((_, i) =>
              createGradient(ctx, chart.chartArea, colors[i], "white")
            ),
          },
        ],
      };
      setGradientData(updated);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DefaultLayout>
      <div className="text-xl font-bold mb-4">Polar Area Charts</div>

      {/* Polar Area Normal */}
      <div className="mb-8">
        <h2 className="font-semibold mb-2">Polar Area - Normal</h2>
        <Chart type="polarArea" data={baseData} />
      </div>

      {/* Polar Area Gradient */}
      <div>
        <h2 className="font-semibold mb-2">Polar Area - Gradient</h2>
        <Chart ref={chartRef} type="polarArea" data={gradientData} />
      </div>
    </DefaultLayout>
  );
}
