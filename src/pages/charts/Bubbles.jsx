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

// Generate random bubble data
function generateBubbleData() {
  return Array.from({ length: 7 }).map(() => ({
    x: faker.number.int({ min: 10, max: 100 }),
    y: faker.number.int({ min: 10, max: 100 }),
    r: faker.number.int({ min: 5, max: 15 }),
  }));
}

export default function BubbleCharts() {
  const chartRef = useRef(null);
  const [gradientData, setGradientData] = useState({ datasets: [] });

  // Normal Data
  const normalData = {
    datasets: [
      {
        label: "Bubble Dataset 1",
        data: generateBubbleData(),
        backgroundColor: colors[0] + "99",
      },
      {
        label: "Bubble Dataset 2",
        data: generateBubbleData(),
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
          label: "Bubble Gradient 1",
          data: generateBubbleData(),
          backgroundColor: createGradient(ctx, chartArea, "red", "orange"),
        },
        {
          label: "Bubble Gradient 2",
          data: generateBubbleData(),
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
            label: "Bubble Gradient 1",
            data: generateBubbleData(),
            backgroundColor: createGradient(
              ctx,
              chart.chartArea,
              "red",
              "orange"
            ),
          },
          {
            label: "Bubble Gradient 2",
            data: generateBubbleData(),
            backgroundColor: createGradient(
              ctx,
              chart.chartArea,
              "blue",
              "cyan"
            ),
          },
        ],
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DefaultLayout>
      <div className="text-xl font-bold mb-4">Bubble Charts</div>

      {/* Bubble Normal */}
      <div className="mb-8">
        <h2 className="font-semibold mb-2">Bubble - Normal</h2>
        <Chart type="bubble" data={normalData} />
      </div>

      {/* Bubble Gradient */}
      <div>
        <h2 className="font-semibold mb-2">Bubble - Gradient</h2>
        <Chart ref={chartRef} type="bubble" data={gradientData} />
      </div>
    </DefaultLayout>
  );
}
