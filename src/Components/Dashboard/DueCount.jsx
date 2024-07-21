import React, { useContext } from 'react'
import './DueCount.css'
import { UserContext } from '../../UserContext'

function DueCount() {
  const { user } = useContext(UserContext);
  return (
    <div className='totalDueProj'>
        <div className="header-dc">
            <h2 className='idc'><i class='bx bx-timer'></i></h2>
            <h2 className='tdc'>Due Projects</h2>
        </div>
        <div className="mid-dc">
            <h4>{user.numDueProj()}</h4>
        </div>
        <h1>{user.numDueProj()}</h1>
    </div>
  )
}

export default DueCount