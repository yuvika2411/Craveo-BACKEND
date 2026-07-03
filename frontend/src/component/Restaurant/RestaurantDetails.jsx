import { Grid, Divider, Typography, IconButton, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import React, { useState, useEffect } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuCard from '../Home/MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantCategory } from '../State/Restaurant/Action';
import { getMenuItemsByRestaurantId } from '../State/Menu/Action';
// const { auth, restaurant, food } = useSelector(store => store);
import { getFoodByRestaurant } from '../State/Food/Action';
import { findCart } from '../State/Cart/Action';

const foodTypes = [
    { label: "All", value: "all" },
    { label: "Veg Only", value: "veg" },
    { label: "Non-Veg Only", value: "non-veg" },
    { label: "Seasonal", value: "seasonal" }
]

const RestaurantDetails = () => {
    const [foodType, setFoodType] = useState("all");
    const [foodCategory, setFoodCategory] = useState("all");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id, city } = useParams();
    const { auth, restaurant, menu, food } = useSelector(store => store);
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        if (id) {
            dispatch(getRestaurantById({ restaurantId: id }));
            dispatch(getRestaurantCategory({ restaurantId: id }));
            dispatch(getMenuItemsByRestaurantId({ restaurantId: id }));
            dispatch(getFoodByRestaurant({ restaurantId: id }));
            if (jwt) {
                dispatch(findCart());
            }
        }
    }, [id, jwt]);

    const handleFilterChange = (event) => {
        if (event.target.name === "foodType") {
            setFoodType(event.target.value);
        } else if (event.target.name === "foodCategory") {
            setFoodCategory(event.target.value);
        }
    };

    const filteredMenu = food.foods?.filter((item) => {
        const typeMatch =
            foodType === "all" ||
            (foodType === "veg"
                ? item.isVegetarian
                : foodType === "non-veg"
                    ? !item.isVegetarian
                    : item.isSeasonal === true);

        const categoryMatch =
            foodCategory === "all" ||
            item.foodCategory?.name === foodCategory;

        return typeMatch && categoryMatch;
    }) || [];

    const categoryOptions = restaurant.categories?.length > 0
        ? restaurant.categories
        : Array.from(
            new Map(
                (food.foods || [])
                    .filter((item) => item.foodCategory?.name)
                    .map((item) => [item.foodCategory.name, item.foodCategory])
            ).values()
        );

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "";
        return imagePath.startsWith("http") ? imagePath : `${import.meta.env.VITE_API_URL}${imagePath}`;
    };

    return (
        <div className='font-[Poppins] px-5 lg:px-20 pt-28 pb-10 min-h-screen bg-[#0f0f0f] text-white'>
            {/* Breadcrumb & Navigation */}
            <div className='flex items-center gap-4 pb-6'>
                <IconButton onClick={() => navigate("/")} className="hover:bg-gray-800 transition">
                    <ArrowBackIcon sx={{ color: 'white' }} />
                </IconButton>
                <h4 className='text-sm md:text-base font-medium text-gray-400'>
                    <span onClick={() => navigate("/")} className="hover:text-white cursor-pointer transition">Home</span> /
                    <span className="hover:text-white cursor-pointer transition"> {restaurant.restaurant?.address?.city || city}</span> /
                    <span className="hover:text-white cursor-pointer transition"> {restaurant.restaurant?.name}</span> /
                    <span className="text-gray-100"> {id}</span>
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
                                src={restaurant.restaurant?.images && restaurant.restaurant.images.length > 0 ? getImageUrl(restaurant.restaurant.images[0]) : ""}
                                alt={restaurant.restaurant?.name}
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

                            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex flex-wrap items-center gap-2">
                                <span className="bg-[#ea580c] text-white px-2 py-1 md:px-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide">Promoted</span>
                                <span className={restaurant.restaurant?.open ? "bg-green-600 text-white px-2 py-1 md:px-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide" : "bg-red-600 text-white px-2 py-1 md:px-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide"}>
                                    {restaurant.restaurant?.open ? "Open Now" : "Closed"}
                                </span>
                            </div>
                        </div>

                        {/* Side Images (Right, Up and Bottom) */}
                        <div className="w-1/3 flex flex-col gap-2">
                            <div className="h-1/2 overflow-hidden w-full group relative rounded-xl">
                                <img
                                    className='w-full h-full object-cover hover:scale-110 transition-transform duration-700 cursor-pointer filter brightness-90 hover:brightness-100'
                                    src={restaurant.restaurant?.images && restaurant.restaurant.images.length > 1 ? getImageUrl(restaurant.restaurant.images[1]) : ""}
                                    alt="Dish 1"
                                />
                            </div>
                            <div className="h-1/2 overflow-hidden w-full group relative rounded-xl">
                                <img
                                    className='w-full h-full object-cover hover:scale-110 transition-transform duration-700 cursor-pointer filter brightness-90 hover:brightness-100'
                                    src={restaurant.restaurant?.images && restaurant.restaurant.images.length > 2 ? getImageUrl(restaurant.restaurant.images[2]) : ""}
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
                                {restaurant.restaurant?.name}
                            </h3>
                            <p className='text-gray-400 mt-3 text-sm md:text-md max-w-3xl leading-relaxed'>
                                {restaurant.restaurant?.description}
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
                                <span className="text-gray-400 text-sm">
                                    {restaurant.restaurant?.address
                                        ? [restaurant.restaurant.address.street, restaurant.restaurant.address.city, restaurant.restaurant.address.state].filter(Boolean).join(", ") || "Address not available"
                                        : "Address not available"}
                                </span>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 bg-[#0f0f0f] hover:bg-[#151515] transition-colors p-5 rounded-xl border border-white/5 group'>
                            <div className="bg-[#ea580c]/10 p-4 rounded-full group-hover:bg-[#ea580c]/20 transition-colors">
                                <CalendarTodayIcon className="text-[#ea580c]" fontSize="medium" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-white mb-1">Opening Hours</h4>
                                <span className="text-gray-400 text-sm">{restaurant.restaurant?.openingHrs || "Mon - Sun (11:00 AM - 11:30 PM)"} </span>
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
                                        {categoryOptions?.map((item) => (
                                            <FormControlLabel
                                                key={item.id || item.name}
                                                value={item.name}
                                                control={<Radio sx={{ color: "gray", '&.Mui-checked': { color: '#ea580c' } }} />}
                                                label={<span className="font-[Poppins] text-gray-300">{item.name}</span>}
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