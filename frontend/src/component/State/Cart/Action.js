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


// ✅ FIND CART
export const findCart = () => {
    return async (dispatch) => {
        dispatch({ type: FIND_CART_REQUEST });
        try {
            const { data } = await api.get(`/api/cart`);
            dispatch({ type: FIND_CART_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: FIND_CART_FAILURE, payload: error.message });
        }
    };
};


// ✅ GET ALL CART ITEMS
export const getAllCartItems = (cartId) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });
        try {
            const { data } = await api.get(`/api/carts/${cartId}/items`);
            dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error.message });
        }
    };
};


// ✅ ADD ITEM TO CART (FIXED)
export const addItemToCart = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
        try {
            const { data } = await api.put(`/api/cart/add`, {
                foodId: reqData.foodId,
                quantity: reqData.quantity
            });

            dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
        }
    };
};


// ✅ UPDATE CART ITEM (FIXED)
export const updateCartItem = ({ cartItemId, quantity }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CARTITEM_REQUEST });
        try {
            const { data } = await api.put(`/api/cart-item/update`, {
                cartItemId,
                quantity
            });

            dispatch({ type: UPDATE_CARTITEM_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: UPDATE_CARTITEM_FAILURE, payload: error.message });
        }
    };
};


// ✅ REMOVE ITEM
export const removeCartItem = (cartItemId) => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_CARTITEM_REQUEST });
        try {
            await api.delete(`/api/cart-item/${cartItemId}/remove`);

            dispatch({ type: REMOVE_CARTITEM_SUCCESS, payload: cartItemId });
        } catch (error) {
            dispatch({ type: REMOVE_CARTITEM_FAILURE, payload: error.message });
        }
    };
};


// ✅ CLEAR CART
export const clearCartAction = () => {
    return async (dispatch) => {
        dispatch({ type: CLEARE_CART_REQUEST });
        try {
            const { data } = await api.put(`/api/cart/clear`, {});
            dispatch({ type: CLEARE_CART_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: CLEARE_CART_FAILURE, payload: error.message });
        }
    };
};