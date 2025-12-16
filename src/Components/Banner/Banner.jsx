

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
//import { Carousel } from "react-responsive-carousel";
//import "react-responsive-carousel/lib/styles/carousel.min.css";

// Banner images
import bannerImg from '../../assets/Banner/banner.png';
import bannerImg1 from '../../assets/Banner/banner1.png';
import bannerImg2 from '../../assets/Banner/banner2.png';
import bannerImg3 from '../../assets/Banner/banner3.png';

// Chef images (ADD your own chef images here)
import chef1 from '../../assets/Banner/banner.png';
import chef2 from '../../assets/Banner/banner1.png';
import chef3 from '../../assets/Banner/banner2.png';
import chef4 from '../../assets/Banner/banner3.png';

import Marquee from "react-fast-marquee";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Banner = () => {
  // const [meals, setMeals] = useState([]);

  // // Fetch daily meals
  // useEffect(() => {
  //   axios
  //     .get("/api/meals?limit=6")
  //     .then((res) => {
  //       if (Array.isArray(res.data)) {
  //         setMeals(res.data);
  //       } else if (Array.isArray(res.data.meals)) {
  //         setMeals(res.data.meals);
  //       } else {
  //         setMeals([]);
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  const [meals, setMeals] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Fetch daily meals
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/latest-meals?limit=6`)
      .then((res) => setMeals(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch customer reviews
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/reviews?limit=6`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, []);

  const heroVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    // <div className="bg-base-100">

    //   {/* HERO SECTION */}
    //   <motion.section
    //     className="relative h-screen text-white"
    //     initial={{ opacity: 0 }}
    //     animate={{ opacity: 1 }}
    //     transition={{ duration: 1 }}
    //   >
    //     {/* CAROUSEL BACKGROUND */}
    //     <Carousel
    //       autoPlay
    //       infiniteLoop
    //       interval={4000}
    //       showThumbs={false}
    //       showStatus={false}
    //       showArrows={false}
    //       className="h-full"
    //     >
    //       <div>
    //         <img src={bannerImg} className="h-screen object-cover w-full" alt="banner" />
    //       </div>
    //       <div>
    //         <img src={bannerImg1} className="h-screen object-cover w-full" alt="banner" />
    //       </div>
    //       <div>
    //         <img src={bannerImg2} className="h-screen object-cover w-full" alt="banner" />
    //       </div>
    //       <div>
    //         <img src={bannerImg3} className="h-screen object-cover w-full" alt="banner" />
    //       </div>
    //     </Carousel>

    //     {/* TEXT OVERLAY */}
    //     <motion.div
    //       className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-40"
    //       initial={{ y: -40, opacity: 0 }}
    //       animate={{ y: 0, opacity: 1 }}
    //       transition={{ delay: 0.5, duration: 0.9 }}
    //     >
    //       <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
    //         Welcome to Local Chef Bazaar
    //       </h1>
    //       <p className="text-xl drop-shadow-md">
    //         Delicious meals delivered to your doorstep
    //       </p>

    //       <button className="mt-6 px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
    //         Explore Meals
    //       </button>
    //     </motion.div>
    //   </motion.section>

    //   {/* DAILY MEALS */}
    //   <section className="py-16 px-4 container mx-auto">
    //     <h2 className="text-3xl font-bold mb-8 text-center">Daily Meals</h2>

    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    //       {meals.length > 0 ? (
    //         meals.map((meal) => (
    //           <motion.div
    //             key={meal.id}
    //             className="bg-white rounded-xl shadow-lg overflow-hidden"
    //             whileHover={{ scale: 1.05 }}
    //           >

    //             <div className="p-4">
    //               <h3 className="text-xl font-semibold">{meal.name}</h3>
    //               <p className="text-gray-500">{meal.chefName}</p>
    //               <p className="mt-2 font-bold text-orange-600">${meal.price}</p>

    //               <button className="mt-4 w-full bg-primary text-white py-2 rounded hover:bg-primary-focus">
    //                 See Details
    //               </button>
    //             </div>
    //           </motion.div>
    //         ))
    //       ) : (
    //         <div className="text-center col-span-3">
    //           <LoadingSpinner />
    //         </div>

    //       )}
    //     </div>
    //   </section>

    //   {/* TOP CHEFS */}
    //   <section className="py-16 px-4 container mx-auto">
    //     <h2 className="text-3xl font-bold mb-8 text-center">Top Chefs</h2>

    //     <Marquee speed={40} pauseOnHover={true}>
    //       <div className="flex gap-10">
    //         {[chef1, chef2, chef3, chef4].map((img, i) => (
    //           <div key={i} className="bg-white p-6 rounded-xl shadow text-center w-64">
    //             <img
    //               src={img}
    //               alt={`Chef ${i + 1}`}
    //               className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
    //             />
    //             <h3 className="font-bold text-xl">Chef {i + 1}</h3>
    //             <p className="text-gray-500">Specialist in Italian cuisine</p>
    //           </div>
    //         ))}
    //       </div>
    //     </Marquee>
    //   </section>

    // </div>

    <div className="w-full overflow-x-hidden">

      {/* HERO / BANNER SECTION */}
      {/* <motion.section
        className="relative h-screen text-white"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <Carousel
          autoPlay
          infiniteLoop
          interval={4000}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          className="h-full"
        >
          {[bannerImg, bannerImg1, bannerImg2, bannerImg3].map((img, i) => (
            <div key={i}>
              <img src={img} alt={`banner ${i}`} className="h-screen w-full object-cover" />
            </div>
          ))}
        </Carousel>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-center px-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Welcome to <span className="text-orange-500">Local Chef Bazaar</span>
          </h1>
          <p className="text-xl md:text-2xl drop-shadow-md">
            Delicious meals delivered to your doorstep
          </p>
          <a
            href="/meals"
            className="mt-6 px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Explore Meals
          </a>
        </motion.div>
      </motion.section> */}

      <motion.section
        className="relative h-screen text-white"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <Carousel
          autoPlay
          infiniteLoop
          interval={4000}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          className="h-full"
        >
          {[bannerImg, bannerImg1, bannerImg2, bannerImg3].map((img, i) => (
            <div key={i} style={{ border: '2px ' }}>
              <img src={img} alt={`banner ${i}`} className="h-screen w-full object-cover" />
            </div>
          ))}

        </Carousel>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-40 text-center px-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Welcome to <span className="text-orange-500">Local Chef Bazaar</span>
          </h1>
          <p className="text-xl md:text-2xl drop-shadow-md">
            Delicious meals delivered to your doorstep
          </p>
          <a
            href="/meals"
            className="mt-6 px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Explore Meals
          </a>
        </motion.div>
      </motion.section>


      {/* DAILY MEALS SECTION */}
      <section className="py-16 px-4 container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Daily Meals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {meals.length > 0 ? (
            meals.map((meal) => (
              <motion.div
                key={meal._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <img src={meal.image} alt={meal.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{meal.name}</h3>
                  <p className="text-gray-500">{meal.chefName}</p>
                  <p className="mt-2 font-bold text-orange-600">${meal.price}</p>
                  <a
                    href={`/meals/${meal._id}`}
                    className="mt-4 inline-block w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
                  >
                    See Details
                  </a>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center col-span-3">
              <LoadingSpinner />
            </div>
          )}
        </div>
      </section>


      {/* EXTRA SECTION - TOP CHEFS */}
      <section className="py-16 px-4 container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Top Chefs</h2>
        <Marquee speed={40} pauseOnHover>
          <div className="flex gap-10">
            {[chef1, chef2, chef3, chef4].map((img, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow text-center w-64">
                <img
                  src={img}
                  alt={`Chef ${i + 1}`}
                  className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                />
                <h3 className="font-bold text-xl">Chef {i + 1}</h3>
                <p className="text-gray-500">Specialist in Italian cuisine</p>
              </div>
            ))}
          </div>
        </Marquee>
      </section>
    </div>
  );
};

export default Banner;
