import { api } from "../../Config/api";
import {
    DELETE_MENU_ITEM_FAILURE,
    DELETE_MENU_ITEM_REQUEST,
    DELETE_MENU_ITEM_SUCCESS,
    SEARCH_MENU_ITEM_FAILURE,
    SEARCH_MENU_ITEM_REQUEST,
    SEARCH_MENU_ITEM_SUCCESS,
    UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
    UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
    UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
    CREATE_MENU_ITEM_REQUEST,
    CREATE_MENU_ITEM_SUCCESS,
    CREATE_MENU_ITEM_FAILURE,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
    UPDATE_MENU_ITEM_REQUEST,
    UPDATE_MENU_ITEM_SUCCESS,
    UPDATE_MENU_ITEM_FAILURE,
} from "./ActionType";

export const createMenuItem = ({ reqData, jwt }) => async (dispatch) => {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST });
    try {
        const res = await api.post("/api/admin/food", reqData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("create menu item response", res.data);
        dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: res.data });
        return res.data;
    } catch (error) {
        console.log("create menu item error", error);
        const errMsg = error.response?.data?.message || error.response?.data || error.message;
        dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: errMsg });
        throw error;
    }
}

export const getMenuItemsByRestaurantId = ({ restaurantId, jwt }) => async (dispatch) => {
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
        try {
            const res = await api.get(`/api/food/restaurant/${restaurantId}?vegetarian=false&nonVegetarian=false&seasonal=false`);

            console.log("get menu items response", res.data);
            dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: res.data });
        } catch (error) {
            console.log("get menu items error", error);
            dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error.response.data });
        }
}

export const searchMenuItem = ({jwt, searchString}) => async (dispatch) => {
    dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
    try {
        const res = await api.get(`/api/food/search?name=${searchString}`);
        console.log("search menu item response", res.data);
        dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("search menu item error", error);
        dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error.response.data });
    }
}


export const updateMenuItemAvailability = ({jwt, menuItemId}) => async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
    try {
        const res = await api.put(`/api/admin/food/${menuItemId}`);
        console.log("update menu item availability response", res.data);
        dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("update menu item availability error", error);
        dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, payload: error.response.data });
    }
}

export const deleteFoodItem = ({jwt, menuItemId}) => async (dispatch) => {
    dispatch({ type: DELETE_MENU_ITEM_REQUEST });
    try {
        const res = await api.delete(`/api/admin/food/${menuItemId}`);
        console.log("delete food item response", res.data);
        dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: menuItemId }); // Fix payload to be ID for filtering
    } catch (error) {
        console.log("delete food item error", error);
        dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error.response.data });
    }
}

export const updateMenuItem = ({ menuItemId, reqData, jwt }) => async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEM_REQUEST });
    try {
        const res = await api.put(`/api/admin/food/${menuItemId}/edit`, reqData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        console.log("update menu item response", res.data);
        dispatch({ type: UPDATE_MENU_ITEM_SUCCESS, payload: res.data });
        return res.data;
    } catch (error) {
        console.log("update menu item error", error);
        const errMsg = error.response?.data?.message || error.response?.data || error.message;
        dispatch({ type: UPDATE_MENU_ITEM_FAILURE, payload: errMsg });
        throw error;
    }
}
