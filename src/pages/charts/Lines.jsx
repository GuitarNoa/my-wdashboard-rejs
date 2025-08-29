import React, { useRef, useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const colors = [
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "teal",
  "blue",
  "purple",
];

// กราฟธรรมดา
const simpleData = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

// กราฟ gradient
const baseData = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
    },
  ],
};

function createGradient(ctx, area) {
  const colorStart = faker.helpers.arrayElement(colors);
  const colorMid = faker.helpers.arrayElement(
    colors.filter((c) => c !== colorStart)
  );
  const colorEnd = faker.helpers.arrayElement(
    colors.filter((c) => c !== colorStart && c !== colorMid)
  );

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}

export default function LineCharts() {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const updateGradient = () => {
      if (!chart.chartArea) return;

      const newData = {
        ...baseData,
        datasets: baseData.datasets.map((ds) => ({
          ...ds,
          borderColor: createGradient(chart.ctx, chart.chartArea),
          backgroundColor: "transparent",
        })),
      };

      setChartData(newData);
    };

    updateGradient();

    window.addEventListener("resize", updateGradient);
    return () => window.removeEventListener("resize", updateGradient);
  }, []);

  return (
    <DefaultLayout>
      <div className="text-xl font-bold mb-4">Line Charts</div>

      {/* กราฟปกติ */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Normal Line Chart</h2>
        <Chart type="line" options={options} data={simpleData} />
      </div>

      {/* กราฟ Gradient */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Gradient Line Chart</h2>
        <Chart ref={chartRef} type="line" options={options} data={chartData} />
      </div>
    </DefaultLayout>
  );
}
