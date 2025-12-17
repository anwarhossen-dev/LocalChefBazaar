import React from "react";
import diningImage from "../../assets/About/Service1 (3).jpg"; // replace with your actual image path

const MissionSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center h-auto md:h-100 mt-6 sm:mt-8 md:mt-10 rounded-xl overflow-hidden shadow-lg">
                {/* ✅ Left Side — Mission Text */}
                <div className="bg-primary text-white flex flex-col justify-between p-6 sm:p-8 md:p-10 h-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">OUR MISSION</h2>
                    <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">A meal designed to be explored and experienced in the moment</p>
                </div>

                {/* ✅ Right Side — Dining Image */}
                <div className="">
                    <img src={diningImage} alt="Dining Area" className=" w-full h-[300px] sm:h-[350px] md:h-100 object-cover" />
                </div>
            </div>
        </section>
    );
};

export default MissionSection;