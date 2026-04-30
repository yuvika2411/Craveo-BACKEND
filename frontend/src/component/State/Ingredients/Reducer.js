import {
    CREATE_INGREDIENT_CATEGORY_SUCCESS,
    CREATE_INGREDIENT_SUCCESS,
    GET_INGREDIENTS,
    GET_INGREDIENT_CATEGORY_SUCCESS,
    UPDATE_STOCK,
} from "./ActionType";

const initialState = {
    ingredients: [],
    ingredientCategories: [],
    loading: false,
    error: null
}

export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS:
            return {
                ...state,
                loading: false,
                ingredients: action.payload
            }
        case GET_INGREDIENT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                ingredientCategories: action.payload
            }
        case CREATE_INGREDIENT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                ingredientCategories: [...state.ingredientCategories, action.payload]
            }
        case CREATE_INGREDIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                ingredients: [...state.ingredients, action.payload]
            }
        case UPDATE_STOCK:
            return {
                ...state,
                update:action.payload,
                ingredients:state.ingredients.map((item)=>item.id===action.payload.id?action.payload:item),
            };
        default:
            return state;
    }
}
export default ingredientReducer;