'use client';

import { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { useData } from '../DataContext';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const data = useData();

  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: 'Vehicle Types',
            data: [],
            backgroundColor: [
              '#36A2EB',
              '#FF6384',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
            ],
            borderWidth: 1,
          },
        ],
      };
    }

    const typeCount = {};
    data.forEach((row) => {
      const type = row['Electric Vehicle Type'] || 'Unknown';
      typeCount[type] = (typeCount[type] || 0) + 1;
    });

    return {
      labels: Object.keys(typeCount),
      datasets: [
        {
          label: 'Vehicle Types',
          data: Object.values(typeCount),
          backgroundColor: [
            '#36A2EB',
            '#FF6384',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [data]);

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl text-yellow-700 dark:text-yellow-300 font-extrabold mb-6 text-center">
        Vehicle Type Distribution
      </h2>
      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
        {chartData.labels.length === 0 ? (
          <p className="text-center text-red-800 dark:text-red-400 font-semibold">
            Loading data...
          </p>
        ) : (
          <Pie data={chartData} />
        )}
      </div>
    </div>
  );
}
