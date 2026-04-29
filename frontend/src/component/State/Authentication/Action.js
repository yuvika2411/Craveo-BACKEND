import { API_URL } from "../../../config/api";
import axios from "axios";

export const registerUser=(reqData)=> async(dispatch)=>{
    dispatch({ type: REGISTER_REQUEST })
    try {
        const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData)
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if(data.role=="ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant")
        }
        else {
            reqData.navigate("/")
        }
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt })
        console.log("User Registered Successfully",data)
    }
    catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error })
        console.log("Error: ", error);
    }
}

export const loginUser=(reqData)=> async(dispatch)=>{
    dispatch({ type: LOGIN_REQUEST })
    try {
        const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData)
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if(data.role=="ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant")
        }
        else {
            reqData.navigate("/")
        }
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt })
        console.log("User Logged in Successfully",data)
    }
    catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error })
        console.log("Error: ", error);
    }
}

export const getUser=(jwt)=> async(dispatch)=>{
    dispatch({ type: GET_USER_REQUEST })
    try {
        const { data } = await api.get(`/auth/signin`, {
            headers: {
            Authorization:`Bearer ${jwt}`
            }
        })
        dispatch({ type: GET_USER_SUCCESS, payload: data})
        console.log("User Profile", data);
    }
    catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error })
        console.log("Error: ", error);
    }
}

export const addToFavorite=({jwt,restaurantId})=>async(dispatch)=>{
    dispatch({ type: ADD_TO_FAVORITE_REQUEST })
    try{
        const {data}=await api.put(`${API_URL}/api/restaurants/${restaurantId}/add-favorites`, {
            headers: {
            Authorization:`Bearer ${jwt}`
            }
        })
        dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data})
        console.log("Added to Favorite", data);
    }

    catch (error) {
        dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error })
        console.log("Error: ", error);
    }
}

export const logout = () => async (dispatch) => {
    dispatch({ type: LOG_OUT })
    try {
        localStorage.clear()
        dispatch({ type: LOG_OUT_SUCCESS })
        console.log("User Logged out Successfully")
    }
    catch (error) {
        console.log("Error: ", error);
    }
}