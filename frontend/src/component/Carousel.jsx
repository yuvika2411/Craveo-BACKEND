import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const meals = [
    { id: 1, name: "Pizza", image: "/images/Meals/pizza.jpg" },
    { id: 2, name: "Burger", image: "/images/Meals/burger.jpg" },
    { id: 3, name: "Pasta", image: "/images/Meals/pasta.jpg" },
    { id: 4, name: "Biryani", image: "/images/Meals/biryani.jpg" },
    { id: 5, name: "Cakes", image: "/images/Meals/cakes.jpg" },
    { id: 6, name: "Sandwich", image: "/images/Meals/sandwich.png" },
    { id: 7, name: "Momos", image: "/images/Meals/momos.jpg" },
    { id: 8, name: "Rolls", image: "/images/Meals/rolls.png" },
];

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        centerMode: true,
        centerPadding: "0px",
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 4 } },
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div>
            <Slider>
                {meals.map((meal) => (
                    <div key={meal.id}>
                        <img src={meal.image} alt={meal.name} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;