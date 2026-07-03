import React from "react";
import { useSelector } from "react-redux";
import RestaurantCard from "./RestaurantCard";

const Restaurant = () => {

    const { restaurants } =
        useSelector(store => store.restaurant);

    return (
        <section id="restaurants-section" className="bg-[#0f0f0f] text-white px-6 py-10 min-h-screen">

            <h2 className="text-2xl font-semibold mb-6 ml-4 md:ml-20">
                Order From Our Handpicked Favorites
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 md:px-20">

                {restaurants?.map((item) => (
                    <RestaurantCard
                        key={item.id}
                        item={item}
                    />
                ))}

            </div>

        </section>
    );
};

export default Restaurant;