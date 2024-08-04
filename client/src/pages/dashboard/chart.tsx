// src/components/Chart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useFinancialRecords } from '../../context/financial-record-context';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart: React.FC = () => {
  const { records } = useFinancialRecords();

  // Aggregate data by category for Pie chart
  const categoryMap: { [key: string]: number } = {};

  records.forEach(record => {
    if (categoryMap[record.category]) {
      categoryMap[record.category] += record.amount;
    } else {
      categoryMap[record.category] = record.amount;
    }
  });

  // Prepare data for the Pie chart
  const pieChartData = {
    labels: Object.keys(categoryMap), // Unique categories
    datasets: [
      {
        label: 'Financial Categories',
        data: Object.values(categoryMap), // Aggregated amounts
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div style={{ width: '380px', height: '380px' }}> {/* Smaller radius */}
        <h2 style={{ textAlign: 'center' }}>Financial Records Pie Chart</h2>
        <Pie data={pieChartData} options={options} />
      </div>
    </div>
  );
};

export default Chart;
