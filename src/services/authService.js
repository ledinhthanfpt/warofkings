import axios from 'axios';

const login = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:3000/api/login', { username, password }, { withCredentials: true });
        return response.data;
    } catch (error) {
        return { success: false, message: error.message };
    }
};

const register = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:3000/api/register', { username, password });
        return response.data;
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export default { login, register };
