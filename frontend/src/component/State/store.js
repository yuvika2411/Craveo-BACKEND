import { combineReducers } from "redux";
import { authReducer } from "./Authentication/Reducer";
import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./Restaurant/Reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    restaurant:restaurantReducer
})

export const store = configureStore({
    reducer: rootReducer
});
