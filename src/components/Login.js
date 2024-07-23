import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await authService.login(username, password);
            if (response.success) {
                navigate(`/player/${username}`);
            } else {
                setError(response.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="wrapper">
            <div className="logo">
                <img src="https://www.freepnglogos.com/uploads/minecraft-logo-7.png" alt="Minecraft Logo" />
            </div>
            <div className="text-center mt-4 name">
                Minecraft Login
            </div>
            <form className="p-3 mt-3" onSubmit={handleLogin}>
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user"></span>
                    <input 
                        type="text" 
                        name="userName" 
                        id="userName" 
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input 
                        type="password" 
                        name="password" 
                        id="pwd" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="btn mt-3" type="submit">Login</button>
            </form>
            <div className="text-center fs-6">
                <Link to="/register">Don't have an account? Sign up</Link>
            </div>
            {error && <p className="text-center text-danger mt-3">{error}</p>}
        </div>
    );
};

export default Login;
