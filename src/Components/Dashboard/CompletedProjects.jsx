import React, { useContext } from 'react'
import './CompletedProjects.css'
import { UserContext } from '../../UserContext'

function CompletedProjects() {
  const { user } = useContext(UserContext);
  return (
    <div className='totalCompletedProj'>
        <div className="header-cp">
            <h2 className='icp'><i class='bx bx-check-circle'></i></h2>
            <h2 className='tcp'>Completed Projects</h2>
        </div>
        <div className="mid-cp">
            <h4>{user.numCompletedProj()}</h4>
        </div>
        <h1>{user.numCompletedProj()}</h1>
    </div>
  )
}

export default CompletedProjects