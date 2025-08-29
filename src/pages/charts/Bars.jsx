import React, { useRef, useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

// Register modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

// Data ปกติ
const baseData = {
  labels,
  datasets: [
    {
      label: "Sales",
      data: labels.map(() => faker.number.int({ min: 100, max: 500 })),
      backgroundColor: "rgba(54, 162, 235, 0.7)",
    },
  ],
};

// ฟังก์ชันสร้าง Gradient
function createGradient(ctx, area, color1, color2) {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
}

export default function BarCharts() {
  const chartRef = useRef(null);
  const [gradientData, setGradientData] = useState({ datasets: [] });

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const updateGradient = () => {
      if (!chart.chartArea) return;

      const { ctx, chartArea } = chart;

      const newData = {
        ...baseData,
        datasets: [
          {
            ...baseData.datasets[0],
            backgroundColor: createGradient(ctx, chartArea, "rgba(75,192,192,0.7)", "rgba(153,102,255,0.7)"),
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
      <div className="text-xl font-bold mb-4">Bar Charts</div>

      {/* Bar ปกติ */}
      <div className="mb-8">
        <h2 className="font-semibold mb-2">Bar Chart - Normal</h2>
        <Chart type="bar" data={baseData} />
      </div>

      {/* Bar Gradient */}
      <div>
        <h2 className="font-semibold mb-2">Bar Chart - Gradient</h2>
        <Chart ref={chartRef} type="bar" data={gradientData} />
      </div>
    </DefaultLayout>
  );
}
