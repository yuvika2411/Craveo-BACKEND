import React from "react";
import Slider from "react-slick";
const SlickSlider = typeof Slider === 'function' ? Slider : Slider.default;

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const meals = [
    { id: 1, name: "Cakes", image: "/images/Meals/cakes.jpg" },
    { id: 2, name: "Pizza", image: "/images/Meals/pizza.jpg" },
    { id: 3, name: "Burger", image: "/images/Meals/burger.jpg" },
    { id: 4, name: "Sandwich", image: "/images/Meals/sandwich.png" },
    { id: 5, name: "Pasta", image: "/images/Meals/pasta.jpg" },
    { id: 6, name: "Momos", image: "/images/Meals/momos.jpg" },
    { id: 7, name: "Biryani", image: "/images/Meals/biryani.jpg" },
    { id: 8, name: "Rolls", image: "/images/Meals/rolls.png" },
];

const Carousel = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        centerMode: false,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 5 } },
            { breakpoint: 1024, settings: { slidesToShow: 4 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 640, settings: { slidesToShow: 2 } },
        ],
    };

    return (
        <section className="w-full bg-[#0f0f0f] text-white py-10 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <h2 className="text-2xl font-semibold mb-6 font-[Poppins] ml-4 md:ml-20">Top Meals</h2>

                {/* Custom Arrow Styling */}
                <style>
                    {`
                        /* Position arrows in the gap created by padding */
                        .slick-prev { left: -35px; z-index: 10; }
                        .slick-next { right: -35px; z-index: 10; }
                    `}
                </style>

                {/* Container to create space bounded for arrows while squeezing images closer */}
                <div className="px-10 md:px-14">
                    <SlickSlider {...settings}>
                        {meals.map((meal) => (
                            <div key={meal.id} className="px-2 text-center outline-none">

                                {/* Circle Image */}
                                <div className="w-32 h-32 md:w-36 md:h-36 lg:w-38 lg:h-38 mx-auto">
                                    <img
                                        src={meal.image}
                                        alt={meal.name}
                                        className="w-full h-full object-cover rounded-full border-2 border-gray-700 hover:scale-105 transition duration-300"
                                    />
                                </div>

                                {/* Name */}
                                <p className="mt-4 text-sm text-gray-300 font-medium font-[Poppins]">
                                    {meal.name}
                                </p>

                            </div>
                        ))}
                    </SlickSlider>
                </div>
            </div>
        </section>
    );
};

export default Carousel;