import React, { useContext, useState } from 'react';
import pal_logo from './pallogo.jpeg';
import './SignUp.css';
import { User } from '../../MyObjects/User';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';

function SignUp() {
    const [username, setUsername] = useState('');
    const [github, setGithub] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const contextValue = useContext(UserContext);
    const setUser = contextValue.setUser;
    const navigate = useNavigate();

    function submit(event) {
        event.preventDefault(); // Prevents navigation
        if (!username || !github || !email || !password) {
            setErrorMessage('All fields are required!');
            return;
        }
        setErrorMessage('');
        let user = new User(username, email, github, password);
        setUser(user);
        navigate("/dashboard");
    }

    return (
        <div className="rootcontainer">
            <div className='signup-container'>
                <div className="logo">
                    <img className="pal-logo" src={pal_logo} alt="PAL Logo" />
                </div>
                <div className="signup-welcome">
                    <h2>Welcome to ProjectPal.</h2>
                    <p>Sign in or create an account to get started.</p>
                </div>
                <div className="signup-form">
                    <form onSubmit={submit}>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        <div className="signup-username">
                            <label htmlFor="username">Username</label>
                            <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="signup-github">
                            <label htmlFor="github">GitHub</label>
                            <input type="text" placeholder='GitHub' onChange={(e) => setGithub(e.target.value)} required />
                        </div>
                        <div className="signup-email">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder='name@example.com' onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="signup-password">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="signup-signupbtn">
                            <button type="submit">Sign Up</button>
                        </div>
                    </form>
                    <div className="signup-otheroptions">
                        <p>Have an account? <a href="/">Sign in</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
