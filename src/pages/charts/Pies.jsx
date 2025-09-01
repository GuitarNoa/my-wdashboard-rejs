import React, { useRef, useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  PieController, // ✅ เพิ่มตรงนี้
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

// ✅ ต้อง Register PieController ด้วย
ChartJS.register(ArcElement, Tooltip, Legend, PieController);

const labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];

const baseData = {
  labels,
  datasets: [
    {
      label: "Votes",
      data: labels.map(() => faker.number.int({ min: 10, max: 100 })),
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

export default function PieCharts() {
  const chartRef = useRef(null);
  const [gradientData, setGradientData] = useState(baseData);

  useEffect(() => {
    const updateGradient = () => {
      const chartInstance = chartRef.current;
      if (!chartInstance || !chartInstance.ctx || !chartInstance.chartArea)
        return;

      const { ctx, chartArea } = chartInstance;

      const newData = {
        ...baseData,
        datasets: [
          {
            ...baseData.datasets[0],
            backgroundColor: [
              createGradient(ctx, chartArea, "red", "orange"),
              createGradient(ctx, chartArea, "blue", "cyan"),
              createGradient(ctx, chartArea, "yellow", "lime"),
              createGradient(ctx, chartArea, "green", "teal"),
              createGradient(ctx, chartArea, "purple", "pink"),
              createGradient(ctx, chartArea, "orange", "gold"),
            ],
          },
        ],
      };

      setGradientData(newData);
    };

    updateGradient();
    window.addEventListener("resize", updateGradient);
    return () => window.removeEventListener("resize", updateGradient);
  }, []);

  return (
    <DefaultLayout>
      <div className="text-xl font-bold mb-4">Pie Charts</div>

      <div className="mb-8">
        <h2 className="font-semibold mb-2">Pie Chart - Normal</h2>
        <Chart type="pie" data={baseData} />
      </div>

      <div>
        <h2 className="font-semibold mb-2">Pie Chart - Gradient</h2>
        <Chart ref={chartRef} type="pie" data={gradientData} />
      </div>
    </DefaultLayout>
  );
}
