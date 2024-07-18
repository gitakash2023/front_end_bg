import React from 'react';
import DashboardBox from "../../common-components/DashboardBox"
import { FaUser, FaCheckCircle, FaSpinner, FaHourglass, FaExclamationCircle } from 'react-icons/fa';

const dashboardData = [
  { icon: <FaUser style={{ color: 'blue' }} />, text: 'Candidates Added', count: 25 },
  { icon: <FaCheckCircle style={{ color: 'green' }} />, text: 'Verification Cleared', count: 15 },
  { icon: <FaSpinner style={{ color: 'orange' }} />, text: 'In Progress', count: 50 },
  { icon: <FaHourglass style={{ color: 'yellow' }} />, text: 'Pending', count: 30 },
  { icon: <FaExclamationCircle style={{ color: 'red' }} />, text: 'Issue Found', count: 30 },
  // Add more objects as needed
];

const DashboardtopItems = () => {
  return (
    <div className="d-flex flex-wrap">
      {dashboardData.map((item, index) => (
        <div key={index} style={{ marginRight: '10px', marginBottom: '10px' }}>
          <DashboardBox icon={item.icon} text={item.text} count={item.count} />
        </div>
      ))}
    </div>
  );
};

export default DashboardtopItems;
