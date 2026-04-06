import { Grid, Divider, Typography, IconButton, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import React, { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuCard from './MenuCard';

const dummyMenu = [
    { id: 1, name: "Margherita Pizza", price: 299, rating: 4.5, type: "veg", category: "Pizza", image: "/images/Meals/pizza.jpg", description: "Classic delight with 100% real mozzarella cheese." },
    { id: 2, name: "Veg Burger", price: 149, rating: 4.0, type: "veg", category: "Burger", image: "/images/Meals/burger.jpg", description: "Crispy veg patty with fresh lettuce, tomatoes, and creamy mayo." },
    { id: 3, name: "Chicken Biryani", price: 349, rating: 4.8, type: "non-veg", category: "Biryani", image: "/images/Meals/biryani.jpg", description: "Aromatic basmati rice cooked with tender chicken and authentic spices." },
    { id: 4, name: "Paneer Sandwich", price: 129, rating: 4.1, type: "veg", category: "Sandwich", image: "/images/Meals/sandwich.jpg", description: "Grilled sandwich loaded with seasoned paneer and veggies." },
    { id: 5, name: "Momos Platter", price: 199, rating: 4.3, type: "veg", category: "Momos", image: "/images/Meals/momos.jpg", description: "Steamed savory dumplings served with spicy garlic chutney." }
];
const categories = [
    'Pizza',
    "Burger",
    "Biryani",
    "Rice",
    "Sandwich",
    "Momos",
    "Pasta",
    "Noodles",
    "Dessert",
    "Beverage"
]

const foodTypes = [
    { label: "All", value: "all" },
    { label: "Veg Only", value: "veg" },
    { label: "Non-Veg Only", value: "non-veg" },
    { label: "Seasonal", value: "seasonal" }
]

const RestaurantDetails = () => {
    const [foodType, setFoodType] = useState("all");
    const [foodCategory, setFoodCategory] = useState("all");

    const handleFilterChange = (event) => {
        if (event.target.name === "foodType") {
            setFoodType(event.target.value);
        } else if (event.target.name === "foodCategory") {
            setFoodCategory(event.target.value);
        }
    };

    const filteredMenu = dummyMenu.filter((item) => {
        const typeMatch = foodType === "all" || item.type === foodType;
        const categoryMatch = foodCategory === "all" || item.category === foodCategory;
        return typeMatch && categoryMatch;
    });
    return (
        <div className='font-[Poppins] px-5 lg:px-20 pt-28 pb-10 min-h-screen bg-[#0f0f0f] text-white'>
            {/* Breadcrumb & Navigation */}
            <div className='flex items-center gap-4 pb-6'>
                <IconButton className="hover:bg-gray-800 transition">
                    <ArrowBackIcon sx={{ color: 'white' }} />
                </IconButton>
                <h4 className='text-sm md:text-base font-medium text-gray-400'>
                    <span className="hover:text-white cursor-pointer transition">Home</span> /
                    <span className="hover:text-white cursor-pointer transition"> India</span> /
                    <span className="hover:text-white cursor-pointer transition"> Indian Fast Food</span> /
                    <span className="text-gray-100"> 3</span>
                </h4>
            </div>

            <section>
                {/* Modern Image Gallery Container */}
                <div className='rounded-2xl overflow-hidden shadow-2xl mb-8 border border-white/5 bg-[#1a1a1a]'>
                    <div className="flex h-[35vh] md:h-[60vh] gap-2 p-1">
                        {/* Main Image (Left) */}
                        <div className="w-2/3 relative group overflow-hidden rounded-xl">
                            <img
                                className='w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer'
                                src="https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/v1665003605/fd1deb8booe9mjpz68xa.jpg"
                                alt="Restaurant Banner"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

                            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex flex-wrap items-center gap-2">
                                <span className="bg-[#ea580c] text-white px-2 py-1 md:px-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide">Promoted</span>
                                <span className="bg-green-600 text-white px-2 py-1 md:px-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide">Open Now</span>
                            </div>
                        </div>

                        {/* Side Images (Right, Up and Bottom) */}
                        <div className="w-1/3 flex flex-col gap-2">
                            <div className="h-1/2 overflow-hidden w-full group relative rounded-xl">
                                <img
                                    className='w-full h-full object-cover hover:scale-110 transition-transform duration-700 cursor-pointer filter brightness-90 hover:brightness-100'
                                    src="https://b.zmtcdn.com/data/reviews_photos/2bb/ccf3225e7ebc86a630a83d2a4b87c2bb_1647014102.jpg?fit=around|750:500&crop=750:500;*,*"
                                    alt="Dish 1"
                                />
                            </div>
                            <div className="h-1/2 overflow-hidden w-full group relative rounded-xl">
                                <img
                                    className='w-full h-full object-cover hover:scale-110 transition-transform duration-700 cursor-pointer filter brightness-90 hover:brightness-100'
                                    src="https://www.tripsavvy.com/thmb/jD7jDeRl42lJvbYbfDOk_R9NKHE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-913677156-3fca0dd4029849ab912cd48cfec4a4db.jpg"
                                    alt="Dish 2"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                                    <span className="text-white font-bold text-xs md:text-lg underline decoration-2 underline-offset-4 text-center">View All Photos</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Info Card */}
                <div className='font-[Poppins] bg-[#1a1a1a]/90 backdrop-blur-xl rounded-bl-2xl rounded-br-2xl p-6 md:p-10 shadow-2xl -mt-10 mx-2 md:mx-0 relative z-10 border border-white/10 '>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex-1">
                            <h3 className=' font-[Poppins] font-semibold text-2xl md:text-4xl tracking-wide text-white'>
                                Indian Fast Food
                            </h3>
                            <p className='text-gray-400 mt-3 text-sm md:text-md max-w-3xl leading-relaxed'>
                                Dive into the authentic flavors of India! We offer a diverse menu featuring classic fast food with a spicy, traditional twist. Savor our signature street food delicacies, carefully crafted by experienced chefs.
                            </p>
                        </div>

                        <div className="flex flex-col md:items-end gap-2 shrink-0 bg-[#242424] p-4 rounded-xl border border-white/5">
                            <div className="flex items-center gap-1 text-green-500">
                                <span className="font-bold text-3xl">4.5</span>
                                <StarIcon fontSize="large" />
                            </div>
                            <span className="text-gray-400 text-sm font-medium border-b border-gray-600 pb-1">1.2k+ Delivery Ratings</span>
                            <span className="text-gray-500 text-xs mt-1">Cost for two: ₹400</span>
                        </div>
                    </div>

                    <Divider className="bg-white/10 my-8" />
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='flex items-center gap-5 bg-[#0f0f0f] hover:bg-[#151515] transition-colors p-5 rounded-xl border border-white/5 group'>
                            <div className="bg-[#ea580c]/10 p-4 rounded-full group-hover:bg-[#ea580c]/20 transition-colors">
                                <LocationOnIcon className="text-[#ea580c]" fontSize="medium" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-white mb-1">Outlet Location</h4>
                                <span className="text-gray-400 text-sm">123 Main Street, Phase 4, Mumbai, Maharashtra</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 bg-[#0f0f0f] hover:bg-[#151515] transition-colors p-5 rounded-xl border border-white/5 group'>
                            <div className="bg-[#ea580c]/10 p-4 rounded-full group-hover:bg-[#ea580c]/20 transition-colors">
                                <CalendarTodayIcon className="text-[#ea580c]" fontSize="medium" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-white mb-1">Opening Hours</h4>
                                <span className="text-gray-400 text-sm">Mon - Sun (11:00 AM - 11:30 PM) </span>
                            </div>
                        </div>
                    </div>
                    <Divider />


                </div>
                {/* hi */}
                <section className="mt-12 lg:mt-20 lg:flex relative font-[Poppins]">
                    <div className="space-y-10 lg:w-[20%] filter">
                        <div className='box space-y-5 lg:sticky top-28 font-[Poppins]'>
                            <div className='font-[Poppins]'>
                                <div className='text-xl font-semibold text-white pb-2 '>
                                    Food Type
                                </div>

                                <FormControl className="py-10 space-y-5" component={"fieldset"}>
                                    <RadioGroup onChange={handleFilterChange} name="foodType" value={foodType || "all"}>
                                        {foodTypes.map((item) => (
                                            <FormControlLabel
                                                key={item.value}
                                                value={item.value}
                                                control={<Radio sx={{ color: "gray", '&.Mui-checked': { color: '#ea580c' } }} />}
                                                label={<span className="font-[Poppins] text-gray-300">{item.label}</span>}
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div>
                                <div className='text-xl font-semibold text-white pb-2'>
                                    Food Category
                                </div>

                                <FormControl className="py-10 space-y-5" component={"fieldset"}>
                                    <RadioGroup onChange={handleFilterChange} name="foodCategory" value={foodCategory}>
                                        <FormControlLabel
                                            value="all"
                                            control={<Radio sx={{ color: "gray", '&.Mui-checked': { color: '#ea580c' } }} />}
                                            label={<span className="font-[Poppins] text-gray-300">All</span>}
                                        />
                                        {categories.map((item) => (
                                            <FormControlLabel
                                                key={item}
                                                value={item}
                                                control={<Radio sx={{ color: "gray", '&.Mui-checked': { color: '#ea580c' } }} />}
                                                label={<span className="font-[Poppins] text-gray-300">{item}</span>}
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items Space */}
                    <div className="space-y-5 lg:w-[80%] lg:pl-10 pb-10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white border-b-2 border-[#ea580c] pb-2 inline-block">Order Online</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {filteredMenu.map((item) => (
                                <MenuCard key={item.id} item={item} />
                            ))}
                            {filteredMenu.length === 0 && (
                                <div className="col-span-full py-20 text-center text-gray-400 border border-white/5 bg-[#151515] rounded-xl shadow-inner">
                                    <h3 className="text-xl font-bold mb-2">No items found</h3>
                                    <p>Try changing your filters to see more dishes.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}

export default RestaurantDetails;