import { api } from "../../Config/api";
import {
    ADD_ITEM_TO_CART_FAILURE,
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_SUCCESS,
    CLEARE_CART_FAILURE,
    CLEARE_CART_REQUEST,
    CLEARE_CART_SUCCESS,
    FIND_CART_FAILURE,
    FIND_CART_REQUEST,
    FIND_CART_SUCCESS,
    GET_ALL_CART_ITEMS_FAILURE,
    GET_ALL_CART_ITEMS_REQUEST,
    GET_ALL_CART_ITEMS_SUCCESS,
    REMOVE_CARTITEM_FAILURE,
    REMOVE_CARTITEM_REQUEST,
    REMOVE_CARTITEM_SUCCESS,
    UPDATE_CARTITEM_FAILURE,
    UPDATE_CARTITEM_REQUEST,
    UPDATE_CARTITEM_SUCCESS
} from "./ActionType";

export const findCart = (token) => {
    return async (dispatch) => {
        dispatch({ type: FIND_CART_REQUEST });
        try {
            const response = await api.get(`/api/cart`);
            console.log("find cart response", response.data);
            dispatch({ type: FIND_CART_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("find cart error", error);
            dispatch({ type: FIND_CART_FAILURE, payload: error });
        }
    };
};

export const getAllCartItems = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });
        try {
            const response = await api.get(`/api/carts/${reqData.cartId}/items`);
            dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: response.data });
        } catch (error) {
            console.log("get all cart items error", error);
            dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error });
        }
    };
};

export const addItemToCart = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
        try {
            const { data } = await api.put(`/api/cart/add`, reqData.cartItem);
            console.log("add item to cart", data);
            dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
        } catch (error) {
            console.log("add item to cart error", error);
            dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
        }
    };
};

export const updateCartItem = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CARTITEM_REQUEST });
        try {
            const { data } = await api.put(`/api/cart-item/update`, reqData.data);
            console.log("update cart item", data);
            dispatch({ type: UPDATE_CARTITEM_SUCCESS, payload: data });
        } catch (error) {
            console.log("update cart item error", error);
            dispatch({ type: UPDATE_CARTITEM_FAILURE, payload: error.message });
        }
    };
};

export const removeCartItem = ({ cartItemId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_CARTITEM_REQUEST });
        try {
            const { data } = await api.delete(`/api/cart-item/${cartItemId}/remove`);
            console.log("remove cart item", data);
            dispatch({ type: REMOVE_CARTITEM_SUCCESS, payload: cartItemId });
        } catch (error) {
            console.log("remove cart item error", error);
            dispatch({ type: REMOVE_CARTITEM_FAILURE, payload: error.message });
        }
    };
};

export const clearCartAction = () => {
    return async (dispatch) => {
        dispatch({ type: CLEARE_CART_REQUEST });
        try {
            const { data } = await api.put(`/api/cart/clear`, {});
            console.log("clear cart", data);
            dispatch({ type: CLEARE_CART_SUCCESS, payload: data });
        } catch (error) {
            console.log("clear cart error", error);
            dispatch({ type: CLEARE_CART_FAILURE, payload: error.message });
        }
    };
};
