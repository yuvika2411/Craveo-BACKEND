import React from "react";
import { useSelector } from "react-redux";
import RestaurantCard from "./RestaurantCard";

const Restaurant = () => {
    const { restaurants } = useSelector(store => store.restaurant);

    return (
        <section className="bg-[#0f0f0f] text-white px-6 py-10 min-h-screen">

            {/* <h1>{JSON.stringify(restaurants)}</h1> */}

            <h2 className="text-2xl font-semibold mb-6 ml-4 md:ml-20">
                Order From Our Handpicked Favorites
            </h2>

            <div className="flex flex-wrap justify-around gap-5 ml-20 mr-20">
                {restaurants?.map((item) => (
                    <RestaurantCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
};

export default Restaurant;