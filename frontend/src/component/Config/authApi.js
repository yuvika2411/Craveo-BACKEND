import { api } from "./api";

export const loginUser = async (data) => {
    try {
        const res = await api.post("/api/auth/login", data);
        return res.data;
    } catch (error) {
        console.log("Login error:", error);
        throw error;
    }
};