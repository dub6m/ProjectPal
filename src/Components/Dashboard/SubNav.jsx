import React from 'react'
import './SubNav.css'

function SubNav({ toggleOverlay }) {
  return (
    <div className='subnav-container'>
        <h2>Dashboard</h2>
        <button onClick={toggleOverlay}><i class='bx bx-plus'></i> New Project</button>
    </div>
  )
}

export default SubNav;