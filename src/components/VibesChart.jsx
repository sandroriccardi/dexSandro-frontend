import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './VibesChart.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const VibesChart = ({ talks }) => {
  // Sort talks by date and prepare data for the chart
  const sortedTalks = [...talks]
    .filter(talk => talk.date && (talk.personalVibe || talk.managerVibe))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const labels = sortedTalks.map(talk => formatDate(talk.date));
  const personalVibes = sortedTalks.map(talk => talk.personalVibe || 0);
  const managerVibes = sortedTalks.map(talk => talk.managerVibe || 0);

  const data = {
    labels,
    datasets: [
      {
        label: 'Personal Vibe',
        data: personalVibes,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'Manager Vibe',
        data: managerVibes,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#f59e0b',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'bold'
          }
        },
      },
      title: {
        display: true,
        text: 'Vibes Trend Over Time',
        font: {
          size: 16,
          weight: 'bold'
        },
        color: '#374151',
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}/5 ⭐`;
          }
        }
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 12,
            weight: 'bold'
          },
          color: '#6b7280'
        },
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11
          },
          maxRotation: 45,
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Vibe Rating (1-5)',
          font: {
            size: 12,
            weight: 'bold'
          },
          color: '#6b7280'
        },
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          color: '#6b7280',
          font: {
            size: 11
          },
          callback: function(value) {
            return value + '/5';
          }
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
          lineWidth: 1,
        },
      },
    },
  };

  if (sortedTalks.length === 0) {
    return (
      <div className="vibes-chart-container">
        <div className="vibes-chart-empty">
          <h3>Vibes Trend</h3>
          <p>No vibe data available to display. Add some talks with ratings to see the trend!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vibes-chart-container">
      <div className="vibes-chart-wrapper">
        <Line data={data} options={options} />
      </div>
      <div className="chart-summary">
        <div className="chart-stats">
          <div className="stat-item personal">
            <span className="stat-label">Avg Personal Vibe:</span>
            <span className="stat-value">
              {personalVibes.length > 0 
                ? (personalVibes.reduce((a, b) => a + b, 0) / personalVibes.length).toFixed(1)
                : 'N/A'
              }/5
            </span>
          </div>
          <div className="stat-item manager">
            <span className="stat-label">Avg Manager Vibe:</span>
            <span className="stat-value">
              {managerVibes.length > 0 
                ? (managerVibes.reduce((a, b) => a + b, 0) / managerVibes.length).toFixed(1)
                : 'N/A'
              }/5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VibesChart;