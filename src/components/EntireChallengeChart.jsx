// src/components/EntireChallengeChart.jsx

import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import moment from 'moment';
import { practices } from '../data/practices';
import { getChallengeStartDate, getChallengeEndDate } from '../utils/dateUtils';

function EntireChallengeChart({ data }) {
  const startDate = getChallengeStartDate();
  const endDate = getChallengeEndDate();
  const labels = [];
  const practiceDataPoints = [];
  const nutritionDataPoints = [];

  let currentDate = startDate.clone();
  while (currentDate.isSameOrBefore(endDate)) {
    const dateStr = currentDate.format('YYYY-MM-DD');
    labels.push(currentDate.format('MM/DD'));
    const dayData = data[dateStr] || {};
    const practicesCompleted = dayData.practices ? dayData.practices.length : 0;
    const nutritionPoints = dayData.nutritionPoints !== undefined ? dayData.nutritionPoints : 0;

    practiceDataPoints.push(practicesCompleted);
    nutritionDataPoints.push(nutritionPoints);

    currentDate.add(1, 'day');
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Practices Completed',
        data: practiceDataPoints,
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.1,
      },
      {
        label: 'Nutrition Points',
        data: nutritionDataPoints,
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: practices.length, // Max practices (excluding nutrition) or adjust as needed
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
      <h2>Entire Challenge Progress</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default EntireChallengeChart;
