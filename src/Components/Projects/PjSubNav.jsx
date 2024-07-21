import React from 'react';
import './PjSubNav.css';

function PjSubNav({ toggleOverlay }) {
  return (
    <div className='pj-subnav'>
      <h2>Projects</h2>
      {/* <div className="pj-search">
        <input type="text" placeholder="Search" />
        <button>
          <i className='bx bx-search-alt-2' style={{ color: '#ffffff' }}></i>
        </button>
      </div> */}
      <button className="new-project-button" onClick={toggleOverlay}>
        <i className='bx bx-plus'></i> New Project
      </button>
    </div>
  );
}

export default PjSubNav;
