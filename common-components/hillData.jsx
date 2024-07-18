// pages/index.js
import React from 'react';
import HillGraph from '../common-components/HillGraph';

const HillData = () => {
  const hillData = {
    labels: [0, 1, 2, 3, 4, 5],
    values: [0, 10, 20, 30, 20, 10], // Example hill shape data
  };

  return (
    <div>
     
      <HillGraph data={hillData} />
    </div>
  );
};

export default HillData;
