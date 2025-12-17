// import React from 'react';
// import Meal from '../../Components/Home/Meal';
// import Banner from '../../Components/Banner/Banner';
// import Review from '../../Components/Review/Review';

// const Home = () => {
//     return (
//         <div>
//             <Banner></Banner>
//             <Meal></Meal>
//             <Review></Review>
//         </div>
//     );
// };

// export default Home;


import React from "react";
import HeroBanner from "../../Components/Home/HeroBanner";
import HeroOverlay from "../../Components/Home/HeroOverlay";
//import KitchenView from "../../Components/Home/KitchenView";
import LeatestMeal from "../../Components/Home/LeatestMeal";
import ReviewSection from "../../Components/Shared/ReviewSection";
import KitchenMagic from "../../Components/Home/KitchenMagic";

const Home = () => {
    return (
        <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16">
            <HeroBanner />
            <HeroOverlay />
            <LeatestMeal />
            <KitchenMagic />
            <ReviewSection />
        </div>
    );
};

export default Home;