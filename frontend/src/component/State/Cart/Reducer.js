import { LOGOUT } from "../Authentication/ActionType";
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, CLEAR_CART } from "./ActionType";

const initialState = {
    cart: null,
    cartItems: [],
    loading: false,
    error: null
}

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload)
            }
        case UPDATE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.map((item) => item.id === action.payload.id ? action.payload : item)
            }
        case CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }
        case LOGOUT:
            return {
                ...state,
                cart: null,
                cartItems: []
            }
        default:
            return state;
    }
}