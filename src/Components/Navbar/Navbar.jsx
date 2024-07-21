import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import pal_logo from './pallogo.jpeg'

function Navbar() {
  return (
    <div className='navbarMain'>
        <div className="nav1of3">
            <img src={pal_logo} alt=""/>
            <h3>ProjectPal</h3>
        </div>
        <div className="nav2of3"> 
            <Link to="/dashboard">
                <i class='bx bxs-dashboard'></i>
                <span>Dashboard</span>
            </Link>
            <Link to="/projects">
                <i class='bx bx-list-ul'></i>
                <span>Projects</span>
            </Link>
            <Link to="/profile">
                <i class='bx bxs-user-circle'></i>
                <span>My Profile</span>
            </Link>
        </div>
        <div className="nav3of3">
            <i class='bx bx-log-out' ></i>
            <span>Logout</span>
        </div>
    </div>
  )
}

export default Navbar;