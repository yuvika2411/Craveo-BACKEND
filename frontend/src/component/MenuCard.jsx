import React, { useState } from 'react';
import { Button } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
                            <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#ea580c] transition-colors">
                                {item?.name || "Burgar"}
                            </h3>
                            <div className="text-gray-300 font-bold mt-1">₹{item?.price || 499}</div>
                        </div>
                        <button 
                            className="text-white hover:bg-white/10 p-1 rounded-full transition-colors shrink-0"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </button>
                    </div>
                    
                    <p className="text-gray-400 text-xs md:text-sm mt-3">
                        {item?.description || "A hamburger or simply burger is a food consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll"}
                    </p>
                </div>
            </div>

            <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                {displayIngredients && displayIngredients.length > 0 && (
                    <div className="flex flex-wrap gap-6 md:gap-10 pb-2">
                        {Object.entries(groupedIngredients).map(([category, items], idx) => (
                            <div key={idx} className="flex flex-col min-w-[120px]">
                                <h4 className="text-white font-medium text-sm mb-3 capitalize">{category}</h4>
                                <div className="flex flex-col gap-3">
                                    {items.map((ing, i) => (
                                        <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 bg-transparent border-2 border-gray-500 rounded-sm cursor-pointer appearance-none checked:bg-[#ea580c] checked:border-[#ea580c] relative before:content-[''] checked:before:absolute checked:before:inset-0 checked:before:m-auto checked:before:w-1.5 checked:before:h-2.5 checked:before:border-r-2 checked:before:border-b-2 checked:before:border-white checked:before:rotate-45 checked:before:-translate-y-px"
                                            />
                                            <span className="text-gray-300 text-sm whitespace-nowrap group-hover:text-white transition-colors select-none">
                                                {ing.ingredients || ing.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* hi */}
            <div className="mt-6 flex justify-start border-t border-white/5 pt-4">
                <Button 
                    variant="contained" 
                    sx={{ 
                        backgroundColor: '#ea580c',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '8px 24px',
                        textTransform: 'none',
                        borderRadius: '4px',
                        fontFamily: 'inherit',
                        letterSpacing: '0.5px',
                        '&:hover': { 
                            backgroundColor: '#c2410c',
                        } 
                    }}
                >
                    ADD TO CART
                </Button>
            </div>
        </div>
    );
};

export default MenuCard;
