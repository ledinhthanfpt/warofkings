import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Player from './components/PlayerInfo';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Player />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/player/:username" element={<Player />} />
            </Routes>
        </Router>
    );
};

export default App;
