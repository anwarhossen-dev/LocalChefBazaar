
// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import AppLoading from "../../Components/Shared/AppLoading";
// import { IoSearchOutline } from "react-icons/io5";
// import { Link } from "react-router-dom";
// import { FaStarHalfAlt } from "react-icons/fa";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const AllMeals = () => {
//     const [sortPrice, setSortPrice] = useState("asc");
//     const [searchText, setSearchText] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [mealsPerPage] = useState(8); // Change per page

//     const axiosSecure = useAxiosSecure();

//     // Fetch meals
//     const { data: meals = [], isLoading } = useQuery({
//         queryKey: ["all-meals"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/meals");
//             console.log(res.data); 
//             return res.data.meals || []; 
//         },
//     });

//     if (isLoading) return <AppLoading />;

//     // Filter meals based on search
//     const filteredMeals = (meals || []).filter((meal) =>
//         meal.foodName?.toLowerCase().includes(searchText.toLowerCase())
//     );

//     // Sort meals by price
//     const sortedMeals = [...filteredMeals].sort((a, b) =>
//         sortPrice === "asc" ? a.price - b.price : b.price - a.price
//     );

//     // Pagination logic
//     const indexOfLastMeal = currentPage * mealsPerPage;
//     const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
//     const currentMeals = sortedMeals.slice(indexOfFirstMeal, indexOfLastMeal);
//     const totalPages = Math.ceil(sortedMeals.length / mealsPerPage);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     return (
//         <div className="max-w-7xl mx-auto my-10">
//             <h1 className="text-3xl font-bold text-center my-6">All Meals are here!</h1>

//             {/* Search and Sort */}
//             <div className="flex justify-between mb-10 flex-wrap gap-4">
//                 <div className="flex items-center gap-2 w-200">
//                     <h2 className="text-xl font-bold">Search Here:</h2>
//                     <label className="input outline-none flex items-center gap-2">
//                         <IoSearchOutline className="text-xl" />
//                         <input
//                             type="text"
//                             className="input border-none focus:outline-none"
//                             value={searchText}
//                             placeholder="Search By Meal Name"
//                             onChange={(e) => setSearchText(e.target.value)}
//                         />
//                     </label>
//                 </div>
//                 <div className="flex items-center gap-2">
//                     <h1 className="text-xl font-bold">Sort Here:</h1>
//                     <select
//                         className="select select-bordered w-40 border-none outline-none"
//                         value={sortPrice}
//                         onChange={(e) => setSortPrice(e.target.value)}
//                     >
//                         <option value="asc">Price: Low → High</option>
//                         <option value="desc">Price: High → Low</option>
//                     </select>
//                 </div>
//             </div>

//             {/* Meals Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
//                 {currentMeals.map((meal) => (
//                     <div key={meal._id} className="card bg-white shadow-md hover:shadow-xl transition">
//                         <figure>
//                             <img
//                                 src={meal.foodImage}
//                                 alt={meal.foodName}
//                                 className="h-40 sm:h-44 md:h-48 w-full object-cover"
//                             />
//                         </figure>

//                         <div className="card-body p-4 text-black sm:p-5">
//                             <h3 className="card-title sm:text-lg">{meal.foodName}</h3>
//                             <p className="text-xs sm:text-sm">
//                                 Chef: <span className="font-semibold">{meal.chefName}</span>
//                             </p>
//                             <p className="text-xs sm:text-sm">
//                                 Delivery Area: <span className="font-semibold">{meal.deliveryArea}</span>
//                             </p>

//                             <div className="flex justify-between items-center mt-3">
//                                 <span className="font-semibold text-sm sm:text-base">${meal.price}</span>
//                                 <span className="flex items-center text-xs sm:text-sm">
//                                     <FaStarHalfAlt className="text-orange-500" />{" "}
//                                     <span className="text-xl font-bold">{meal.rating}</span>
//                                 </span>
//                             </div>

//                             <Link
//                                 to={`/mealDetails/${meal._id}`}
//                                 className="btn bg-gray-200 text-black btn-sm md:btn-md mt-4 w-full min-h-11"
//                             >
//                                 See Details
//                             </Link>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center mt-10 gap-2 flex-wrap">
//                 {Array.from({ length: totalPages }, (_, i) => (
//                     <button
//                         key={i + 1}
//                         onClick={() => paginate(i + 1)}
//                         className={`px-4 py-2 rounded ${
//                             currentPage === i + 1
//                                 ? "bg-blue-500 text-white"
//                                 : "bg-gray-200 text-black hover:bg-gray-300"
//                         }`}
//                     >
//                         {i + 1}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AllMeals;


import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AppLoading from "../../Components/Shared/AppLoading";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaStarHalfAlt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllMeals = () => {
    const [sortPrice, setSortPrice] = useState("asc");
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [mealsPerPage] = useState(8);

    const axiosSecure = useAxiosSecure();

    const { data: meals = [], isLoading } = useQuery({
        queryKey: ["all-meals"],
        queryFn: async () => {
            const res = await axiosSecure.get("/meals");
            return res.data.meals || [];
        },
    });

    if (isLoading) return <AppLoading />;

    const filteredMeals = (meals || []).filter((meal) =>
        meal.foodName?.toLowerCase().includes(searchText.toLowerCase())
    );

    const sortedMeals = [...filteredMeals].sort((a, b) =>
        sortPrice === "asc" ? a.price - b.price : b.price - a.price
    );

    const totalPages = Math.ceil(sortedMeals.length / mealsPerPage);
    const indexOfLastMeal = currentPage * mealsPerPage;
    const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
    const currentMeals = sortedMeals.slice(indexOfFirstMeal, indexOfLastMeal);

    // Pagination handlers
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div className="max-w-7xl mx-auto my-10">
            <h1 className="text-3xl font-bold text-center my-6">All Meals are here!</h1>

            {/* Search and Sort */}
            <div className="flex justify-between mb-10 flex-wrap gap-4">
                <div className="flex items-center gap-2 w-200">
                    <h2 className="text-xl font-bold">Search Here:</h2>
                    <label className="input outline-none flex items-center gap-2">
                        <IoSearchOutline className="text-xl" />
                        <input
                            type="text"
                            className="input border-none focus:outline-none"
                            value={searchText}
                            placeholder="Search By Meal Name"
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </label>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold">Sort Here:</h1>
                    <select
                        className="select select-bordered w-40 border-none outline-none"
                        value={sortPrice}
                        onChange={(e) => setSortPrice(e.target.value)}
                    >
                        <option value="asc">Price: Low → High</option>
                        <option value="desc">Price: High → Low</option>
                    </select>
                </div>
            </div>

            {/* Meals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {currentMeals.map((meal) => (
                    <div key={meal._id} className="card bg-white shadow-md hover:shadow-xl transition">
                        <figure>
                            <img
                                src={meal.foodImage}
                                alt={meal.foodName}
                                className="h-40 sm:h-44 md:h-48 w-full object-cover"
                            />
                        </figure>

                        <div className="card-body p-4 text-black sm:p-5">
                            <h3 className="card-title sm:text-lg">{meal.foodName}</h3>
                            <p className="text-xs sm:text-sm">
                                Chef: <span className="font-semibold">{meal.chefName}</span>
                            </p>
                            <p className="text-xs sm:text-sm">
                                Delivery Area: <span className="font-semibold">{meal.deliveryArea}</span>
                            </p>

                            <div className="flex justify-between items-center mt-3">
                                <span className="font-semibold text-sm sm:text-base">${meal.price}</span>
                                <span className="flex items-center text-xs sm:text-sm">
                                    <FaStarHalfAlt className="text-orange-500" />{" "}
                                    <span className="text-xl font-bold">{meal.rating}</span>
                                </span>
                            </div>

                            <Link
                                to={`/mealDetails/${meal._id}`}
                                className="btn bg-yellow-500 text-black btn-sm md:btn-md mt-4 w-full min-h-11"
                            >
                                See Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10 gap-2 flex-wrap">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50"
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`px-4 py-2 rounded ${
                            currentPage === i + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-black hover:bg-gray-300"
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllMeals;

