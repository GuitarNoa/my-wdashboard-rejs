import React, { useRef, useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];

// Donut ปกติ
const baseData = {
  labels,
  datasets: [
    {
      label: "Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 206, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(153, 102, 255, 0.7)",
        "rgba(255, 159, 64, 0.7)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function DonutCharts() {
  const chartRef = useRef(null);
  const [gradientData, setGradientData] = useState(baseData);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const { ctx, chartArea } = chart;
    if (!chartArea) return;

    const gradients = [
      createGradient(ctx, chartArea, "rgba(255,99,132,0.7)", "rgba(255,159,64,0.7)"),
      createGradient(ctx, chartArea, "rgba(54,162,235,0.7)", "rgba(153,102,255,0.7)"),
      createGradient(ctx, chartArea, "rgba(255,206,86,0.7)", "rgba(75,192,192,0.7)"),
      createGradient(ctx, chartArea, "rgba(75,192,192,0.7)", "rgba(54,162,235,0.7)"),
      createGradient(ctx, chartArea, "rgba(153,102,255,0.7)", "rgba(255,99,132,0.7)"),
      createGradient(ctx, chartArea, "rgba(255,159,64,0.7)", "rgba(255,206,86,0.7)"),
    ];

    setGradientData({
      ...baseData,
      datasets: [
        {
          ...baseData.datasets[0],
          backgroundColor: gradients,
        },
      ],
    });
  }, []);

  return (
    <DefaultLayout>
      <div className="text-xl font-bold mb-4">Donut Charts</div>

      {/* Donut Chart Normal */}
      <div className="mb-8">
        <h2 className="font-semibold mb-2">Donut Chart - Normal</h2>
        <Chart type="doughnut" data={baseData} />
      </div>

      {/* Donut Chart Gradient */}
      <div>
        <h2 className="font-semibold mb-2">Donut Chart - Gradient</h2>
        <Chart ref={chartRef} type="doughnut" data={gradientData} />
      </div>
    </DefaultLayout>
  );
}

// ฟังก์ชันสร้าง Gradient
function createGradient(ctx, area, color1, color2) {
  const gradient = ctx.createLinearGradient(area.left, area.bottom, area.right, area.top);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
}
