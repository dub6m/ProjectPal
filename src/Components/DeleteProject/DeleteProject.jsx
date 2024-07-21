import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import './DeleteProject.css';

function DeleteProject({ toggleOverlay, projForDel }) {
    const { user } = useContext(UserContext);

    function delProj(projForDel) {
        user.deleteProject(projForDel);
        toggleOverlay();
    }

    return (
        <div className='hover'>
            <div className='deldel'>
                <i className='bx bx-trash'></i>
                <p>Deleting a project is permanent. Are you sure?</p>
                <div className='deldelbtns'>
                    <button onClick={toggleOverlay}>Cancel</button>
                    <button onClick={() => {delProj(projForDel)}}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteProject;