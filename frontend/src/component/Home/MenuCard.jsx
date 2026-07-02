import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from "react-redux";
import { addItemToCart } from "../State/Cart/Action";

const MenuCard = ({ item }) => {

    const dispatch = useDispatch(); // ✅ IMPORTANT

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "https://b.zmtcdn.com/data/dish_photos/4fd/3f7e6e5ced71aabec7ee0b938f3cb4fd.jpg";
        return imagePath.startsWith("http") ? imagePath : `${import.meta.env.VITE_API_URL}${imagePath}`;
    };

    // ✅ ADD TO CART HANDLER
    const handleAddToCart = () => {
        console.log("Item clicked:", item);

        dispatch(addItemToCart({
            foodId: item?.id || item?._id, // backend compatibility
            quantity: 1
        }));
    };

    return (
        <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg border border-white/5 p-4 md:p-6 hover:border-white/20 transition-all duration-300">

            <div className="flex gap-4">
                <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] shrink-0 relative rounded-lg overflow-hidden group">
                    <img
                        src={getImageUrl(item?.images?.[0])}
                        alt={item?.name || "Dish"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start gap-2">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-white">
                                    {item?.name || "Burger"}
                                </h3>
                                <div className="text-gray-300 font-bold mt-1">
                                    ₹{item?.price || 499}
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-400 text-xs md:text-sm mt-3">
                            {item?.description || "Delicious food item"}
                        </p>
                    </div>

                    <div className="mt-4">
                        <Button
                            variant="contained"
                            onClick={handleAddToCart}
                            sx={{
                                backgroundColor: '#ea580c',
                                color: 'white',
                                fontWeight: 'bold',
                                padding: '6px 20px',
                                textTransform: 'none',
                                borderRadius: '8px',
                                '&:hover': { backgroundColor: '#c2410c' }
                            }}>
                            ADD TO CART
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuCard;
