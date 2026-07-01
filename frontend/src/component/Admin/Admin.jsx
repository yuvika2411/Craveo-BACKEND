import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { Dashboard } from './Dashboard/Dashboard';
import { Orders } from './Orders/Orders';
import { FoodCategory } from './FoodCategory/FoodCategory';
import { Ingredients } from './Ingredients/Ingredients';
import { Events } from './Events/Events';
import { Details } from './Details/Details';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantsByUserId } from '../State/Restaurant/Action';
import { useEffect } from 'react';
import { CreateRestaurant } from './CreateRestaurant';
import { FoodManagement } from './Food/FoodManagement'; 
export const Admin = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant } = useSelector(store => store);

    useEffect(() => {
        if (jwt) {
            dispatch(getRestaurantsByUserId(jwt));
        }
    }, [dispatch, jwt]);

    return (
        <div className="font-[Poppins] min-h-screen bg-[#0f0f0f] text-white flex">
            <div className="w-[20%] sticky top-0 h-screen border-r border-white/10 bg-[#151515]">
                <AdminSidebar />
            </div>
            <div className="w-[80%] p-8">
                {restaurant.usersRestaurant ? (
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/orders' element={<Orders />} />
                        <Route path='/food' element={<FoodManagement />} />
                        <Route path='/category' element={<FoodCategory />} />
                        <Route path='/ingredients' element={<Ingredients />} />
                        <Route path='/events' element={<Events />} />
                        <Route path='/details' element={<Details />} />
                    </Routes>
                ) : (
                    <CreateRestaurant />
                )}
            </div>
        </div>
    );
};
