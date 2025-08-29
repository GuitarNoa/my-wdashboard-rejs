import React, { useRef, useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const colors = ["blue", "green"];

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

// Generate random data
function generateData() {
  return labels.map(() => faker.number.int({ min: 10, max: 100 }));
}

export default function AreaCharts() {
  const chartRef = useRef(null);
  const [gradientData, setGradientData] = useState({ datasets: [] });

  // Normal Data
  const normalData = {
    labels,
    datasets: [
      {
        label: "Area Dataset 1",
        data: generateData(),
        borderColor: colors[0],
        backgroundColor: "rgba(54,162,235,0.3)",
        fill: true,
      },
      {
        label: "Area Dataset 2",
        data: generateData(),
        borderColor: colors[1],
        backgroundColor: "rgba(75,192,192,0.3)",
        fill: true,
      },
    ],
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const { ctx, chartArea } = chart;
    if (!chartArea) return;

    const newData = {
      labels,
      datasets: [
        {
          label: "Area Gradient 1",
          data: generateData(),
          borderColor: colors[0],
          backgroundColor: createGradient(
            ctx,
            chartArea,
            "rgba(54,162,235,0.5)",
            "rgba(54,162,235,0.1)"
          ),
          fill: true,
        },
        {
          label: "Area Gradient 2",
          data: generateData(),
          borderColor: colors[1],
          backgroundColor: createGradient(
            ctx,
            chartArea,
            "rgba(75,192,192,0.5)",
            "rgba(75,192,192,0.1)"
          ),
          fill: true,
        },
      ],
    };

    setGradientData(newData);

    const handleResize = () => {
      if (!chart.chartArea) return;
      setGradientData({
        labels,
        datasets: [
          {
            label: "Area Gradient 1",
            data: generateData(),
            borderColor: colors[0],
            backgroundColor: createGradient(
              ctx,
              chart.chartArea,
              "rgba(54,162,235,0.5)",
              "rgba(54,162,235,0.1)"
            ),
            fill: true,
          },
          {
            label: "Area Gradient 2",
            data: generateData(),
            borderColor: colors[1],
            backgroundColor: createGradient(
              ctx,
              chart.chartArea,
              "rgba(75,192,192,0.5)",
              "rgba(75,192,192,0.1)"
            ),
            fill: true,
          },
        ],
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DefaultLayout>
      <div className="text-xl font-bold mb-4">Area Charts</div>

      {/* Area Normal */}
      <div className="mb-8">
        <h2 className="font-semibold mb-2">Area - Normal</h2>
        <Chart type="line" data={normalData} />
      </div>

      {/* Area Gradient */}
      <div>
        <h2 className="font-semibold mb-2">Area - Gradient</h2>
        <Chart ref={chartRef} type="line" data={gradientData} />
      </div>
    </DefaultLayout>
  );
}
