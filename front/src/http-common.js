import axios from 'axios';

const ajax = axios.create({
    baseURL: 'http://localhost:3000/'
    // za mobilni mora ip
    // baseURL: 'http://192.168.0.219:3000/'
});

ajax.CancelToken = axios.CancelToken;
ajax.isCancel = axios.isCancel;

// find token if exists
ajax.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default ajax;