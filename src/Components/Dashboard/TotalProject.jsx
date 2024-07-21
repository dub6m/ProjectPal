import React, { useContext } from 'react'
import './TotalProject.css'
import { UserContext } from '../../UserContext';

function TotalProject() {
  const { user } = useContext(UserContext);

  return (
    <div className='totalProjContainer'>
        <div className="header">
            <h2 className='i'><i class='bx bx-grid-alt'></i></h2>
            <h2 className='t'>Total Projects</h2>
        </div>
        <div className="mid">
            <h4>{user.getTotalProjs()}</h4>
        </div>
        <h1>{user.getTotalProjs()}</h1>
    </div>
  )
}

export default TotalProject;
