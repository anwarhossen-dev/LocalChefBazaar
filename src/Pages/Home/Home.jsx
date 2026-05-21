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
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import HeroBanner from "../../Components/Home/HeroBanner";
import HeroOverlay from "../../Components/Home/HeroOverlay";
//import KitchenView from "../../Components/Home/KitchenView";
import LatestMeal from "../../Components/Home/LeatestMeal";
import ReviewSection from "../../Components/Shared/ReviewSection";
import KitchenMagic from "../../Components/Home/KitchenMagic";
import ChefSpotlight from "../../Components/Home/ChefSpotlight";

const Home = () => {
    const axiosPublic = useAxiosPublic();

    const { data: meals = [] } = useQuery({
        queryKey: ["LeatestMeal"],
        queryFn: async () => {
            const res = await axiosPublic.get("/leatestMeals");
            return res.data;
        },
    });

    return (
        <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16">
            <HeroBanner />
            <HeroOverlay items={meals} />
            <LatestMeal />
            <ChefSpotlight />
            <KitchenMagic />
            <ReviewSection />
        </div>
    );
};

export default Home;