import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuItemsByRestaurantId } from '../../State/Menu/Action';
import { fetchRestaurantOrders } from '../../State/Restaurant Order/Action';

export const Dashboard = () => {
    const { auth, restaurant, menu, restaurantOrder } = useSelector(store => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        if (jwt && restaurant.usersRestaurant?.id) {
            dispatch(getMenuItemsByRestaurantId({ 
                jwt, 
                restaurantId: restaurant.usersRestaurant.id, 
                vegetarian: false, 
                nonveg: false, 
                seasonal: false, 
                foodCategory: "" 
            }));
            dispatch(fetchRestaurantOrders({
                restaurantId: restaurant.usersRestaurant.id,
                jwt
            }));
        }
    }, [dispatch, jwt, restaurant.usersRestaurant?.id]);

    const totalOrders = restaurantOrder.orders?.length || 0;
    const totalMenuItems = menu.menuItems?.length || 0;
    const revenue = restaurantOrder.orders?.reduce((acc, order) => {
        return order.orderStatus === "COMPLETED" || order.orderStatus === "DELIVERED" ? acc + order.totalAmount : acc;
    }, 0) || 0;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-white">Restaurant Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 shadow-xl">
                    <h3 className="text-gray-400 text-sm font-semibold mb-2 uppercase">Total Orders</h3>
                    <p className="text-4xl font-bold text-white">{totalOrders}</p>
                </div>
                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 shadow-xl">
                    <h3 className="text-gray-400 text-sm font-semibold mb-2 uppercase">Total Menu Items</h3>
                    <p className="text-4xl font-bold text-white">{totalMenuItems}</p>
                </div>
                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#ea580c]/20 rounded-full blur-2xl"></div>
                    <h3 className="text-gray-400 text-sm font-semibold mb-2 uppercase">Revenue</h3>
                    <p className="text-4xl font-bold text-[#ea580c]">₹{revenue}</p>
                </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-8 shadow-xl text-center">
                <div className="w-24 h-24 bg-[#ea580c]/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#ea580c]/30">
                    <span className="text-4xl">🏬</span>
                </div>
                <h2 className="text-3xl font-bold mb-3 text-white">Welcome back, {auth.user?.fullName}!</h2>
                {restaurant.usersRestaurant && (
                    <div className="mt-4">
                        <p className="text-xl text-[#ea580c] font-semibold">{restaurant.usersRestaurant.name}</p>
                        <p className="text-gray-400 mt-2">{restaurant.usersRestaurant.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
