import React, { useContext, useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import './ProjChart.css';
import { UserContext } from '../../UserContext';

const ProjChart = () => {
  const { user } = useContext(UserContext);
  const [projData, setProjData] = useState([]);

  function prepData() {
    const data = [];
    for (let i = 0; i < 5; i++) {
      if (i < user.projects.length) {
        data.push({
          id: user.projects[i].title.length > 15 ? `${user.projects[i].title.substring(0, 12)}...` : user.projects[i].title,
          value: user.projects[i].toDo.progress,
        });
      }
    }
    setProjData(data);
  }

  useEffect(() => {
    prepData();
  }, [user.projects, user.projProgress]);

  const options = {
    margin: { top: 5, right: 50, bottom: 40, left: 50 },
    padding: 0.3,
    valueScale: { type: 'linear' },
    indexScale: { type: 'band', round: true },
    colors: '#2563EB',
    borderColor: { from: 'color', modifiers: [['darker', 1.6]] },
    axisTop: null,
    axisRight: null,
    axisBottom: {
      tickSize: 0,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Projects',
      legendPosition: 'middle',
      legendOffset: 25,
    },
    axisLeft: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Percentage',
      legendPosition: 'middle',
      legendOffset: -45,
      format: (value) => `${value}%`,
      tickValues: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      max: 100  
    },
    labelSkipWidth: 12,
    labelSkipHeight: 12,
    labelTextColor: { from: 'color', modifiers: [['darker', 1.6]] },
    legends: [],
    animate: true,
    motionStiffness: 90,
    motionDamping: 15,
  };

  return (
    <div className='dash-chart'>
      <h2><i className='bx bx-customize'></i> Project Progress</h2>
      <div className="chart-container"> {/* Add a class for styling */}
        <ResponsiveBar
          data={projData}
          keys={['value']}
          indexBy="id"
          margin={options.margin}
          padding={options.padding}
          valueScale={{ type: 'linear', min: 0, max: 100 }}
          indexScale={options.indexScale}
          colors={options.colors}
          borderColor={options.borderColor}
          axisTop={options.axisTop}
          axisRight={options.axisRight}
          axisBottom={options.axisBottom}
          axisLeft={{
            ...options.axisLeft,
            tickValues: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            max: 100
          }}
          labelSkipWidth={options.labelSkipWidth}
          labelSkipHeight={options.labelSkipHeight}
          labelTextColor={options.labelTextColor}
          legends={options.legends}
          animate={options.animate}
          motionStiffness={options.motionStiffness}
          motionDamping={options.motionDamping}
        />
      </div>
    </div>
  );
};

export default ProjChart;
