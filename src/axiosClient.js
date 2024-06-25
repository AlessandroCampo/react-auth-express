import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL;

export const customAxiosInstance = axios.create({
    baseURL,
    timeout: 3000
})

customAxiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('authTokenReact');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
})

customAxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('authTokenReact');
            localStorage.removeItem('reactUsername');
            window.location = "/login";
        }
        return Promise.reject(error);
    }
);


