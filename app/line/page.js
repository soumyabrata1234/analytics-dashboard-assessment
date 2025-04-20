'use client';

import { useMemo, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { useData } from '../DataContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart() {
  const data = useData();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // This runs only on the client
  useEffect(() => {
    if (typeof document !== 'undefined') {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    }
  }, []);

  const yearCount = useMemo(() => {
    const count = {};
    data?.forEach((row) => {
      const year = row['Model Year'];
      if (year) {
        count[year] = (count[year] || 0) + 1;
      }
    });
    return count;
  }, [data]);

  const sortedYears = useMemo(
    () => Object.keys(yearCount).sort((a, b) => a - b),
    [yearCount]
  );

  const counts = useMemo(
    () => sortedYears.map((year) => yearCount[year]),
    [sortedYears, yearCount]
  );

  const chartData = useMemo(
    () => ({
      labels: sortedYears,
      datasets: [
        {
          label: 'EVs Registered',
          data: counts,
          fill: true,
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#10B981',
        },
      ],
    }),
    [sortedYears, counts]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: isDarkMode ? '#E5E7EB' : 'black',
            font: {
              size: 12,
            },
          },
        },
        title: {
          display: true,
          text: 'EV Registration Trend by Model Year',
          font: {
            size: 18,
          },
          color: isDarkMode ? '#E5E7EB' : 'black',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Vehicles',
            color: isDarkMode ? '#E5E7EB' : 'black',
          },
          ticks: {
            color: isDarkMode ? '#E5E7EB' : 'black',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Model Year',
            color: isDarkMode ? '#E5E7EB' : 'black',
          },
          ticks: {
            color: isDarkMode ? '#E5E7EB' : 'black',
          },
        },
      },
    }),
    [isDarkMode]
  );

  
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-red-800 dark:text-red-400 font-semibold">
        Loading data...
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg">
      <h1 className="text-3xl text-green-700 dark:text-green-300 font-extrabold mb-6 text-center">
        Line Chart
      </h1>
      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
