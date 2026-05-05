// api/axios.js
// Central Axios instance — automatically attaches JWT token to every request

import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Vite proxy forwards this to http://localhost:5000/api
});

// Before every request, attach the token from localStorage (if it exists)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the server responds with 401 (Unauthorized), log the user out
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
