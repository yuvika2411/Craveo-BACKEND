import React, { useState } from 'react';
import { Button } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch } from "react-redux";
import { addItemToCart } from "../State/Cart/Action";

const defaultIngredients = [
    { category: "Nuts & Seeds", ingredients: "Cashews" },
    { category: "Protein", ingredients: "Ground beef" },
    { category: "Protein", ingredients: "Bacon strips" },
    { category: "bread", ingredients: "Hamburger buns" },
    { category: "Vegetable", ingredients: "Lettuce" },
    { category: "Vegetable", ingredients: "Tomato slices" },
    { category: "Vegetable", ingredients: "Pickles" },
    { category: "Vegetable", ingredients: "Onion slices" }
];

const MenuCard = ({ item }) => {

    const dispatch = useDispatch(); // ✅ IMPORTANT

    const displayIngredients = item?.ingredients || defaultIngredients;
    const [isExpanded, setIsExpanded] = useState(false);

    const groupedIngredients = displayIngredients.reduce((acc, current) => {
        const category = current.category || "Other";
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(current);
        return acc;
    }, {});

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
                        src={item?.image || "https://b.zmtcdn.com/data/dish_photos/4fd/3f7e6e5ced71aabec7ee0b938f3cb4fd.jpg"}
                        alt={item?.name || "Dish"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>

                <div className="flex-1 flex flex-col justify-start">
                    <div className="flex justify-between items-start gap-2">
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-white">
                                {item?.name || "Burger"}
                            </h3>
                            <div className="text-gray-300 font-bold mt-1">
                                ₹{item?.price || 499}
                            </div>
                        </div>

                        <button
                            className="text-white hover:bg-white/10 p-1 rounded-full"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </button>
                    </div>

                    <p className="text-gray-400 text-xs md:text-sm mt-3">
                        {item?.description || "Delicious food item"}
                    </p>
                </div>
            </div>

            <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                {displayIngredients && displayIngredients.length > 0 && (
                    <div className="flex flex-wrap gap-6 md:gap-10 pb-2">
                        {Object.entries(groupedIngredients).map(([category, items], idx) => (
                            <div key={idx}>
                                <h4 className="text-white text-sm mb-2">{category}</h4>
                                {items.map((ing, i) => (
                                    <div key={i} className="text-gray-300 text-sm">
                                        {ing.ingredients || ing.name}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ✅ FIXED BUTTON */}
            <div className="mt-6 border-t pt-4">
                <Button
                    variant="contained"
                    onClick={handleAddToCart} // 🔥 MAIN FIX
                    sx={{
                        backgroundColor: '#ea580c',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '8px 24px',
                        textTransform: 'none',
                        borderRadius: '4px',
                        '&:hover': { backgroundColor: '#c2410c' }
                    }}>
                    ADD TO CART
                </Button>
            </div>
        </div>
    );
};

export default MenuCard;