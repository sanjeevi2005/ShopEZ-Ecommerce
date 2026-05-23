import axios from 'axios';

// Ensure your backend is running on this port
const API = axios.create({ baseURL: 'http://localhost:8000/api' });
export const getProducts = () => API.get('/products');

export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);
export const placeOrder = (orderData) => API.post('/orders/place', orderData);

// Added this function to fetch orders by User ID
export const getUserOrders = (userId) => API.get(`/orders/user/${userId}`);