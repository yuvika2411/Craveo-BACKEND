import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuItemsByRestaurantId, deleteFoodItem, updateMenuItemAvailability } from '../../State/Menu/Action';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';

export const Menu = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant, menu } = useSelector(store => store);

    useEffect(() => {
        if (restaurant.usersRestaurant?.id) {
            dispatch(getMenuItemsByRestaurantId({ restaurantId: restaurant.usersRestaurant.id, jwt }));
        }
    }, [dispatch, jwt, restaurant.usersRestaurant]);

    const handleDelete = (id) => {
        dispatch(deleteFoodItem({ menuItemId: id, jwt }));
    };

    const handleUpdateAvailability = (id) => {
        dispatch(updateMenuItemAvailability({ menuItemId: id, jwt }));
    };

    return (
        <div className="bg-[#1a1a1a] p-8 rounded-xl border border-white/5 shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Restaurant Menu</h1>
            </div>
            
            <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Table sx={{ minWidth: 650 }} aria-label="menu table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Image</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Availability</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {menu.menuItems?.map((item) => (
                            <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>
                                    <img src={item.images?.[0]} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                                </TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.name}</TableCell>
                                <TableCell sx={{ color: 'gray' }}>{item.foodCategory?.name}</TableCell>
                                <TableCell sx={{ color: 'white' }}>₹{item.price}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={item.available ? "In Stock" : "Out of Stock"} 
                                        color={item.available ? "success" : "error"} 
                                        onClick={() => handleUpdateAvailability(item.id)}
                                        sx={{ cursor: 'pointer' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDelete(item.id)} color="error" variant="outlined" size="small">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {(!menu.menuItems || menu.menuItems.length === 0) && (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ color: 'gray', py: 5 }}>
                                    No menu items found. Click "Add New Item" to create one.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
