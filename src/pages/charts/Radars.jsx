import React, { useRef, useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  RadarController, // ✅ เพิ่ม RadarController
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  RadarController // ✅ Register RadarController
);

const labels = ["Running", "Swimming", "Cycling", "Climbing", "Yoga", "Gym"];

const baseData = {
  labels,
  datasets: [
    {
      label: "Person A",
      data: [65, 59, 90, 81, 56, 55],
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      pointBackgroundColor: "rgba(255, 99, 132, 1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255, 99, 132, 1)",
    },
    {
      label: "Person B",
      data: [28, 48, 40, 19, 96, 27],
      fill: true,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      pointBackgroundColor: "rgba(54, 162, 235, 1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(54, 162, 235, 1)",
    },
  ],
};

export default function RadarCharts() {
  const chartRef = useRef(null);
  const [gradientData, setGradientData] = useState(baseData);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const { ctx, chartArea } = chart;
    if (!chartArea) return;

    const gradientA = createGradient(
      ctx,
      chartArea,
      "rgba(255,99,132,0.4)",
      "rgba(255,159,64,0.4)"
    );
    const gradientB = createGradient(
      ctx,
      chartArea,
      "rgba(54,162,235,0.4)",
      "rgba(153,102,255,0.4)"
    );

    setGradientData({
      ...baseData,
      datasets: [
        {
          ...baseData.datasets[0],
          backgroundColor: gradientA,
          borderColor: "rgba(255,99,132,1)",
        },
        {
          ...baseData.datasets[1],
          backgroundColor: gradientB,
          borderColor: "rgba(54,162,235,1)",
        },
      ],
    });
  }, []);

  return (
    <DefaultLayout>
      <div className="text-xl font-bold mb-4">Radar Charts</div>

      {/* Radar Normal */}
      <div className="mb-8">
        <h2 className="font-semibold mb-2">Radar Chart - Normal</h2>
        <Chart type="radar" data={baseData} />
      </div>

      {/* Radar Gradient */}
      <div>
        <h2 className="font-semibold mb-2">Radar Chart - Gradient</h2>
        <Chart ref={chartRef} type="radar" data={gradientData} />
      </div>
    </DefaultLayout>
  );
}

// Gradient helper
function createGradient(ctx, area, color1, color2) {
  const gradient = ctx.createLinearGradient(
    area.left,
    area.top,
    area.right,
    area.bottom
  );
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
}
