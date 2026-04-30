import { combineReducers } from "redux";
import { authReducer } from "./Authentication/Reducer";
import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./Restaurant/Reducer";
import menuItemReducer from "./Menu/Reducer";
import cartReducer from "./Cart/Reducer";
import orderReducer from "./Order/Reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    restaurant:restaurantReducer,
    menu: menuItemReducer,
    cart: cartReducer,
    order: orderReducer
})

export const store = configureStore({
    reducer: rootReducer
});
