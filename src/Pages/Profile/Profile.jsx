import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Navbar from '../../Components/Navbar/Navbar';
import './Profile.css';

function Profile() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
  return (
    <div className='profile-overall'>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-image-container">
            <i className='bx bxs-user'></i>
          </div>
          <div className="profile-details">
            <h2>{user.userName}</h2>
            <p>@{user.userName}</p>
            <p>{user.email}</p>
            <div className="profile-links">
              <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer">
                <i className='bx bxl-github'></i>

              </a>
            </div>
          </div>
          <div className="profile-projects">
            <div className='profile-to-projects' onClick={()=> navigate(`/projects`)}>
              <i className='bx bxs-folder'></i>
              <span>12 Projects</span>
            </div>
            <div>
              <i className='bx bxs-calendar'></i>
              <span>{user.joined}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
