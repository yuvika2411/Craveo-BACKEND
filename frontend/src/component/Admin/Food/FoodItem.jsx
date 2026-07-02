import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox
} from '@mui/material';

import { createMenuItem, getMenuItemsByRestaurantId } from '../../State/Menu/Action';
import { getRestaurantCategory } from '../../State/Restaurant/Action';


export const FoodItem = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, menu } = useSelector(store => store);

  const [foodData, setFoodData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    isVegetarian: false,
    isSeasonal: false,
    available: true
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (restaurant.usersRestaurant?.id) {
      dispatch(getRestaurantCategory());

      dispatch(
        getMenuItemsByRestaurantId({
          restaurantId: restaurant.usersRestaurant.id,
          jwt
        })
      );
    }
  }, [dispatch, restaurant.usersRestaurant?.id, jwt]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFoodData({
      ...foodData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqData = new FormData();
    reqData.append("food", JSON.stringify({
      name: foodData.name,
      description: foodData.description,
      price: Number(foodData.price),
      categoryId: foodData.categoryId,
      restaurantId: restaurant.usersRestaurant.id,
      isVegetarian: foodData.isVegetarian,
      isSeasonal: foodData.isSeasonal,
      available: foodData.available
    }));

    if (selectedImage) {
      reqData.append("image", selectedImage);
    }

    await dispatch(createMenuItem({ reqData, jwt }));
    dispatch(
      getMenuItemsByRestaurantId({
        restaurantId: restaurant.usersRestaurant.id,
        jwt
      })
    );

    setFoodData({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      isVegetarian: false,
      isSeasonal: false,
      available: true
    });
    setSelectedImage(null);
    setImagePreview("");
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

        <TextField label="Food Name" name="name" value={foodData.name} onChange={handleChange} fullWidth required sx={inputStyle} />

        <TextField label="Price" name="price" type="number" value={foodData.price} onChange={handleChange} fullWidth required sx={inputStyle} />

        <TextField label="Description" name="description" value={foodData.description} onChange={handleChange} fullWidth multiline rows={3} required sx={inputStyle} />

        <TextField select label="Category" name="categoryId" value={foodData.categoryId} onChange={handleChange} fullWidth required sx={inputStyle}>
          {restaurant.categories?.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
          ))}
        </TextField>

        <div className="col-span-2">
          {imagePreview ? (
            <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-white/20">
              <img src={imagePreview} alt="food preview" className="w-full h-full object-cover" />
              <div
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-white font-bold hover:bg-red-700 shadow-md transition"
              >
                X
              </div>
            </div>
          ) : (
            <label className="w-full h-44 border-2 border-dashed border-[#ea580c] rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-[#151515] hover:bg-[#1c1c1c] transition">
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
              <div className="text-center">
                <div className="text-4xl mb-2 text-[#ea580c]">📷</div>
                <h3 className="text-white text-md font-semibold">Upload Food Image</h3>
                <p className="text-gray-400 text-xs mt-1">Single image file allowed</p>
              </div>
            </label>
          )}
        </div>



        <div className="flex flex-wrap gap-4 col-span-2">
          <FormControlLabel control={<Checkbox checked={foodData.isVegetarian} onChange={handleChange} name="isVegetarian" />} label="Vegetarian" />
          <FormControlLabel control={<Checkbox checked={foodData.isSeasonal} onChange={handleChange} name="isSeasonal" />} label="Seasonal" />
          <FormControlLabel control={<Checkbox checked={foodData.available} onChange={handleChange} name="available" />} label="Available" />
        </div>

        {menu.error && (
          <div className="col-span-2 bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-center text-sm font-semibold">
            {menu.error?.message || "Failed to create food item. Please try again."}
          </div>
        )}

        <div className="col-span-2">
          <Button type="submit" variant="contained" disabled={menu.loading} fullWidth sx={{ backgroundColor: '#ea580c', '&:hover': { backgroundColor: '#c2410c' } }}>
            {menu.loading ? "Adding..." : "Add Food Item"}
          </Button>
        </div>
      </form>
    </div>
  );
};