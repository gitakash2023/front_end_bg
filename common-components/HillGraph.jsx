// components/HillGraph.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const HillGraph = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const chartData = {
      labels: data.labels,
      datasets: [{
        data: data.values,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)', 
        borderColor: 'rgba(75, 192, 192, 1)', 
        tension: 0.3, 
      }]
    };

    const options = {
      scales: {
        x: { type: 'linear' }, 
        y: { beginAtZero: true } 
      }
    };

    const hillChart = new Chart(chartRef.current, { type: 'line', data: chartData, options: options });

    return () => {
      hillChart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default HillGraph;
