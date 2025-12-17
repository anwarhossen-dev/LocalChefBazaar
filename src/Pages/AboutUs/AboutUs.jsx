import React from "react";
import MissionSection from "../../Components/Shared/MissionSection";
import MissionSection2 from "../../Components/Shared/MissionSuccess2";
import FoodProcessSection from "../../Components/Shared/FoodProcessSection";

const AboutUs = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:space-y-10 md:space-y-12">
            <h3 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mt-4 sm:mt-6">About Us</h3>
            <div className="rounded-xl">
                <MissionSection />
            </div>

            <div className="space-y-4 sm:space-y-5 text-center md:text-left px-2 sm:px-4">
                <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug">
                        We make a small, intimate, and inviting <br className="hidden md:block" />
                        space for an unforgettable meal
                    </h2>
                </div>

                <div className="md:ml-8 lg:ml-20">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold leading-relaxed opacity-90">
                        Convert leads into customers and then turn those customers into loyal fans of your <br className="hidden md:block" />
                        brand by leveraging next-generation automation and AI. Yes, it really can be <br className="hidden md:block" />
                        automated, and no, you're not dreaming.
                    </h3>
                </div>
            </div>

            <div className="rounded-xl">
                <MissionSection2 />
            </div>

            <div className="space-y-4 sm:space-y-5 text-center md:text-left px-2 sm:px-4">
                <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug">
                        Immerse Yourself in an experience that <br className="hidden md:block" />
                        transcends the ordinary dining out.
                    </h2>
                </div>

                <div className="md:ml-8 lg:ml-20">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold leading-relaxed opacity-90">
                        In a world where the long-and short-term effects of climate change pose major <br className="hidden md:block" />
                        chalanges for farmers,the need for regenarative food system has never been more <br className="hidden md:block" />
                        importamnt. That's why we've made a promise to do more for the planet, by taking less.
                        <br className="hidden md:block" />. Our plant-forward menu means that we're already on average 30% less carbon
                        <br className="hidden md:block" /> intensive than the average American meal.
                    </h3>
                </div>
            </div>
            <div>
                <FoodProcessSection />
            </div>
        </div>
    );
};

export default AboutUs;