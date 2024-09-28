// src/components/WeeklyChart.jsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import moment from 'moment';
import { practices } from '../data/practices';

function WeeklyChart({ currentWeekStart, data }) {
  const labels = [];
  const practiceDataPoints = [];
  const nutritionDataPoints = [];

  for (let i = 0; i < 7; i++) {
    const date = currentWeekStart.clone().add(i, 'days');
    const dateStr = date.format('YYYY-MM-DD');
    labels.push(date.format('ddd'));

    const dayData = data[dateStr] || {};
    const practicesCompleted = dayData.practices ? dayData.practices.length : 0;
    const nutritionPoints = dayData.nutritionPoints !== undefined ? dayData.nutritionPoints : null;

    practiceDataPoints.push(practicesCompleted);
    nutritionDataPoints.push(nutritionPoints);
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Practices Completed',
        data: practiceDataPoints,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderWidth: 1,
      },
      {
        label: 'Nutrition Points',
        data: nutritionDataPoints,
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: practices.length, // Max practices
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="chart-container">
      <h2>Weekly Progress</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default WeeklyChart;
