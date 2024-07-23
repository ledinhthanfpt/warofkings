import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import './Login.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await authService.register(username, password);
            if (response.success) {
                navigate(`/login`);
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
                Minecraft Registration
            </div>
            <form className="p-3 mt-3" onSubmit={handleRegister}>
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
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        id="confirmPwd" 
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="btn mt-3" type="submit">Register</button>
            </form>
            <div className="text-center fs-6">
                <Link to="/login">Already have an account? Login</Link>
            </div>
            {error && <p className="text-center text-danger mt-3">{error}</p>}
        </div>
    );
};

export default Register;
