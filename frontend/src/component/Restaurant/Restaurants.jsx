import React, { useState } from "react";
import { useSelector } from "react-redux";
import RestaurantCard from "./RestaurantCard";

const Restaurant = () => {
    const { restaurant } = useSelector(store => store);

    return (
        <section className="bg-[#0f0f0f] text-white px-6 py-10 min-h-screen">
            {/* Heading */}
            <h2 className="text-2xl font-semibold font-[Poppins] mb-6 ml-4 md:ml-20">
                Order From Our Handpicked Favorites
            </h2>

            {/* Cards */}
            <div className="flex flex-wrap items-center justify-around gap-5 ml-20 mr-20">
                {restaurant.restaurants?.map((item) => (
                    <RestaurantCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
};

export default Restaurant;