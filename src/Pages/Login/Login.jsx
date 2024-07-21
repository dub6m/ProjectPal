import React, { useState } from 'react';
import pal_logo from './pallogo.jpeg';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    function submit(event) {
        event.preventDefault(); // Prevents navigation
        if (!email || !password) {
            setErrorMessage('All fields are required!');
            return;
        }
        setErrorMessage('');
        navigate("/dashboard");
    }

    return (
        <div className="loginroot">
            <div className='logincontainer'>
                <div className="logo">
                    <img className="pal-logo" src={pal_logo} alt="PAL Logo" />
                </div>
                <div className="welcome">
                    <h2>Welcome to ProjectPal.</h2>
                    <p>Sign in or create an account to get started.</p>
                </div>
                <div className="signin-form">
                    <form onSubmit={submit}>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder='name@example.com' onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="signinbtn">
                            <button type="submit">Sign In</button>
                        </div>
                    </form>
                    <div className="otheroptions">
                        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;