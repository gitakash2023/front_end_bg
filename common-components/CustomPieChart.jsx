import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CustomPieChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartData = {
      labels: data.map(item => `${item.label} (${((item.value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(2)}%)`),
      datasets: [{
        data: data.map(item => item.value),
        backgroundColor: data.map(item => item.color),
        borderWidth: 1,
      }]
    };

    const options = {
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
        },
      },
    };

    const pieChart = new Chart(chartRef.current, {
      type: 'pie',
      data: chartData,
      options: options,
    });

    return () => {
      pieChart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} style={{ width: '150px', height: '150px' }}></canvas>;
};

export default CustomPieChart;
