// this file will contain all the files related to the AuthFolder

import axios from 'axios';
// we import axios to make HTTP requests

// This file contains all the auth-related API functions
const API_URL = import.meta.env.VITE_API_URL;

// User login authentication
export const userLogin = async (FormData:any) => {
    try {
        const response = await axios.post(`${API_URL}/login`, FormData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error: any) {
        // Better error handling
        return error.response?.data || { message: 'Login failed.' };
    }
};

// User registration authentication
export const userRegister = async (formData: any) => {
    try {
        const response = await axios.post(`${API_URL}/register`, FormData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error: any) {
        return error.response?.data || { message: 'Registration failed.' };
    }
};
