import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaStarHalfAlt } from "react-icons/fa";

const LeatestMeal = () => {
    const axiosSecure = useAxiosSecure();

    const { data: meals = [] } = useQuery({
        queryKey: ["LeatestMeal"],
        queryFn: async () => {
            const res = await axiosSecure.get("/leatestMeals");
            return res.data;
        },
    });
    return (
        <section className="max-w-7xl mx-auto px-4 my-12 sm:my-14 md:my-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">Today's Daily Meals</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {meals.map((meal) => (
                    <div key={meal._id} className="card bg-base-100 shadow-md hover:shadow-xl transition">
                        <figure>
                            <img src={meal.foodImage} alt={meal.foodName} className="h-40 sm:h-44 md:h-48 w-full object-cover" />
                        </figure>

                        <div className="card-body p-4 sm:p-5">
                            <h3 className="card-title text-base sm:text-lg">{meal.foodName}</h3>

                            <p className="text-xs sm:text-sm">
                                Chef: <span className="font-semibold">{meal.chefName}</span>
                            </p>

                            <p className="text-xs sm:text-sm ">
                                Chef ID: <span className="font-semibold">{meal.chefId}</span>
                            </p>

                            <p className="text-xs sm:text-sm ">
                                Delivery Area: <span className="font-semibold">{meal.deliveryArea}</span>
                            </p>

                            <div className="flex justify-between items-center mt-3">
                                <span className="font-semibold text-primary text-sm sm:text-base">${meal.price}</span>
                                <div>
                                    <span className="flex items-center text-xs sm:text-sm">
                                        <FaStarHalfAlt className="text-orange-500" /> <span className="text-xl font-bold">{meal.rating}</span>
                                    </span>
                                </div>
                            </div>

                            <Link
                                to={`/mealDetails/${meal._id}`}
                                className="mt-4 w-full min-h-[44px] flex items-center justify-center
             px-4 py-2 rounded-md
             bg-yellow-500 text-black font-medium
             hover:bg-gray-300 transition
             disabled:opacity-50"
                            >
                                See Details
                            </Link>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LeatestMeal;