import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from 'react-redux';
import { getUsersOrders } from '../State/Order/Action';

const Orders = () => {
    const dispatch = useDispatch();
    const { order } = useSelector(store => store);
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        if (jwt) {
            dispatch(getUsersOrders(jwt));
        }
    }, [dispatch, jwt]);
    
  return (
    <div className="min-h-[80vh] bg-[#0f0f0f] flex flex-col">
        <h1 className="text-2xl font-bold text-white mb-6">Your Past Orders</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {order.orders?.map((orderItem) => (
                <OrderCard key={orderItem.id} order={orderItem} />
            ))}
        </div>
    </div>
  );
};

export default Orders;
