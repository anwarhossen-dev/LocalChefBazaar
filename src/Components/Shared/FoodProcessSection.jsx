import React from "react";
import img1 from "../../assets/About/Service3.jpg"
import img2 from "../../assets/About/Service4.jpg"
import img3 from "../../assets/About/Service5.jpg" ;

const FoodProcessSection = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-4 md:px-0">
            {/* ✅ Food Sourcing */}
            <div className="space-y-3">
                <img src={img1} alt="Food Sourcing" className="w-full h-64 object-cover rounded-xl shadow-md" />
                <h3 className="text-xl font-semibold text-center">Food Sourcing</h3>
            </div>

            {/* ✅ Menu Development */}
            <div className="space-y-3">
                <img src={img2} alt="Menu Development" className="w-full h-64 object-cover rounded-xl shadow-md" />
                <h3 className="text-xl font-semibold text-center">Menu Development</h3>
            </div>

            {/* ✅ Restaurant */}
            <div className="space-y-3">
                <img src={img3} alt="Restaurant" className="w-full h-64 object-cover rounded-xl shadow-md" />
                <h3 className="text-xl font-semibold text-center">Restaurant</h3>
            </div>
        </section>
    );
};

export default FoodProcessSection;