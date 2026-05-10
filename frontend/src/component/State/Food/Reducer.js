import { GET_FOOD_SUCCESS } from "./ActionType";

const initialState = {
    foods: []
};

export const foodReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_FOOD_SUCCESS:
            return {
                ...state,
                foods: action.payload
            };

        default:
            return state;
    }
};