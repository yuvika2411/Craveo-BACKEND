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
} from "./ActionType";

export const createMenuItem = ({ reqData }) => async (dispatch) => {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST });
    try {
        const res = await api.post("/api/restaurants", reqData);    
        console.log("create menu item response", res.data);
        dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("create menu item error", error);
        dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error.response.data });
    }
}

export const getMenuItemsByRestaurantId = ({ restaurantId, jwt }) => async (dispatch) => {
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
        try {
            const res = await api.get(`/api/restaurants/${restaurantId}/menu`);
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
        const res = await api.get(`/api/restaurants/menu/search?query=${searchString}`);
        console.log("search menu item response", res.data);
        dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("search menu item error", error);
        dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error.response.data });
    }
}

// export const getAllIngredientsofMenuItem = ({jwt, menuItemId}) => async (dispatch) => {
//     dispatch({ type: GET_ALL_INGREDIENTS_OF_MENU_ITEM_REQUEST });
//     try {
//         const res = await api.get(`/api/ingredients/menu/${menuItemId}`, {
//             headers: {
//                 Authorization: `Bearer ${jwt}`,
//             },
//         });
//         console.log("get all ingredients of menu item response", res.data);
//         dispatch({ type: GET_ALL_INGREDIENTS_OF_MENU_ITEM_SUCCESS, payload: res.data });
//     } catch (error) {
//         console.log("get all ingredients of menu item error", error);
//         dispatch({ type: GET_ALL_INGREDIENTS_OF_MENU_ITEM_FAILURE, payload: error.response.data });
//     }
// }

export const updateMenuItemAvailability = ({jwt, menuItemId}) => async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
    try {
        const res = await api.put(`/api/restaurants/menu/${menuItemId}/availability`, {});
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
        const res = await api.delete(`/api/restaurants/menu/${menuItemId}`);
        console.log("delete food item response", res.data);
        dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: res.data });
    } catch (error) {
        console.log("delete food item error", error);
        dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error.response.data });
    }
}
