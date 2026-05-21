// import React, { useRef } from 'react';
// import { Link } from 'react-router-dom';

// const TrendingDishes = () => {
//     const scrollRef = useRef(null);

//     const dishes = [
//         {
//             id: 1,
//             name: "Harvest Buddha Bowl",
//             price: "$14.50",
//             image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbhYIBjQbKFJEQ2KD5_OOyoIzNDyUdy2TzwBFlDhf4C6hRNezRfCjeAqVJbQe3QvE1UeBbUI-O7juBA46AW-moJ-BcPHFzU-osYcRpPbBrczJHoJRe3unBPCx-yY8T1F9FNAKgwLYXp7k3GG5vewtB8AqLn_13SShUjfqRLxED-BCTLH8PGt04gbuBZLJ7McD8s-2qh_n01QESXLiaVZxNLSMVc3tWzWFi1tHXj-AhLp7nZaligP-AOM7HnCMKGgGA4Ba1L9DJbNI"
//         },
//         {
//             id: 2,
//             name: "Black Truffle Pizza",
//             price: "$22.00",
//             image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAulrEMVwIsifc2pVvIEuKuPzv608r_BMJl0UL36tq8yJD2dNb5lBPoLiDfkU-KI7UR2j76TxEKOziJd_2eZG1EuCAAqH8IAAAXMbXnFWpp7P84-e_9FbQ3fMUZJHonUgn-_qjHVdhX5jWswYgvGGFKUfhHctJ4TY6Es7nV7ix2hy7MYfHYrKcNLDNd5kDonpd_zrn2c3ZrSuBUB09gBvjl4RfbvEQ7j7l-EwxA0lC83ZTJ-63cLwDIlyrMb7hVbOqZlXejlL7mtso"
//         },
//         {
//             id: 3,
//             name: "Salmon Poke Bliss",
//             price: "$16.75",
//             image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNyPUM08HQUBc9mxH1sKB_02FAq8X5c2e_QcTvgLsq3JRiwwONGlvjLIQiW-eYcOWYOTZGuCkANgn1nq8kHxAlxaFF8KgMWy5UYrmz5ZgAGa6W1JYmWxz3INCA7ee-eg9FpPIq0V14vm5AI4p-sWSUCq6m6y2QPRaIlmSZkYCMtkq_5lW877jQop-8ECykukl5KkqNt5aTw_e-R6EPoI77Tia3CfpozdTEb-hneO2FNsc5T9-QvAW7K-ieff2vtkGSkLK34Z_vgV8"
//         },
//         {
//             id: 4,
//             name: "Maple Glaze Crullers",
//             price: "$4.50",
//             image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbSQwgRVVqWESiw2v-EFqZlK7gXcQ_D4h9_lUE47UG1PQpzQUU1fA-MkRgug8Al4IiNczmrgYGKxYQRl_jDlH1rUaS9nGw6VnYqxILy1SFaULsqQvhvXX2jY4I3mh-3g5DHoErNcgzgnJ7V7BsotEMVnQgU2x7Pp129FQfgLWkSFecfobu5zlnUBrnqzV1B4BjCqpfSz_aLgDz4XwO2Q-leHfg7c7l2bNqNCovSxC_-DCxdwONobhbZseZA27YYykM7MGeFoGb2Ck"
//         },
//         {
//             id: 5,
//             name: "Heritage Avo Toast",
//             price: "$12.00",
//             image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMEfrxRcxeW35E95uPjLKjPgv04l0hFsvotbGJ-rZXiWMEc7xv5MvDk1z4Cme6sdZFTQIPuHcoLWnA60SxX3Q-FuHhrPEAYRRfkDyvaY15z5xoER9w1ANnGNkBXSxJ6EuVHADHA6_ADZ4P7bWKcLxu8pZ9dsH7RTC-hM_Ws-7AlNQxB_d479k_w0PGJb-lUU_1XwdVkiTcVMPg7lnDzTXY1XeYHFXnFxO8UyL825FsVTiFZYd1y3Xvl20n1TV3VAIxsT7wdN7U0GY"
//         }
//     ];

//     const handleWheel = (e) => {
//         if (scrollRef.current) {
//             scrollRef.current.scrollLeft += e.deltaY;
//         }
//     };

//     return (
//         <section className="py-stack-lg bg-surface-container-low overflow-hidden">
//             <div className="max-w-7xl mx-auto px-container-padding mb-8">
//                 <h2 className="font-headline-lg text-headline-lg">Trending Dishes</h2>
//             </div>
//             <div 
//                 role="region"
//                 aria-label="Trending Dishes carousel"
//                 ref={scrollRef}
//                 onWheel={handleWheel}
//                 className="flex gap-6 overflow-x-auto px-container-padding no-scrollbar pb-8 scroll-smooth"
//             >
//                 {dishes.map((dish) => (
//                     <Link to={`/dishes/${dish.id}`} key={dish.id} className="flex-none w-72 bg-surface rounded-xl border border-outline-variant overflow-hidden group block">
//                         <div className="h-48 overflow-hidden">
//                             <img 
//                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
//                                 src={dish.image} 
//                                 alt={dish.name}
//                             />
//                         </div>
//                         <div className="p-4">
//                             <h4 className="font-label-lg text-lg mb-1">{dish.name}</h4>
//                             <p className="text-primary font-bold">{dish.price}</p>
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default TrendingDishes;

// src/components/Home/TrendingDishes.jsx


// src/components/Home/TrendingDishes.jsx

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import SkeletonCard from "../Shared/SkeletonCard";

const TrendingDishes = () => {
  const scrollRef = useRef(null);

  const axiosSecure = useAxiosSecure();

  const {
    data: meals = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["trendingMeals"],

    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/meals");

        return Array.isArray(res.data) ? res.data : [];
      } catch (err) {
        console.log("API ERROR:", err);
        throw err;
      }
    },

    retry: 1,
    staleTime: 1000 * 60,
  });

  // HORIZONTAL SCROLL
  const handleWheel = (e) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  // LOADING
  if (isLoading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="min-w-[320px]">
                <SkeletonCard />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ERROR
  if (isError) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-3xl p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5">
              <span className="material-symbols-outlined text-red-500 text-5xl">
                error
              </span>
            </div>

            <h2 className="text-3xl font-bold text-red-500 mb-3">
              Failed To Load Meals
            </h2>

            <p className="text-gray-600 mb-3">
              Backend server is not running.
            </p>

            <p className="text-sm text-red-400">
              {error?.message}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-base-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">

          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-500 text-sm font-semibold mb-4">
              Most Popular
            </span>

            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Trending Dishes
            </h2>

            <p className="text-gray-500 text-lg max-w-2xl">
              Explore delicious dishes prepared by talented local chefs.
            </p>
          </div>

          <Link
            to="/meals"
            className="btn btn-warning"
          >
            View All Meals
          </Link>
        </div>

        {/* EMPTY STATE */}
        {meals.length === 0 ? (
          <div className="bg-white border rounded-3xl p-20 text-center">

            <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-orange-500 text-5xl">
                restaurant
              </span>
            </div>

            <h3 className="text-3xl font-bold mb-3">
              No Meals Found
            </h3>

            <p className="text-gray-500">
              Meals are currently unavailable.
            </p>

          </div>
        ) : (

          <div
            ref={scrollRef}
            onWheel={handleWheel}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-6"
          >

            {meals.slice(0, 8).map((meal) => (
              <div
                key={meal._id}
                className="min-w-[320px] max-w-[320px] group"
              >

                <article className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

                  {/* IMAGE */}
                  <div className="relative h-64 overflow-hidden">

                    <img
                      src={
                        meal.image ||
                        "https://via.placeholder.com/500x300"
                      }
                      alt={meal.foodName}
                      className="w-full h-full object-cover group-hover:scale-110 duration-700"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/500x300";
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                    <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg">
                      <span className="font-bold text-orange-500">
                        ${meal.price || 0}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                      {meal.category || "Trending"}
                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="p-6">

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-500 transition-colors">
                      {meal.foodName || "Meal"}
                    </h3>

                    <p className="text-gray-500 mb-5 line-clamp-2">
                      {meal.description ||
                        "Fresh and delicious meal."}
                    </p>

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-2 mb-6">

                      {(meal.tags || [
                        "Fresh",
                        "Popular",
                        "Chef Special",
                      ]).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-orange-100 text-orange-500 text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}

                    </div>

                    {/* FOOTER */}
                    <div className="flex items-center justify-between pt-4 border-t">

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="material-symbols-outlined text-[18px]">
                          local_shipping
                        </span>

                        <span>
                          Fast Delivery
                        </span>
                      </div>

                      <Link
                        to={`/mealsDetails/${meal._id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Order Now
                      </Link>

                    </div>

                  </div>

                </article>

              </div>
            ))}

          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingDishes;