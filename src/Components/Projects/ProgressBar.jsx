import React from 'react'
import './ProgressBar.css';

function ProgressBar({progress}) {
  return (
    <div className='pb-container'>
        {progress}%
        <div className="progress-bar">
            <div className="progress-bar-filler" style={{ width: `${progress}%` }}>
            </div>
        </div>
    </div>
  )
}

export default ProgressBar