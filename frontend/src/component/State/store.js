import {combineReducers} from "redux";
import { authReducer } from "./Authentication/Reducer";

const rootReducer= combineReducers({
    auth: authReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

