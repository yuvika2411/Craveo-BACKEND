import { combineReducers } from "redux";
import { authReducer } from "./Authentication/Reducer";
import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./Restaurant/Reducer";
import menuItemReducer from "./Menu/Reducer";
import cartReducer from "./Cart/Reducer";
import orderReducer from "./Order/Reducer";
import restaurantOrderReducer from "./Restaurant Order/Reducer";
import ingredientReducer from "./Ingredients/Reducer";

import { foodReducer } from "./Food/Reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    menu: menuItemReducer,
    cart: cartReducer,
    order: orderReducer,
    restaurantOrder: restaurantOrderReducer,
    ingredient: ingredientReducer,
    food: foodReducer
});

export const store = configureStore({
    reducer: rootReducer
});