import React from 'react';
import Meal from '../../Components/Home/Meal';
import Banner from '../../Components/Banner/Banner';
import Review from '../../Components/Review/Review';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Meal></Meal>
            <Review></Review>
        </div>
    );
};

export default Home;