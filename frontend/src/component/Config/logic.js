export const isPresentInFavorites=({favorites,restaurantId})=>{
    return favorites.some(favorite => favorite.id === restaurantId || favorite.restaurant?.id === restaurantId);
}

export const isPresentInCart=({cart,restaurantId})=>{
    return cart.some(item=>item.restaurantId===restaurantId);
}

