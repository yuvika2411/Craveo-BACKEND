import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// AUTO TOKEN ATTACH
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("jwt");

    // public routes → token mat bhejo
    const publicRoutes = [
        "/api/restaurants"
    ];

    const isPublic =
        publicRoutes.some(
            route =>
                config.url?.startsWith(route)
        );

    if (token && !isPublic) {
        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;

});