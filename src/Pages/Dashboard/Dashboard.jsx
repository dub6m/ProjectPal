import React, { useContext, useState } from 'react'
import './Dashboard.css'
import Navbar from '../../Components/Navbar/Navbar'
import TotalProject from '../../Components/Dashboard/TotalProject'
import SubNav from '../../Components/Dashboard/SubNav'
import CompletedProjects from '../../Components/Dashboard/CompletedProjects'
import DueCount from '../../Components/Dashboard/DueCount'
import ProjChart from '../../Components/Dashboard/ProjChart'
import UpcomingDeadlines from '../../Components/Dashboard/UpcomingDeadlines'
import { UserContext } from '../../UserContext'
import AddProject from '../../Components/AddProject/AddProject'

function Dashboard() {
  const { user } = useContext(UserContext);
  
  console.log(user)
  const [addProjectVisibility, setAddProjectVisibility] = useState(false);
  const toggleOverlay = () => {
    setAddProjectVisibility(!addProjectVisibility);
  }
  return (
    <div className='dash-overall'>
        <Navbar/>
        <div className='dashContainer'>
            <SubNav toggleOverlay={toggleOverlay}/>
            {addProjectVisibility && <AddProject toggleOverlay={toggleOverlay}/>}
            <div className="tophalf">
                <TotalProject/>
                <CompletedProjects/>
                <DueCount/>
            </div>
            <div className="bottomhalf">
                <ProjChart/>
                <UpcomingDeadlines/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard