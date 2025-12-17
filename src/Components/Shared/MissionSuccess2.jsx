import React from "react";
import diningImage from "../../assets/About/Service2.jpg"; // replace with your actual image path

const MissionSection2 = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 items-center h-100 mt-10 rounded-xl overflow-hidden shadow-lg">
            <div className="">
                <img src={diningImage} alt="Dining Area" className=" w-full h-100 object-cover" />
            </div>

            {/* ✅ Left Side — Mission Text */}
            <div className="bg-primary text-white flex flex-col justify-between p-10 h-full">
                <h2 className="text-3xl  font-bold mb-4">OUR MISSION</h2>
                <p className="lg:text-5xl tex-lg">We’re not just a restaurant. We’re a cultural experience</p>
            </div>
        </section>
    );
};

export default MissionSection2;