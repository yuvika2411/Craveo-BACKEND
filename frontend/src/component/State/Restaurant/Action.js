import { api } from "../../Config/api";
import {
    CREATE_RESTAURANT_FAILURE,
    CREATE_RESTAURANT_REQUEST,
    CREATE_RESTAURANT_SUCCESS,
    GET_ALL_RESTAURANTS_FAILURE,
    GET_ALL_RESTAURANTS_REQUEST,
    GET_ALL_RESTAURANTS_SUCCESS,
    DELETE_RESTAURANT_FAILURE,
    DELETE_RESTAURANT_REQUEST,
    DELETE_RESTAURANT_SUCCESS,
    UPDATE_RESTAURANT_FAILURE,
    UPDATE_RESTAURANT_REQUEST,
    UPDATE_RESTAURANT_SUCCESS,
    ADD_TO_FAVORITE_FAILURE,
    ADD_TO_FAVORITE_REQUEST,
    ADD_TO_FAVORITE_SUCCESS,
    GET_RESTAURANT_BY_ID_FAILURE,
    GET_RESTAURANT_BY_ID_REQUEST,
    GET_RESTAURANT_BY_ID_SUCCESS,
    GET_RESTAURANT_BY_USER_ID_FAILURE,
    GET_RESTAURANT_BY_USER_ID_REQUEST,
    GET_RESTAURANT_BY_USER_ID_SUCCESS,
    UPDATE_RESTAURANT_STATUS_FAILURE,
    UPDATE_RESTAURANT_STATUS_REQUEST,
    UPDATE_RESTAURANT_STATUS_SUCCESS,
    GET_ALL_EVENTS_FAILURE,
    GET_ALL_EVENTS_REQUEST,
    GET_ALL_EVENTS_SUCCESS,
    DELETE_EVENT_FAILURE,
    DELETE_EVENT_REQUEST,
    DELETE_EVENT_SUCCESS,
    GET_RESTAURANT_EVENTS_FAILURE,
    GET_RESTAURANT_EVENTS_REQUEST,
    GET_RESTAURANT_EVENTS_SUCCESS,
    CREATE_CATEGORY_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    GET_RESTAURANT_CATEGORY_FAILURE,
    GET_RESTAURANT_CATEGORY_REQUEST,
    GET_RESTAURANT_CATEGORY_SUCCESS,
} from "./ActionType";

export const getAllRestaurantsAction = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
        try {
            const { data } = await api.get("/api/restaurants");
            dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data })
            console.log("all restaurant ", data);
        } catch (error) {
            console.log("Error in fetching all restaurant data", error)
            dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: error.response.data })
        }
    }
}

export const getRestaurantById = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
        try {
            const res = await api.get(`/api/restaurants/${reqData.restaurantId}`);
            dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: res.data });
        } catch (error) {
            console.log("Error in fetching restaurant by ID data", error)
            dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
        }
    }
}

export const getRestaurantsByUserId = (token) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
    try {
        const res = await api.get("/api/restaurants/user");
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("Error in fetching restaurant by user ID data", error)
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error });
    }
}

export const createRestaurant = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_RESTAURANT_REQUEST });
    try {
        const res = await api.post("/api/restaurants", reqData);
        dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error.response.data });
    }
}

export const updateRestaurant = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_REQUEST });
    try {
        const res = await api.put(`/api/restaurants/${reqData.restaurantId}`, reqData);
        dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("Error in updating restaurant data", error)
        dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error });
    }
}

export const deleteRestaurant = (restaurantId) => async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });
    try {
        const res = await api.delete(`/api/restaurants/${restaurantId}`);
        dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error.response.data });
    }
}

export const updateRestaurantStatus = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
    try {
        const res = await api.put(`/api/restaurants/${reqData.restaurantId}/status`, reqData);
        dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("Error in updating restaurant status data", error)
        dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
    }
}

export const createEventAction = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_EVENT_REQUEST });
    try {
        const res = await api.post("/api/events", reqData);
        dispatch({ type: CREATE_EVENT_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("Error in creating event data", error)
        dispatch({ type: CREATE_EVENT_FAILURE, payload: error });
    }
}

export const getAllEvents = (token) => async (dispatch) => {
    dispatch({ type: GET_ALL_EVENTS_REQUEST });
    try {
        const res = await api.get("/api/events");
        dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("Error in fetching all events data", error)
        dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: error });
    }
}

export const deleteEventAction = (eventId) => async (dispatch) => {
    dispatch({ type: DELETE_EVENT_REQUEST });
    try {
        const res = await api.delete(`/api/events/${eventId}`);
        dispatch({ type: DELETE_EVENT_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("Error in deleting event data", error)
        dispatch({ type: DELETE_EVENT_FAILURE, payload: error });
    }
}

export const getRestaurantEvents = (restaurantId, token) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_EVENTS_REQUEST });
    try {
        const res = await api.get(`/api/restaurants/${restaurantId}/events`);
        dispatch({ type: GET_RESTAURANT_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("Error in fetching restaurant events data", error)
        dispatch({ type: GET_RESTAURANT_EVENTS_FAILURE, payload: error });
    }
}

export const createCategoryAction = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
        const res = await api.post("/api/admin/category", reqData);
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("Error in creating category data", error)
        dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
    }
}

export const getRestaurantCategory = ({jwt, restaurantId}) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_CATEGORY_REQUEST });
    try {
        const res = await api.get(`/api/category/restaurant/${restaurantId}`);
        dispatch({ type: GET_RESTAURANT_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("Error in fetching restaurant category data", error)
        dispatch({ type: GET_RESTAURANT_CATEGORY_FAILURE, payload: error });
    }
}


