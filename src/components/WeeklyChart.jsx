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
    labels.push(date.format('ddd')); // e.g., 'Mon', 'Tue'

    const dayData = data[dateStr] || {};
    const practicesCompleted = dayData.practices ? dayData.practices.length : 0;
    const nutritionPoints = dayData.nutritionPoints !== undefined ? dayData.nutritionPoints : 0; // Set to 0 instead of null

    practiceDataPoints.push(practicesCompleted);
    nutritionDataPoints.push(nutritionPoints);
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Practices Completed',
        data: practiceDataPoints,
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Teal
        borderWidth: 1,
        stack: 'Stack 0', // Assign to stack
      },
      {
        label: 'Nutrition Points',
        data: nutritionDataPoints,
        backgroundColor: 'rgba(255, 159, 64, 0.6)', // Orange
        borderWidth: 1,
        stack: 'Stack 0', // Assign to stack
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true, // Maintain aspect ratio for better responsiveness
    aspectRatio: 1.5, // Adjusted aspect ratio for better fit on mobile
    layout: {
      padding: {
        top: 5, // Further reduced padding
        right: 5,
        bottom: 5,
        left: 5,
      },
    },
    scales: {
      x: {
        stacked: true, // Enable stacking on the x-axis
        title: {
          display: true,
          text: 'Day of the Week',
        },
      },
      y: {
        stacked: true, // Enable stacking on the y-axis
        beginAtZero: true,
        max: 10, // Total points per day (5 practices + 5 nutrition)
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: 'Points',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
      tooltip: {
        mode: 'index', // Show tooltip for all datasets at a given x-value
        intersect: false, // Do not require the cursor to intersect a bar
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
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
