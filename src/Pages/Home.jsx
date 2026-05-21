import React from 'react';
import Navbar from '../Components/Shared/Navbar';
import NewHero from '../Components/Home/NewHero';
import PromoBanner from '../Components/Home/PromoBanner';
import TrendingDishes from '../Components/Home/TrendingDishes';
import LatestMeal from '../Components/Home/LeatestMeal';
import NearbyKitchens from '../Components/Home/NearbyKitchens';
import ChefSpotlight from '../Components/Home/ChefSpotlight';
import CommunityEvents from '../Components/Home/CommunityEvents';
import CTASection from '../Components/Home/CTASection';
import Footer from '../Components/Shared/Footer';

const Home = () => {
    return (
        <main className="min-h-screen bg-base-100 text-base-content transition-colors duration-300">
            <Navbar />
            <NewHero />
            <PromoBanner />
            <TrendingDishes />
            <LatestMeal />
            <NearbyKitchens />
            <ChefSpotlight />
            <CommunityEvents />
            <CTASection />
            <Footer />
        </main>
    );
};

export default Home;