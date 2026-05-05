import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox
} from '@mui/material';

import { createMenuItem } from '../../State/Menu/Action';
import { getRestaurantCategory } from '../../State/Restaurant/Action';

export const FoodItem = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector(store => store);

  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    image: "",
    isVegetarian: false,
    isSeasonal: false,
    available: true,
    ingredients: ""
  });

  useEffect(() => {
    if (restaurant.usersRestaurant?.id) {
      dispatch(getRestaurantCategory());
    }
  }, [restaurant.usersRestaurant?.id]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFoodData({
      ...foodData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqData = {
      ...foodData,
      price: Number(foodData.price),
      images: [foodData.image],
      ingredients: foodData.ingredients.split(","),
      restaurantId: restaurant.usersRestaurant.id,
      categoryId: foodData.categoryId
    };

    await dispatch(createMenuItem({ reqData, jwt }));

    setFoodData({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      image: "",
      isVegetarian: false,
      isSeasonal: false,
      available: true,
      ingredients: ""
    });
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
      <h1 className="text-3xl font-bold mb-6 text-white">Add Food Item</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <TextField label="Food Name" name="name" value={foodData.name} onChange={handleChange} fullWidth sx={inputStyle} />

        <TextField label="Price" name="price" type="number" value={foodData.price} onChange={handleChange} fullWidth sx={inputStyle} />

        <TextField label="Description" name="description" value={foodData.description} onChange={handleChange} fullWidth multiline rows={3} sx={inputStyle} />

        <TextField select label="Category" name="categoryId" value={foodData.categoryId} onChange={handleChange} fullWidth sx={inputStyle}>
          {restaurant.categories?.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
          ))}
        </TextField>

        <TextField label="Image URL" name="image" value={foodData.image} onChange={handleChange} fullWidth sx={inputStyle} />

        <TextField label="Ingredients (comma separated)" name="ingredients" value={foodData.ingredients} onChange={handleChange} fullWidth sx={inputStyle} />

        <div className="flex flex-wrap gap-4 col-span-2">
          <FormControlLabel control={<Checkbox checked={foodData.isVegetarian} onChange={handleChange} name="isVegetarian" />} label="Vegetarian" />
          <FormControlLabel control={<Checkbox checked={foodData.isSeasonal} onChange={handleChange} name="isSeasonal" />} label="Seasonal" />
          <FormControlLabel control={<Checkbox checked={foodData.available} onChange={handleChange} name="available" />} label="Available" />
        </div>

        <div className="col-span-2">
          <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: '#ea580c', '&:hover': { backgroundColor: '#c2410c' } }}>
            Add Food Item
          </Button>
        </div>
      </form>
    </div>
  );
};