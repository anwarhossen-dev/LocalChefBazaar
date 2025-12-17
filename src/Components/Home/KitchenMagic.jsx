
import React from "react";
import imgMain from "../../assets/KitchenView/Service3 (1).jpg";
import imgTopRight from "../../assets/KitchenView/Service1 (4).jpg";
import imgBottomRight from "../../assets/KitchenView/Service2 (1).jpg";

const KitchenMagic = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-8 sm:py-10 md:py-12">
            {/* ✅ Heading */}
            <div className="text-center mb-8 sm:mb-10 space-y-2 sm:space-y-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">Highlight</h2>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">The magic of the kitchen</h3>
                <p className="text-xs sm:text-sm md:text-base max-w-3xl mx-auto px-4">On cold winter nights, I like to brighten up our dinner table with a big, colorful mix of root veggies and hearty greens. On beautiful, warm days.</p>
            </div>

            {/* ✅ Collage Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {/* ✅ Left — Main Image */}
                <div>
                    <img src={imgMain} alt="Main Salad" className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover rounded-xl shadow-md" />
                </div>

                {/* ✅ Right — Two stacked images */}
                <div className="grid grid-rows-2 gap-4 sm:gap-5 md:gap-6">
                    <img src={imgTopRight} alt="Top Right Salad" className="w-full h-[145px] sm:h-[170px] md:h-[195px] object-cover rounded-xl shadow-md" />
                    <img src={imgBottomRight} alt="Bottom Right Salad" className="w-full h-[145px] sm:h-[170px] md:h-[195px] object-cover rounded-xl shadow-md" />
                </div>
            </div>
        </section>
    );
};

export default KitchenMagic;