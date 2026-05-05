import axios from "axios";

// export const BASE_URL = "VITE";

 // ✅ fixed backend port

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ,
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ AUTO TOKEN ATTACH
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});