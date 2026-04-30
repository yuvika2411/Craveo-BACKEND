import axios from "axios";

export const API_URL = "http://localhost:5458/";

export const api = axios.create({
    baseURL: API_URL,
});

// interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwt");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);