'use client';

import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  Title,
  ArcElement,
} from 'chart.js';
import { useData } from '../DataContext';

ChartJS.register(Tooltip, Legend, Title, ArcElement);

export default function EvTypeProportions() {
  const data = useData();
  const [chartData, setChartData] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted || !data || data.length === 0) return;

    const evTypeCounts = {};
    data.forEach((vehicle) => {
      const evType = vehicle['Electric Vehicle Type'];
      if (evType) {
        evTypeCounts[evType] = (evTypeCounts[evType] || 0) + 1;
      }
    });

    const chartData = {
      labels: Object.keys(evTypeCounts),
      datasets: [
        {
          data: Object.values(evTypeCounts),
          backgroundColor: ['#FF6347', '#4CAF50', '#FFD700', '#1E90FF', '#8A2BE2'],
          borderColor: 'white',
          borderWidth: 2,
        },
      ],
    };

    setChartData(chartData);
  }, [data, hasMounted]);

  if (!hasMounted || !chartData) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-300 font-medium">
        Loading chart...
      </p>
    );
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'EV Type Proportions',
        font: { size: 18 },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold text-red-800 dark:text-gray-100 mb-4 text-center">
        Donut Chart: EV Type Proportions
      </h1>
      <div className="relative w-64 h-64 mx-auto">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}
