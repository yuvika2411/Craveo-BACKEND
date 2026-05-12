import axios from "axios";
import { GET_FOOD_SUCCESS } from "./ActionType";

const API = import.meta.env.VITE_API_URL;

export const getFoodByRestaurant = ({ restaurantId }) => async (dispatch) => {
    try {
        const { data } = await axios.get(
            `${API}/api/food/restaurant/${restaurantId}`
        );

        dispatch({
            type: GET_FOOD_SUCCESS,
            payload: data
        });

    } catch (error) {
        console.log("Error fetching food", error);
    }
};