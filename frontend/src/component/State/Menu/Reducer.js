import * as ActionType from "./ActionType";

const initialSatate = {
    menuItems: [],
    loading: false,
    error: null
}

export const menuItemReducer = (state = initialSatate, action) => {
    switch (action.type) {
        case ActionType.CREATE_MENU_ITEM_REQUEST:
        case ActionType.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
        case ActionType.DELETE_MENU_ITEM_REQUEST:
        case ActionType.SEARCH_MENU_ITEM_REQUEST:
        case ActionType.UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: ""
            };
        case ActionType.CREATE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: [...state.menuItems, action.payload],
                message:"Food created successfully"
            };
        case ActionType.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: action.payload
            };
        case ActionType.DELETE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: state.menuItems.filter((item) => item.id !== action.payload)
            };
        case ActionType.SEARCH_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: action.payload
            };
        case ActionType.UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: state.menuItems.map((item) => item.id === action.payload.id ? action.payload : item)
            };
        case ActionType.CREATE_MENU_ITEM_FAILURE:
        case ActionType.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
        case ActionType.DELETE_MENU_ITEM_FAILURE:
        case ActionType.SEARCH_MENU_ITEM_FAILURE:
        case ActionType.UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default menuItemReducer;