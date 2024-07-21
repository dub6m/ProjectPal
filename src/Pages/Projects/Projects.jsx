import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../UserContext';
import PjTable from '../../Components/Projects/PjTable';
import AddProject from '../../Components/AddProject/AddProject';
import Navbar from '../../Components/Navbar/Navbar';
import PjSubNav from '../../Components/Projects/PjSubNav';
import EditProject from '../../Components/EditProject/EditProject';
import DeleteProject from '../../Components/DeleteProject/DeleteProject';
import './Projects.css';

function Projects() {
  const { user } = useContext(UserContext);
  const [addProjectVisibility, setAddProjectVisibility] = useState(false);
  const toggleOverlay = () => {
    setAddProjectVisibility(!addProjectVisibility);
  }

  const [editProjectVisibility, setEditProjectVisibility] = useState(false);
  const [projForEdit, setProjForEdit] = useState(null);
  const toggleEditOverlay = (project) => {
    setProjForEdit(project);
    setEditProjectVisibility(!editProjectVisibility);
  }

  const [deleteProjectVisibility, setDeleteProjectVisibility] = useState(false);
  const toggleDeleteOverlay = (project) => {
    setProjForEdit(project);
    setDeleteProjectVisibility(!deleteProjectVisibility);
  }

  return (
    <div>
        <Navbar/>
        <div className="projects-container">
            <PjSubNav toggleOverlay={toggleOverlay}/>
            {addProjectVisibility && <AddProject toggleOverlay={toggleOverlay}/>}
        
          <div className="project-table">
            {user.projects.length === 0 ? (
              <div className='noPro-display'>
                <i class='bx bx-file-blank' style={{color:'#9CA3AF'}} ></i>
                <h2>No Projects Found</h2>
                <p>You haven't created any projects yet.</p>
                <button onClick={toggleOverlay}><i class='bx bx-plus'></i> Create New Project</button>
              </div>) 
            : (
              <>
              <PjTable editToggle={toggleEditOverlay} deleteToggle={toggleDeleteOverlay}/>
              {editProjectVisibility && <EditProject toggleOverlay={toggleEditOverlay} projForEdit={projForEdit}/>}
              {deleteProjectVisibility && <DeleteProject toggleOverlay={toggleDeleteOverlay} projForDel={projForEdit}/>}
              </>
            )}
          </div>
        </div>
    </div>
  )
}

export default Projects
