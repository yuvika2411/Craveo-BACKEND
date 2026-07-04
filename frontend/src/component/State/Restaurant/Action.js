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
    CREATE_EVENT_FAILURE,
    CREATE_EVENT_REQUEST,
    CREATE_EVENT_SUCCESS,
    UPDATE_EVENT_FAILURE,
    UPDATE_EVENT_REQUEST,
    UPDATE_EVENT_SUCCESS,
    BOOK_EVENT_FAILURE,
    BOOK_EVENT_REQUEST,
    BOOK_EVENT_SUCCESS,
    GET_CUSTOMER_EVENTS_FAILURE,
    GET_CUSTOMER_EVENTS_REQUEST,
    GET_CUSTOMER_EVENTS_SUCCESS,
    UPDATE_EVENT_STATUS_FAILURE,
    UPDATE_EVENT_STATUS_REQUEST,
    UPDATE_EVENT_STATUS_SUCCESS,
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
    DELETE_CATEGORY_FAILURE,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
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
            dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error.response?.data?.message || error.message });
        }
    }
}

export const getRestaurantsByUserId = (token) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
    try {
        const res = await api.get("/api/admin/restaurants/user");
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("Error in fetching restaurant by user ID data", error)
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error });
    }
}

export const createRestaurant = (reqData) => async (dispatch) => {

    dispatch({
        type: CREATE_RESTAURANT_REQUEST
    });

    try {
        const res = await api.post("/api/admin/restaurants",
            reqData.data,
            {
                headers: {
                    Authorization: `Bearer ${reqData.token}`
                }
            }
        );
        dispatch({
            type: CREATE_RESTAURANT_SUCCESS,
            payload: res.data
        });

    } catch (error) {
        console.log("Restaurant create error:", error);
        dispatch({
            type: CREATE_RESTAURANT_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};

export const updateRestaurant = ({ restaurantId, data, token }) => async (dispatch) => {

    dispatch({ type: UPDATE_RESTAURANT_REQUEST });

    try {

        const res = await api.put(
            `/api/admin/restaurants/${restaurantId}`, data, { headers: {Authorization: `Bearer ${token}` }}
        );

        dispatch({
            type: UPDATE_RESTAURANT_SUCCESS,
            payload: res.data
        });

        return res.data;
        
    } catch (error) {

        dispatch({
            type: UPDATE_RESTAURANT_FAILURE,
            payload: error.response?.data?.message || error.message
        });

        throw error;
    }
};

export const deleteRestaurant = (restaurantId) => async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });
    try {
        const res = await api.delete(`/api/admin/restaurants/${restaurantId}`);
        dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error.response.data });
    }
}

export const updateRestaurantStatus = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
    try {
        const res = await api.put(`/api/admin/restaurants/${reqData.restaurantId}/status`, reqData);
        dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("Error in updating restaurant status data", error)
        dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error.response?.data?.message || error.message });
    }
}

export const createEventAction = ({ reqData, jwt }) => async (dispatch) => {
    dispatch({ type: CREATE_EVENT_REQUEST });
    try {
        const res = await api.post("/api/admin/events", reqData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: CREATE_EVENT_SUCCESS, payload: res.data });
        return res.data;
    } catch (error) {
        console.log("Error in creating event data", error);
        dispatch({ type: CREATE_EVENT_FAILURE, payload: error.response?.data?.message || error.message });
        throw error;
    }
}

export const getAllEvents = (token) => async (dispatch) => {
    dispatch({ type: GET_ALL_EVENTS_REQUEST });
    try {
        const res = await api.get("/api/events");
        dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("Error in fetching all events data", error)
        dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: error.response?.data?.message || error.message });
    }
}

export const deleteEventAction = ({ eventId, jwt }) => async (dispatch) => {
    dispatch({ type: DELETE_EVENT_REQUEST });
    try {
        await api.delete(`/api/admin/events/${eventId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: DELETE_EVENT_SUCCESS, payload: eventId });
    } catch (error) {
        console.log("Error in deleting event data", error);
        dispatch({ type: DELETE_EVENT_FAILURE, payload: error.response?.data?.message || error.message });
    }
}

export const getRestaurantEvents = ({ restaurantId, jwt }) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_EVENTS_REQUEST });
    try {
        const res = await api.get(`/api/admin/events/restaurant/${restaurantId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: GET_RESTAURANT_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("Error in fetching restaurant events data", error);
        dispatch({ type: GET_RESTAURANT_EVENTS_FAILURE, payload: error.response?.data?.message || error.message });
    }
}

export const updateEventAction = ({ eventId, reqData, jwt }) => async (dispatch) => {
    dispatch({ type: UPDATE_EVENT_REQUEST });
    try {
        const res = await api.put(`/api/admin/events/${eventId}`, reqData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: UPDATE_EVENT_SUCCESS, payload: res.data });
        return res.data;
    } catch (error) {
        console.log("Error in updating event data", error);
        dispatch({ type: UPDATE_EVENT_FAILURE, payload: error.response?.data?.message || error.message });
        throw error;
    }
}

export const bookEventAction = ({ restaurantId, reqData, jwt }) => async (dispatch) => {
    dispatch({ type: BOOK_EVENT_REQUEST });
    try {
        const res = await api.post(`/api/events/restaurant/${restaurantId}`, reqData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: BOOK_EVENT_SUCCESS, payload: res.data });
        return res.data;
    } catch (error) {
        console.log("Error booking event:", error);
        dispatch({ type: BOOK_EVENT_FAILURE, payload: error.response?.data?.message || error.message });
        throw error;
    }
}

export const getCustomerEventsAction = (jwt) => async (dispatch) => {
    dispatch({ type: GET_CUSTOMER_EVENTS_REQUEST });
    try {
        const res = await api.get(`/api/events/customer`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: GET_CUSTOMER_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("Error fetching customer events:", error);
        dispatch({ type: GET_CUSTOMER_EVENTS_FAILURE, payload: error.response?.data?.message || error.message });
    }
}

export const updateEventStatusAction = ({ eventId, status, jwt }) => async (dispatch) => {
    dispatch({ type: UPDATE_EVENT_STATUS_REQUEST });
    try {
        const res = await api.put(`/api/admin/events/${eventId}/status?status=${status}`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: UPDATE_EVENT_STATUS_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("Error updating event status:", error);
        dispatch({ type: UPDATE_EVENT_STATUS_FAILURE, payload: error.response?.data?.message || error.message });
    }
}

export const createCategoryAction = ({ reqData, jwt }) => async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
        const res = await api.post("/api/admin/category", reqData);
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("Error in creating category data", error)
        dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error.response?.data?.message || error.message });
    }
}

export const getRestaurantCategory = ({ restaurantId } = {}) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_CATEGORY_REQUEST });
    try {
        const url = restaurantId
            ? `/api/category/restaurant/${restaurantId}`
            : `/api/admin/category/restaurant`;
        const res = await api.get(url);
        dispatch({ type: GET_RESTAURANT_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("Error in fetching restaurant category data", error)
        dispatch({ type: GET_RESTAURANT_CATEGORY_FAILURE, payload: error.response?.data?.message || error.message });
    }
}

export const deleteCategoryAction = ({ categoryId, jwt }) => async (dispatch) => {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    try {
        await api.delete(`/api/admin/category/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: categoryId });
    } catch (error) {
        console.log("Error in deleting category", error);
        dispatch({ type: DELETE_CATEGORY_FAILURE, payload: error.response?.data?.message || error.message });
    }
}


