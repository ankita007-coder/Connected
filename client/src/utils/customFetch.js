// import axios from "axios";


// const customFetch = axios.create({
//     baseURL: '/api/v1'
// })


// export default customFetch

import axios from 'axios';

// Create an instance of axios
const customFetch = axios.create({
    baseURL: '/api/v1'
});

// Add a request interceptor to attach the token
customFetch.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle 401 errors
customFetch.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token has expired or user is unauthorized
            localStorage.removeItem('token');
            // Redirect to login page
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default customFetch;
