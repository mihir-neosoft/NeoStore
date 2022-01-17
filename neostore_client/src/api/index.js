import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8899/api' });
// const API = axios.create({ baseURL: process.env.REACT_APP_API })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const forgotPassword = (data) => API.post('/auth/forgotpassword', data);
export const resetPassword = (data) => API.post('/auth/resetpassword', data);
export const changePassword = (data) => API.post('/auth/changepassword', data);
// profile control
export const createProfile = (newProfile) => API.post('/profiles', newProfile);
// products