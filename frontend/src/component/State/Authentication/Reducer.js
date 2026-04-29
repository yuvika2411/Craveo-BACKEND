import { isPresentInFavorites } from "../../Config/logic";
import {
    ADD_TO_FAVORITE_FAILURE,
    ADD_TO_FAVORITE_REQUEST,
    ADD_TO_FAVORITE_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "./ActionType";

const initialState = {
    user:null,
    jwt: null,
    loading: false,
    error: null,
    favorites: [],
    success:null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case ADD_TO_FAVORITE_REQUEST:
            return { ...state, success: null, loading: true, error: null };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            console.log("login success", action.payload)
            return { ...state, jwt: action.payload, loading: false, success: "Register Success" };
        case GET_USER_SUCCESS:
            console.log("get user success", action.payload)
            return { ...state, user: action.payload, loading: false, success: "User Load Success" };
        case ADD_TO_FAVORITE_SUCCESS:
            console.log("add to favorite success", action.payload)
            return {
                ...state,
                loading: false,
                favorites: isPresentInFavorites({favorites: state.favorites, restaurantId: action.payload.id})
                    ? state.favorites.filter(favorite => favorite.id !== action.payload.id)
                    : [...state.favorites, action.payload],
                success: "Added to Favorites"
            }
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case ADD_TO_FAVORITE_FAILURE:
            return {
                ...state,
                success: null,
                loading: false,
                error: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                user:null,
                jwt:null
            }
        default:
            return state;
    }
}
