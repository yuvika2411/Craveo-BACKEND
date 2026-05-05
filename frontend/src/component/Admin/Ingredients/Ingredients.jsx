import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsOfRestaurant, updateStockOfIngredient } from '../../State/Ingredients/Action';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';

export const Ingredients = () => {
    const dispatch = useDispatch();
    const { restaurant, ingredient } = useSelector(store => store);

    useEffect(() => {
        if (restaurant.usersRestaurant?.id) {
            dispatch(getIngredientsOfRestaurant({ restaurantId: restaurant.usersRestaurant.id }));
        }
    }, [dispatch, restaurant.usersRestaurant]);

    const handleUpdateStock = (id) => {
        dispatch(updateStockOfIngredient({ id }));
    };

    return (
        <div className="bg-[#1a1a1a] p-8 rounded-xl border border-white/5 shadow-xl">
            <h1 className="text-3xl font-bold mb-6 text-white">Ingredients</h1>
            <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Table sx={{ minWidth: 650 }} aria-label="ingredients table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Availability</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(ingredient.ingredients) && ingredient.ingredients.map((item) => (
                            <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell sx={{ color: 'white' }}>{item.id}</TableCell>
                                <TableCell sx={{ color: 'white' }}>{item.name}</TableCell>
                                <TableCell sx={{ color: 'gray' }}>{item.category?.name}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={item.inStoke ? "In Stock" : "Out of Stock"} 
                                        color={item.inStoke ? "success" : "error"} 
                                        onClick={() => handleUpdateStock(item.id)}
                                        sx={{ cursor: 'pointer' }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        {(!Array.isArray(ingredient.ingredients) || ingredient.ingredients.length === 0) && (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ color: 'gray', py: 5 }}>
                                    No ingredients found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
