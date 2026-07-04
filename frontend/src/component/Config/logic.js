export const isPresentInFavorites=({favorites,restaurantId})=>{
    return favorites.some(favorite => String(favorite.id) === String(restaurantId) || String(favorite.restaurant?.id) === String(restaurantId));
}

export const isPresentInCart=({cart,restaurantId})=>{
    return cart.some(item=>item.restaurantId===restaurantId);
}

