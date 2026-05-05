import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantCategory, createCategoryAction } from '../../State/Restaurant/Action';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

export const FoodCategory = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant } = useSelector(store => store);
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        if (restaurant.usersRestaurant?.id) {
            dispatch(getRestaurantCategory({ restaurantId: restaurant.usersRestaurant.id, jwt }));
        }
    }, [dispatch, jwt, restaurant.usersRestaurant]);

    const handleCreateCategory = (e) => {
        e.preventDefault();
        if (newCategory.trim() && restaurant.usersRestaurant?.id) {
            const reqData = {
                name: newCategory.trim(),
                restaurantId: restaurant.usersRestaurant.id
            };
            dispatch(createCategoryAction({ reqData, jwt }));
            setNewCategory("");
        }
    };

    const inputStyle = {
        '& .MuiOutlinedInput-root': {
            color: 'white',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
            '&:hover fieldset': { borderColor: '#ea580c' },
            '&.Mui-focused fieldset': { borderColor: '#ea580c' },
        },
        '& .MuiInputLabel-root': { color: 'gray' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#ea580c' },
    };

    return (
        <div className="bg-[#1a1a1a] p-8 rounded-xl border border-white/5 shadow-xl">
            <h1 className="text-3xl font-bold mb-6 text-white">Food Categories</h1>
            
            <form onSubmit={handleCreateCategory} className="flex gap-4 mb-8">
                <TextField 
                    label="New Category Name" 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)} 
                    fullWidth 
                    sx={inputStyle} 
                />
                <Button 
                    type="submit" 
                    variant="contained" 
                    sx={{ backgroundColor: '#ea580c', '&:hover': { backgroundColor: '#c2410c' }, whiteSpace: 'nowrap' }}
                >
                    Add Category
                </Button>
            </form>

            <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Table sx={{ minWidth: 400 }} aria-label="category table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {restaurant.categories?.map((item) => (
                            <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell sx={{ color: 'gray' }}>{item.id}</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '500' }}>{item.name}</TableCell>
                            </TableRow>
                        ))}
                        {(!restaurant.categories || restaurant.categories.length === 0) && (
                            <TableRow>
                                <TableCell colSpan={2} align="center" sx={{ color: 'gray', py: 5 }}>
                                    No categories found. Create one above to get started.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
