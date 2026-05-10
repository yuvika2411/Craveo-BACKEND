import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantOrders, updateOrderStatus } from '../../State/Restaurant Order/Action';
import { Card, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export const Orders = () => {
    const dispatch = useDispatch();
    const { restaurant, restaurantOrder } = useSelector(store => store);
    const jwt = localStorage.getItem("jwt");
    const [filterValue, setFilterValue] = useState("ALL");

    useEffect(() => {
        if (jwt && restaurant.usersRestaurant?.id) {
            dispatch(fetchRestaurantOrders({
                restaurantId: restaurant.usersRestaurant.id,
                jwt: jwt
            }));
        }
    }, [jwt, restaurant.usersRestaurant?.id, dispatch]);

    const handleUpdateStatus = (orderId, newStatus) => {
        dispatch(updateOrderStatus({
            restaurantId: restaurant.usersRestaurant?.id,
            orderId: orderId,
            status: newStatus,
            jwt: jwt
        }));
    };

    const orderStatuses = ["PENDING", "COMPLETED", "OUT_FOR_DELIVERY", "DELIVERED"];

    const filteredOrders = filterValue === "ALL" 
        ? restaurantOrder.orders 
        : restaurantOrder.orders?.filter(order => order.orderStatus === filterValue);

    return (
        <div className="bg-[#1a1a1a] p-8 rounded-xl border border-white/5 shadow-xl min-h-[80vh]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Restaurant Orders</h1>
                    <p className="text-gray-400">Manage all incoming customer orders here.</p>
                </div>
                
                <FormControl variant="outlined" size="small" sx={{ minWidth: 150, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }}>
                    <InputLabel sx={{ color: 'gray' }}>Filter Status</InputLabel>
                    <Select
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        label="Filter Status"
                        sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'gray' } }}
                    >
                        <MenuItem value="ALL">All</MenuItem>
                        {orderStatuses.map(status => (
                            <MenuItem key={status} value={status}>{status}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div className="mt-8 space-y-4">
                {filteredOrders?.map(order => (
                    <Card key={order.id} sx={{ bgcolor: 'rgba(0,0,0,0.5)', p: 3, border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <Typography variant="h6" sx={{ color: '#ea580c', fontWeight: 'bold' }}>
                                    Order #{order.id}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                                    Customer: {order.customer?.fullName} | Total: ₹{order.totalAmount}
                                </Typography>
                                
                                <div className="space-y-1">
                                    {order.items?.map(item => (
                                        <Typography key={item.id} variant="body2">
                                            • {item.quantity}x {item.food?.name} (₹{item.totalPrice})
                                        </Typography>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <FormControl size="small" sx={{ minWidth: 160, bgcolor: 'rgba(255,255,255,0.05)' }}>
                                    <Select
                                        value={order.orderStatus || "PENDING"}
                                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                        sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' } }}
                                    >
                                        {orderStatuses.map(status => (
                                            <MenuItem key={status} value={status}>{status}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </Card>
                ))}

                {(!filteredOrders || filteredOrders.length === 0) && (
                    <div className="text-center py-10">
                        <Typography variant="h6" sx={{ color: 'gray' }}>No orders found.</Typography>
                    </div>
                )}
            </div>
        </div>
    );
};
