import { api } from "../../config/api";

export const loginUser = ({ userData, navigate }) => async (dispatch) => {
    try {
        const { data } = await api.post("/api/auth/login", userData);

        // ✅ SAVE TOKEN
        localStorage.setItem("jwt", data);

        // ✅ optional: dispatch success
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: data,
        });

        // ✅ redirect
        navigate("/");

        // ✅ reload so API gets token
        window.location.reload();

    } catch (error) {
        console.log("Login error:", error);

        dispatch({
            type: "LOGIN_FAILURE",
            payload: error,
        });
    }
};