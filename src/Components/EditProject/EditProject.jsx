import React, { useState, useContext, useEffect } from 'react'
import './EditProject.css'
import { UserContext } from '../../UserContext'

function EditProject({ toggleOverlay, projForEdit }) {
    const { user } = useContext(UserContext);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectDueDate, setProjectDueDate] = useState('');
    const [buttonState, disableButton] = useState(false);
    const [buttonDisplay, loadButton] = useState('Create Project');

    useEffect(() => {
        if (projForEdit) {
            setProjectName(projForEdit.title);
            setProjectDescription(projForEdit.description);
            setProjectDueDate(projForEdit.dueDate);
        }
    }, [projForEdit]);

    async function createProj(owner, title, description, dueDate) {
        disableButton(true);
        loadButton('Please Wait...');
        const newProj = await user.editProject(owner, title, description, dueDate, projForEdit);
        console.log(user.projects);
        toggleOverlay();
    }

    return (
        <div className='hover'>
            <div className='addProject'>
                <div className="ap-header">
                    <h2>Edit Project</h2>
                    <p>Fill out the details to update the project.</p>
                </div>
                <div className="ap-body">
                    <p>Project Name</p>
                    <input
                        type="text"
                        placeholder="Enter project name"
                        className="ap-input"
                        value={projectName}
                        disabled={buttonState}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                    <p>Description</p>
                    <textarea
                        placeholder="Enter project description"
                        className="ap-input-ta"
                        value={projectDescription}
                        disabled={buttonState}
                        onChange={(e) => setProjectDescription(e.target.value)}
                    ></textarea>
                    <p>Due Date</p>
                    <input
                        type="date"
                        className="ap-input"
                        value={projectDueDate}
                        disabled={buttonState}
                        onChange={(e) => setProjectDueDate(e.target.value)}
                    />
                </div>
                <div className="ap-footer">
                    <button onClick={toggleOverlay} className="close-btn" disabled={buttonState}>Cancel</button>
                    <button className="ap-btn" disabled={buttonState} onClick={() => createProj(user, projectName, projectDescription, projectDueDate)}>{buttonDisplay}</button>
                </div>
            </div>
        </div>
    )
}
export default EditProject;
