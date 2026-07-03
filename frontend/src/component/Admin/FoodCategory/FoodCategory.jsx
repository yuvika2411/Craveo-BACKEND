import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantCategory, createCategoryAction, deleteCategoryAction } from '../../State/Restaurant/Action';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const FoodCategory = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant } = useSelector(store => store);
    const [newCategory, setNewCategory] = useState("");
    
    // States for custom delete confirmation dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    useEffect(() => {
        if (restaurant.usersRestaurant?.id) {
            dispatch(getRestaurantCategory());
        }
    }, [restaurant.usersRestaurant?.id]);

    const handleCreateCategory = async (e) => {
        e.preventDefault();

        if (newCategory.trim() && restaurant.usersRestaurant?.id) {
            const reqData = {
                name: newCategory.trim(),
                restaurantId: restaurant.usersRestaurant.id
            };

            await dispatch(createCategoryAction({ reqData, jwt }));
            dispatch(getRestaurantCategory());
            setNewCategory("");
        }
    };

    const openDeleteDialog = (categoryId) => {
        setCategoryToDelete(categoryId);
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setCategoryToDelete(null);
        setDeleteDialogOpen(false);
    };

    const confirmDeleteCategory = () => {
        if (categoryToDelete) {
            dispatch(deleteCategoryAction({ categoryId: categoryToDelete, jwt }));
        }
        closeDeleteDialog();
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
                            <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {restaurant.categories?.map((item) => (
                            <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell sx={{ color: 'gray' }}>{item.id}</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: '500' }}>{item.name}</TableCell>
                                <TableCell align="right">
                                    <IconButton 
                                        onClick={() => openDeleteDialog(item.id)} 
                                        sx={{ color: '#ef4444', '&:hover': { color: '#b91c1c' } }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {(!restaurant.categories || restaurant.categories.length === 0) && (
                            <TableRow>
                                <TableCell colSpan={3} align="center" sx={{ color: 'gray', py: 5 }}>
                                    No categories found. Create one above to get started.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Custom Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={closeDeleteDialog}
                PaperProps={{
                    sx: {
                        backgroundColor: '#1a1a1a',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '12px'
                    }
                }}
            >
                <DialogTitle sx={{ color: 'white', fontWeight: 'bold' }}>
                    Confirm Deletion
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: '#a3a3a3' }}>
                        Are you sure you want to delete this category? All food items belonging to this category will have their category associations cleared.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ gap: '10px', mt: 2 }}>
                    <Button 
                        onClick={closeDeleteDialog} 
                        sx={{ 
                            color: 'white', 
                            textTransform: 'none', 
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } 
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={confirmDeleteCategory} 
                        variant="contained"
                        sx={{ 
                            backgroundColor: '#ea580c', 
                            textTransform: 'none',
                            fontWeight: 'bold',
                            '&:hover': { backgroundColor: '#c2410c' } 
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
