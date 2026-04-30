import { api } from "../../Config/api";

import {
    GET_RESTAURANT_ORDERS_REQUEST,
    GET_RESTAURANT_ORDERS_SUCCESS,
    GET_RESTAURANT_ORDERS_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE,
} from "./ActionType";

export const fetchRestaurantOrders = ({restaurantId, jwt}) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_ORDERS_REQUEST });
    try {
        const res = await api.get(`/api/restaurants/${restaurantId}/orders`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: GET_RESTAURANT_ORDERS_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: GET_RESTAURANT_ORDERS_FAILURE, payload: error.response.data });
    }
}

export const updateOrderStatus = ({restaurantId, orderId, status, jwt}) => async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    try {
        const res = await api.put(`/api/restaurants/${restaurantId}/orders/${orderId}`, { status }, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error.response.data });
    }
}