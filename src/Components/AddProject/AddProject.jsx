import React,  { useState, useContext } from 'react'
import './AddProject.css'
import { UserContext } from '../../UserContext'

function AddProject({ toggleOverlay }) {
    const { user } = useContext(UserContext);

    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectDueDate, setprojectDueDate] = useState('');
    const [buttonState, disableButton] = useState(false);
    const [buttonDisplay, loadButton] = useState('Create Project');

    async function createProj(owner, title, description, dueDate) {
        loadButton('Please Wait...');
        disableButton(true);
        await user.createNewProject(owner, title, description, dueDate);
        console.log(user.projects);
        toggleOverlay();
    }
  return (
    <div className='hover'>
        <div className='addProject'>
            <div className="ap-header">
                <h2>Add Project</h2>
                <p>Fill out the details to create a new project.</p>
            </div>
            <div className="ap-body">
                <p>Project Name</p>
                <input type="text" placeholder="Enter project name" disabled={buttonState} className="ap-input" onChange={(e) => setProjectName(e.target.value)}/>
                <p>Description</p>
                <textarea placeholder="Enter project description" disabled={buttonState} className="ap-input-ta" onChange={(e) => setProjectDescription(e.target.value)}></textarea>
                <p>Due Date</p>
                <input type="date" className="ap-input" disabled={buttonState} onChange={(e) => setprojectDueDate(e.target.value)}/>
            </div>
            <div className="ap-footer">
                <button onClick={toggleOverlay} className="close-btn" disabled={buttonState}>Cancel</button>
                <button className="ap-btn" disabled={buttonState} onClick={() => createProj(user, projectName, projectDescription, projectDueDate)}>{buttonDisplay}</button>
            </div>
        </div>
    </div>
  )
}
export default AddProject;