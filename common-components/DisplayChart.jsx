import React from 'react';
import CustomPieChart from './CustomPieChart';

const DisplayChart = () => {
  const verificationResults = [
    { label: 'Passed Verifications', value: 80, color: 'rgba(75, 192, 192, 0.5)' }, 
    { label: 'Failed Verifications', value: 20, color: 'rgba(255, 99, 132, 0.5)' }, 
  ];

  const fraudDetectionResults = [
    { label: 'No Fraud Detected', value: 90, color: 'rgba(54, 162, 235, 0.5)' }, 
    { label: 'Fraud Detected', value: 10, color: 'rgba(255, 159, 64, 0.5)' }, 
  ];

  const backgroundCheckResults = [
    { label: 'Clear', value: 70, color: 'rgba(46, 204, 113, 0.5)' }, // Green
    { label: 'Pending', value: 20, color: 'rgba(241, 196, 15, 0.5)' }, // Yellow
    { label: 'Issue Found', value: 10, color: 'rgba(231, 76, 60, 0.5)' }, // Red
  ];

  const inProgressResults = [
    { label: 'In Progress', value: 60, color: 'rgba(255, 206, 86, 0.5)' }, // Yellow
    { label: 'Completed', value: 40, color: 'rgba(75, 192, 192, 0.5)' }, // Green
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <div style={{ width: '200px', margin: '20px' }}>
          <CustomPieChart data={verificationResults} />
        </div>
        <div style={{ width: '200px', margin: '20px' }}>
          <CustomPieChart data={fraudDetectionResults} />
        </div>
        <div style={{ width: '200px', margin: '20px' }}>
          <CustomPieChart data={backgroundCheckResults} />
        </div>
        <div style={{ width: '200px', margin: '20px' }}>
          <CustomPieChart data={inProgressResults} />
        </div>
      </div>
    </div>
  );
};

export default DisplayChart;
