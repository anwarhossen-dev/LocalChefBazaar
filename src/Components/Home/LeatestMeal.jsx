// import React from "react";
// //import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router";
// import { FaStarHalfAlt } from "react-icons/fa";
// // import useAxiosSecure from "../../hooks/useAxiosSecure";
// // import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

// const LeatestMeal = () => {
//     const axiosSecure = useAxiosSecure();

//     const { data: meals = [] } = useQuery({
//         queryKey: ["LeatestMeal"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/leatestMeals");
//             return res.data;
//         },
//     });
//     return (
//         <section className="max-w-7xl mx-auto px-4 my-12 sm:my-14 md:my-16">
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">Today's Daily Meals</h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
//                 {meals.map((meal) => (
//                     <div key={meal._id} className="card bg-base-100 shadow-md hover:shadow-xl transition">
//                         <figure>
//                             <img src={meal.foodImage} alt={meal.foodName} className="h-40 sm:h-44 md:h-48 w-full object-cover" />
//                         </figure>

//                         <div className="card-body p-4 sm:p-5">
//                             <h3 className="card-title text-base sm:text-lg">{meal.foodName}</h3>

//                             <p className="text-xs sm:text-sm">
//                                 Chef: <span className="font-semibold">{meal.chefName}</span>
//                             </p>

//                             <p className="text-xs sm:text-sm ">
//                                 Chef ID: <span className="font-semibold">{meal.chefId}</span>
//                             </p>

//                             <p className="text-xs sm:text-sm ">
//                                 Delivery Area: <span className="font-semibold">{meal.deliveryArea}</span>
//                             </p>

//                             <div className="flex justify-between items-center mt-3">
//                                 <span className="font-semibold text-primary text-sm sm:text-base">${meal.price}</span>
//                                 <div>
//                                     <span className="flex items-center text-xs sm:text-sm">
//                                         <FaStarHalfAlt className="text-orange-500" /> <span className="text-xl font-bold">{meal.rating}</span>
//                                     </span>
//                                 </div>
//                             </div>

//                             <Link
//                                 to={`/mealDetails/${meal._id}`}
//                                 className="mt-4 w-full min-h-[44px] flex items-center justify-center
//              px-4 py-2 rounded-md
//              bg-yellow-500 text-black font-medium
//              hover:bg-gray-300 transition
//              disabled:opacity-50"
//                             >
//                                 See Details
//                             </Link>

//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default LeatestMeal;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaStar, FaArrowRight } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import PremiumCard from "../UI/Primitives/PremiumCard";
import TextReveal from "../UI/Primitives/TextReveal";
import Container from "../Shared/Container";

const LatestMeal = () => {
  const axiosSecure = useAxiosSecure();
  const defaultFoodImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600";

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["LatestMeal"],
    queryFn: async () => {
      const res = await axiosSecure.get("/leatestMeals");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className="py-24">
        <Container>
            <div className="h-12 w-64 bg-slate-100 animate-pulse mx-auto mb-12 rounded-2xl"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, idx) => (
                <div key={idx} className="aspect-[3/4] bg-slate-50 animate-pulse rounded-[2.5rem]"></div>
            ))}
            </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-24 bg-slate-50/30">
      <Container>
        <div className="text-center mb-16">
            <TextReveal>
                <h2 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight">
                    Today's Daily <span className="text-primary">Meals</span>
                </h2>
            </TextReveal>
            <div className="w-20 h-1.5 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {meals.map((meal, idx) => (
            <PremiumCard key={meal._id} delay={idx * 0.1}>
                <div className="relative aspect-[4/5] overflow-hidden">
                    <img 
                        src={meal.foodImage || defaultFoodImage} 
                        alt={meal.foodName} 
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-black text-slate-800 flex items-center gap-1.5 shadow-xl">
                        <FaStar className="text-amber-400" />
                        <span>{meal.rating || "4.5"}</span>
                    </div>
                </div>

                <div className="p-8">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 line-clamp-1 group-hover:text-primary transition-colors">
                        {meal.foodName}
                    </h3>

                    <div className="space-y-3 mb-8">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400 font-bold uppercase tracking-tighter">Chef</span>
                            <span className="text-slate-700 font-black">{meal.chefName || "Artisan"}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400 font-bold uppercase tracking-tighter">Location</span>
                            <span className="text-slate-700 font-black">📍 {meal.deliveryArea?.split(" ")[0] || "Local"}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Price</span>
                            <span className="text-2xl font-black text-slate-900">${meal.price || "0.00"}</span>
                        </div>
                        <Link
                            to={`/mealDetails/${meal._id}`}
                            className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-primary transition-all active:scale-95 shadow-lg shadow-slate-200"
                        >
                            <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </PremiumCard>
            ))}
        </div>
      </Container>
    </section>
  );
};

export default LatestMeal;