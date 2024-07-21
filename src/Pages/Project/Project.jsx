import React, { useContext, useState, useEffect } from 'react';
import './Project.css';
import Navbar from '../../Components/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../UserContext';

function Project() {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [toDoArray, setToDoArray] = useState([]);
    const [checkedState, setCheckedState] = useState([]);

    // Fetch the project and initialize toDoArray on component mount
    useEffect(() => {
        const fetchProject = async () => {
            let foundProject = null;
            for (let i = 0; i < user.projects.length; i++) {
                if (user.projects[i].id === id) {
                    foundProject = user.projects[i];
                    break;
                }
            }
            if (foundProject) {
                const convertedArray = convertLinkedListToArray(foundProject.toDo);
                setToDoArray(convertedArray);
            }
        };

        fetchProject();
    }, [id, user.projects]); // Update whenever id or user.projects change

    const convertLinkedListToArray = (toDo) => {
        const array = [];
        let current = toDo.head;
        while (current !== null) {
            array.push(current);
            current = current.next;
        }
        return array;
    };

    // Initialize checkedState based on toDoArray
    useEffect(() => {
        setCheckedState(toDoArray.map(node => node.isCompleted || false));
    }, [toDoArray]);

    const handleCheckBox = (index, e) => {
        const newCheckedState = [...checkedState];
        newCheckedState[index] = e.target.checked;
        setCheckedState(newCheckedState);

        const taskNode = toDoArray[index];
        taskNode.isCompleted = e.target.checked;

        proj.toDo.updateProgress();
    };

    let proj = null;
    for (let i = 0; i < user.projects.length; i++) {
        if (user.projects[i].id === id) {
            proj = user.projects[i];
            break;
        }
    }

    if (!proj) {
        return <div>Project not found!</div>; // Handle case where project with id is not found
    }

    return (
        <div>
            <Navbar/>
            <div className="pro-content">
                <div className="pro-left">
                    <h1>{proj.title}</h1>
                    <div className="pro-description">
                        <h3>Description</h3>
                        <p>{proj.description}</p>
                    </div>
                    <div className="bottom-left-pro-block">
                        <div className="resources">
                            <h3><i className='bx bx-check'></i> Resources</h3>
                            <ul>
                                {proj.resources.map((resource, index) => (
                                    <li key={index}>{resource}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="suggestion">
                            <h3><i className='bx bx-bulb'></i> Suggestions</h3>
                            <ul>
                                {proj.suggestions.map((suggestion, index) => (
                                    <li key={index}>{suggestion}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="pro-right">
                    <h3><i class='bx bx-task'></i> To-Do List</h3>
                    <ul>
                        {toDoArray.map((taskNode, index) => (
                            <li key={index}>
                                <input 
                                    type="checkbox" 
                                    checked={checkedState[index]}
                                    onChange={(e) => handleCheckBox(index, e)}
                                />
                                {taskNode.task}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Project;
