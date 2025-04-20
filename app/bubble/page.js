'use client';

import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend, Title } from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import { useData } from '../DataContext';
import { useMemo } from 'react';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

export default function RangeVsMsrpBubble() {
  const data = useData();

  const makeColors = {};
  const colorPalette = [
    '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6',
  ];

  let colorIndex = 0;

  const bubbles = [];

  if (Array.isArray(data)) {
    data.forEach((vehicle) => {
      const range = parseFloat(vehicle['Electric Range']);
      const price = parseFloat(vehicle['Base MSRP']);
      const make = vehicle['Make'];

      if (!range || !price || !make) return;

      if (!makeColors[make]) {
        makeColors[make] = colorPalette[colorIndex % colorPalette.length];
        colorIndex++;
      }

      bubbles.push({
        x: range,
        y: price,
        r: 6,
        make: make,
        backgroundColor: makeColors[make],
      });
    });
  }

  const grouped = {};

  
  bubbles.forEach((point) => {
    if (!grouped[point.make]) {
      grouped[point.make] = {
        label: point.make,
        data: [],
        backgroundColor: point.backgroundColor,
      };
    }
    grouped[point.make].data.push({ x: point.x, y: point.y, r: point.r });
  });

  const chartData = {
    datasets: Object.values(grouped),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'EV Range vs MSRP (Bubble Chart)',
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Electric Range (miles)' },
      },
      y: {
        title: { display: true, text: 'MSRP ($)' },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Bubble Chart – Range vs MSRP</h2>
      {data?.length ? <Bubble data={chartData} options={options} /> : <p>No data available</p>}
    </div>
  );
}
