import axios from "axios";
import {
    CREATE_INGREDIENT_REQUEST,
    CREATE_INGREDIENT_SUCCESS,
    CREATE_INGREDIENT_FAILURE,
    CREATE_INGREDIENT_CATEGORY_REQUEST,
    CREATE_INGREDIENT_CATEGORY_SUCCESS,
    CREATE_INGREDIENT_CATEGORY_FAILURE,
    GET_INGREDIENT_CATEGORY_REQUEST,
    GET_INGREDIENT_CATEGORY_SUCCESS,
    GET_INGREDIENT_CATEGORY_FAILURE,
    GET_INGREDIENTS,
    UPDATE_STOCK,
} from "./ActionType";

//action ingredient
export const getIngredientsOfRestaurant = (reqData) => async (dispatch) => {
    dispatch({ type: GET_INGREDIENTS });
    try {
        const res = await axios.get(`/api/admin/ingredients?restaurantId=${reqData.restaurantId}`, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`,
            },
        });
        dispatch({ type: GET_INGREDIENTS, payload: res.data });
    } catch (error) {
        dispatch({ type: GET_INGREDIENTS, payload: error.response.data });
    }
}

export const createIngredient = (ingredientData) => async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_REQUEST });
    try {
        const res = await axios.post("/api/admin/ingredients", ingredientData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: CREATE_INGREDIENT_FAILURE, payload: error.response.data });
    }
}

export const createIngredientCategory = (ingredientCategoryData) => async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST });
    try {
        const res = await axios.post("/api/admin/ingredients/category", ingredientCategoryData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        dispatch({ type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: CREATE_INGREDIENT_CATEGORY_FAILURE, payload: error.response.data });
    }
}

export const getIngredientCategory = () => async (dispatch) => {
    dispatch({ type: GET_INGREDIENT_CATEGORY_REQUEST });
    try {
        const res = await axios.get("/api/admin/ingredients/category", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        dispatch({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: GET_INGREDIENT_CATEGORY_FAILURE, payload: error.response.data });
    }
}

export const updateStockOfIngredient = (ingredientData) => async (dispatch) => {
    dispatch({ type: UPDATE_STOCK });
    try {
        const res = await axios.put("/api/admin/ingredients/stock", ingredientData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        });
        dispatch({ type: UPDATE_STOCK, payload: res.data });
    } catch (error) {
        dispatch({ type: UPDATE_STOCK, payload: error.response.data });
    }
}