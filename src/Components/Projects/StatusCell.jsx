import React from 'react';
import './StatusCell.css';

const StatusCell = ({ status }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'status-done';
      case 'Almost Done':
        return 'status-almost';
      case 'Active':
        return 'status-active';
      case 'Getting Started':
        return 'status-starting';
      default:
        return '';
    }
  };

  return (
    <span className={`status-cell ${getStatusClass(status)}`} style={{width: `${status.length * 9}px`}}>
      {status}
    </span>
  );
};

export default StatusCell;
