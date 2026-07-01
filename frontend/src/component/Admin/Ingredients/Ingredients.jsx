import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getIngredientsOfRestaurant, 
    updateStockOfIngredient, 
    getIngredientCategory, 
    createIngredient, 
    createIngredientCategory 
} from '../../State/Ingredients/Action';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, 
    Button, Tabs, Tab, Box, Dialog, DialogTitle, DialogContent, DialogActions, 
    TextField, FormControl, InputLabel, Select, MenuItem 
} from '@mui/material';

export const Ingredients = () => {
    const dispatch = useDispatch();
    const { restaurant, ingredient } = useSelector(store => store);
    const [activeTab, setActiveTab] = useState(0);

    // Modals state
    const [openIngredientModal, setOpenIngredientModal] = useState(false);
    const [openCategoryModal, setOpenCategoryModal] = useState(false);

    // Forms state
    const [categoryName, setCategoryName] = useState("");
    const [ingredientData, setIngredientData] = useState({
        name: "",
        categoryId: ""
    });

    useEffect(() => {
        if (restaurant.usersRestaurant?.id) {
            dispatch(getIngredientsOfRestaurant({ restaurantId: restaurant.usersRestaurant.id }));
            dispatch(getIngredientCategory({ restaurantId: restaurant.usersRestaurant.id }));
        }
    }, [dispatch, restaurant.usersRestaurant]);

    const handleUpdateStock = (id) => {
        dispatch(updateStockOfIngredient({ id }));
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleCreateCategory = (e) => {
        e.preventDefault();
        if (!categoryName.trim()) return;
        dispatch(createIngredientCategory({
            name: categoryName.trim(),
            restaurantId: restaurant.usersRestaurant.id
        }));
        setCategoryName("");
        setOpenCategoryModal(false);
    };

    const handleCreateIngredient = (e) => {
        e.preventDefault();
        if (!ingredientData.name.trim() || !ingredientData.categoryId) return;
        dispatch(createIngredient({
            name: ingredientData.name.trim(),
            categoryId: ingredientData.categoryId,
            restaurantId: restaurant.usersRestaurant.id
        }));
        setIngredientData({ name: "", categoryId: "" });
        setOpenIngredientModal(false);
    };

    const dialogInputStyle = {
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">Ingredients Management</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage ingredient items and ingredient categories</p>
                </div>
                <div className="flex gap-3">
                    <Button 
                        variant="outlined" 
                        onClick={() => setOpenCategoryModal(true)}
                        sx={{ 
                            color: '#ea580c', 
                            borderColor: '#ea580c', 
                            textTransform: 'none',
                            fontWeight: 'bold',
                            '&:hover': { borderColor: '#c2410c', backgroundColor: 'rgba(234, 88, 12, 0.08)' } 
                        }}
                    >
                        Add Category
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={() => setOpenIngredientModal(true)}
                        sx={{ 
                            backgroundColor: '#ea580c', 
                            textTransform: 'none',
                            fontWeight: 'bold',
                            color: 'white',
                            '&:hover': { backgroundColor: '#c2410c' } 
                        }}
                    >
                        Add Ingredient
                    </Button>
                </div>
            </div>

            <Box sx={{ borderBottom: 1, borderColor: 'rgba(255,255,255,0.1)', mb: 4 }}>
                <Tabs 
                    value={activeTab} 
                    onChange={handleTabChange} 
                    aria-label="ingredients tabs"
                    textColor="inherit"
                    TabIndicatorProps={{ style: { backgroundColor: '#ea580c' } }}
                >
                    <Tab label="Ingredients List" sx={{ color: 'gray', '&.Mui-selected': { color: 'white', fontWeight: 'bold' } }} />
                    <Tab label="Ingredient Categories" sx={{ color: 'gray', '&.Mui-selected': { color: 'white', fontWeight: 'bold' } }} />
                </Tabs>
            </Box>

            {activeTab === 0 ? (
                <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.1)', boxShadow: 'none' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="ingredients table">
                        <TableHead>
                            <TableRow sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
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
                                    <TableCell sx={{ color: 'gray' }}>{item.category?.name || "N/A"}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={item.inStock ? "In Stock" : "Out of Stock"} 
                                            color={item.inStock ? "success" : "error"} 
                                            onClick={() => handleUpdateStock(item.id)}
                                            sx={{ cursor: 'pointer', fontWeight: 'semibold' }}
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
            ) : (
                <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.1)', boxShadow: 'none' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="categories table">
                        <TableHead>
                            <TableRow sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(ingredient.ingredientCategories) && ingredient.ingredientCategories.map((cat) => (
                                <TableRow key={cat.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell sx={{ color: 'white' }}>{cat.id}</TableCell>
                                    <TableCell sx={{ color: 'white' }}>{cat.name}</TableCell>
                                </TableRow>
                            ))}
                            {(!Array.isArray(ingredient.ingredientCategories) || ingredient.ingredientCategories.length === 0) && (
                                <TableRow>
                                    <TableCell colSpan={2} align="center" sx={{ color: 'gray', py: 5 }}>
                                        No categories found. Click "Add Category" to create one.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Dialog for Add Category */}
            <Dialog 
                open={openCategoryModal} 
                onClose={() => setOpenCategoryModal(false)}
                PaperProps={{
                    sx: { backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', minWidth: '350px' }
                }}
            >
                <DialogTitle sx={{ color: 'white', fontWeight: 'bold' }}>Create Ingredient Category</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleCreateCategory} sx={{ mt: 2 }}>
                        <TextField
                            label="Category Name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            fullWidth
                            required
                            sx={dialogInputStyle}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={() => setOpenCategoryModal(false)} sx={{ color: 'gray' }}>Cancel</Button>
                    <Button 
                        onClick={handleCreateCategory} 
                        variant="contained" 
                        sx={{ backgroundColor: '#ea580c', '&:hover': { backgroundColor: '#c2410c' } }}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Add Ingredient */}
            <Dialog 
                open={openIngredientModal} 
                onClose={() => setOpenIngredientModal(false)}
                PaperProps={{
                    sx: { backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', minWidth: '400px' }
                }}
            >
                <DialogTitle sx={{ color: 'white', fontWeight: 'bold' }}>Create Ingredient Item</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleCreateIngredient} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            label="Ingredient Name"
                            value={ingredientData.name}
                            onChange={(e) => setIngredientData({ ...ingredientData, name: e.target.value })}
                            fullWidth
                            required
                            sx={dialogInputStyle}
                        />
                        <FormControl fullWidth required sx={dialogInputStyle}>
                            <InputLabel id="category-select-label" sx={{ color: 'gray' }}>Category</InputLabel>
                            <Select
                                labelId="category-select-label"
                                label="Category"
                                value={ingredientData.categoryId}
                                onChange={(e) => setIngredientData({ ...ingredientData, categoryId: e.target.value })}
                                sx={{ color: 'white' }}
                                MenuProps={{
                                    PaperProps: { sx: { backgroundColor: '#1a1a1a', color: 'white' } }
                                }}
                            >
                                {ingredient.ingredientCategories?.map((cat) => (
                                    <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={() => setOpenIngredientModal(false)} sx={{ color: 'gray' }}>Cancel</Button>
                    <Button 
                        onClick={handleCreateIngredient} 
                        variant="contained" 
                        sx={{ backgroundColor: '#ea580c', '&:hover': { backgroundColor: '#c2410c' } }}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
