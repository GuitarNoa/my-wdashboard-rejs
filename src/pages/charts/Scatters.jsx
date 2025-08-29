import React, { useRef, useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

// Register modules
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const colors = ["red", "blue", "green", "orange", "purple", "teal"];

// Gradient helper
function createGradient(ctx, area, color1, color2) {
  const gradient = ctx.createLinearGradient(area.left, area.bottom, area.right, area.top);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
}

// Generate random scatter data
function generateScatterData() {
  return Array.from({ length: 20 }).map(() => ({
    x: faker.number.int({ min: 1, max: 100 }),
    y: faker.number.int({ min: 1, max: 100 }),
  }));
}

export default function ScatterCharts() {
  const chartRef = useRef(null);
  const [gradientData, setGradientData] = useState({ datasets: [] });

  // Normal Data
  const normalData = {
    datasets: [
      {
        label: "Scatter Dataset 1",
        data: generateScatterData(),
        backgroundColor: colors[0] + "99",
      },
      {
        label: "Scatter Dataset 2",
        data: generateScatterData(),
        backgroundColor: colors[1] + "99",
      },
    ],
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const { ctx, chartArea } = chart;
    if (!chartArea) return;

    const newData = {
      datasets: [
        {
          label: "Scatter Gradient 1",
          data: generateScatterData(),
          backgroundColor: createGradient(ctx, chartArea, "red", "orange"),
        },
        {
          label: "Scatter Gradient 2",
          data: generateScatterData(),
          backgroundColor: createGradient(ctx, chartArea, "blue", "cyan"),
        },
      ],
    };

    setGradientData(newData);

    const handleResize = () => {
      if (!chart.chartArea) return;
      setGradientData({
        datasets: [
          {
            label: "Scatter Gradient 1",
            data: generateScatterData(),
            backgroundColor: createGradient(ctx, chart.chartArea, "red", "orange"),
          },
          {
            label: "Scatter Gradient 2",
            data: generateScatterData(),
            backgroundColor: createGradient(ctx, chart.chartArea, "blue", "cyan"),
          },
        ],
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DefaultLayout>
      <div className="text-xl font-bold mb-4">Scatter Charts</div>

      {/* Scatter Normal */}
      <div className="mb-8">
        <h2 className="font-semibold mb-2">Scatter - Normal</h2>
        <Chart type="scatter" data={normalData} />
      </div>

      {/* Scatter Gradient */}
      <div>
        <h2 className="font-semibold mb-2">Scatter - Gradient</h2>
        <Chart ref={chartRef} type="scatter" data={gradientData} />
      </div>
    </DefaultLayout>
  );
}
