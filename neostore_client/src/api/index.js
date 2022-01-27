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
// User
export const getuser = (id) => API.get(`/user/${id}`);
export const addaddress = (data, id) => API.post(`user/address/${id}/addaddress`, data);
// cart
export const addtocart = (data, id) => API.post(`user/cart/addtocart/${id}`, data);
export const getcart = (id) => API.get(`user/cart/getcart/${id}`);
// order
export const ordercomplete = (data, id) => API.post(`user/order/ordercomplete/${id}`, data);
// profile control
export const createProfile = (newProfile) => API.post('/profiles', newProfile);
// products
export const getallcolor = () => API.get('/product/getallcolor');
export const getallcategory = () => API.get('/product/getallcategory');
export const getallproducts = () => API.get('/product/getallproducts');
export const getproduct = (id) => API.get(`/product/productdetails/${id}`);
export const filterproduct = (data) => API.post(`/product/filterproduct`, data);
// extra
export const addsubscriber = (data) => API.post(`/extra/addsubscriber`, data);
