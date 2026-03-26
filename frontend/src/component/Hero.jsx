import React from "react";

const Hero = () => {
    return (
        <section className="font-[Poppins] w-full min-h-screen pt-24 bg-[#0f0f0f] text-white flex items-center relative overflow-hidden">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0, 0, 0, 0.05),transparent_60%)]"></div>

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

                <div className="z-10">
                
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 ">
                        Delicious Food <br />
                        <span className="text-[#ea580c]">Near Your Town</span>
                    </h1>

                    <p className="text-gray-400 mb-8 max-w-md">
                        Experience the best dishes crafted with love and premium
                        ingredients. Fresh, tasty, and delivered fast to your doorstep.
                    </p>

                    <div className="flex gap-4">
                        <button className="bg-[#ea580c] px-6 py-3 rounded-full font-medium hover:bg-[#c2410c] transition shadow-lg shadow-[#ea580c]/30">
                            View All Restaurants
                        </button>
                    </div>
                </div>

                <div className="relative flex justify-center items-center">
                    <div className="absolute w-[350px] h-[350px] bg-[#ea580c]/20 blur-[120px] rounded-full"></div>

                    <img
                        src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                        alt="food"
                        className="relative w-[250px] md:w-[350px] aspect-square object-cover rounded-full drop-shadow-2xl border border-white/10"
                    />
                    <div className="absolute top-10 left-10 w-4 h-4 bg-red-500 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-10 right-10 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>

                </div>

            </div>
        </section>
    );
};

export default Hero;