import { api } from "../../Config/api";
import { GET_FOOD_SUCCESS } from "./ActionType";

export const getFoodByRestaurant = ({ restaurantId }) => async (dispatch) => {
    try {
        const { data } = await api.get(
            `/api/food/restaurant/${restaurantId}?vegetarian=false&nonVegetarian=false&seasonal=false`
        );

        dispatch({
            type: GET_FOOD_SUCCESS,
            payload: data
        });

    } catch (error) {
        console.log("Error fetching food", error);
    }
};