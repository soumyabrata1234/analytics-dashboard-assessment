'use client';

import { Bar } from 'react-chartjs-2';
import { useMemo, useState, useEffect } from 'react';
import { useData } from '../DataContext';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart() {
  const csvData = useData();
  const [isDarkMode, setIsDarkMode] = useState(false);

 
  useEffect(() => {
    if (typeof document !== 'undefined') {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    }
  }, []);

  const chartData = useMemo(() => {
    if (!csvData || csvData.length === 0) return null;

    const makeCount = {};
    csvData.forEach((row) => {
      const make = row['Make'] || 'Unknown';
      makeCount[make] = (makeCount[make] || 0) + 1;
    });

    const topMakes = Object.entries(makeCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const labels = topMakes.map(([make]) => make);
    const counts = topMakes.map(([, count]) => count);

    return {
      labels,
      datasets: [
        {
          label: 'Number of Vehicles',
          data: counts,
          backgroundColor: '#3B82F6',
          borderColor: '#2563EB',
          borderWidth: 1,
        },
      ],
    };
  }, [csvData]);

  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? '#E5E7EB' : '#1F2937',
        },
      },
      title: {
        display: true,
        text: 'Top 10 Vehicle Makes',
        font: {
          size: 18,
        },
        color: isDarkMode ? '#E5E7EB' : '#1F2937',
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? '#E5E7EB' : '#1F2937',
        },
        title: {
          display: true,
          text: 'Vehicle Makes',
          color: isDarkMode ? '#E5E7EB' : '#1F2937',
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? '#E5E7EB' : '#1F2937',
        },
        title: {
          display: true,
          text: 'Number of Vehicles',
          color: isDarkMode ? '#E5E7EB' : '#1F2937',
        },
      },
    },
  }), [isDarkMode]);

  if (!chartData) {
    return (
      <p className="text-center text-red-800 dark:text-red-400 font-semibold">
        Loading chart data...
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg">
      <h1 className="text-3xl text-blue-700 dark:text-blue-300 font-extrabold mb-6 text-center">
        Bar Chart
      </h1>
      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
