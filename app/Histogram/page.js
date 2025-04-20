'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import { useMemo } from 'react';
import { useData } from '../DataContext'; // Import the useData hook

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MsrpHistogram() {
  const data = useData(); // Access the parsed data from context

  const buckets = {
    '0-25k': 0,
    '25k-50k': 0,
    '50k-75k': 0,
    '75k-100k': 0,
    '100k+': 0,
  };

  if (Array.isArray(data)) {
    data.forEach((vehicle) => {
      const price = parseFloat(vehicle['Base MSRP']);
      if (isNaN(price)) return;

      if (price <= 25000) buckets['0-25k']++;
      else if (price <= 50000) buckets['25k-50k']++;
      else if (price <= 75000) buckets['50k-75k']++;
      else if (price <= 100000) buckets['75k-100k']++;
      else buckets['100k+']++;
    });
  }

  const chartData = useMemo(
    () => ({
      labels: Object.keys(buckets),
      datasets: [
        {
          label: 'Number of Vehicles',
          data: Object.values(buckets),
          backgroundColor: '#6366F1',
          borderRadius: 6,
        },
      ],
    }),
    [data]
  );

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'EV Distribution by MSRP',
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'MSRP Ranges ($)' },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Number of Vehicles' },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Histogram</h1>
      {(!data || data.length === 0) ? (
        <p className="text-red-800 dark:text-red-300">No data provided</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
}
