const initialState = {
    user:null,
    jwt: null,
    loading: false,
    error: null,
    favorites: [],
    success:null
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case ADD_TO_FAVORITE_REQUEST:
            return { ...state, success: null, isLoading: true, error: null };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, jwt: action.payload, isLoading: false, success: "Register Success" };
        case ADD_TO_FAVORITE_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                favorites:isPresentInFavorites(state.favorites,action.payload.id)?state.favorites.filter(favorite=>favorite.id!==action.payload.id): [...state.favorites, action.payload],
                success: "Login Success"
            }
        
        default:
            return state;
    }
}