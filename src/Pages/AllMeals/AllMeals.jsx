
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


// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import AppLoading from "../../Components/Shared/AppLoading";
// import { IoSearchOutline } from "react-icons/io5";
// import { Link } from "react-router-dom";
// import { FaStarHalfAlt } from "react-icons/fa";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// // import useAxiosSecure from "../../hooks/useAxiosSecure";
// //import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

// const AllMeals = () => {
//     const [sortPrice, setSortPrice] = useState("asc");
//     const [searchText, setSearchText] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [mealsPerPage] = useState(8);

//     const axiosSecure = useAxiosSecure();

//     const { data: meals = [], isLoading } = useQuery({
//         queryKey: ["all-meals"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/meals");
//             return res.data.meals || [];
//         },
//     });

//     if (isLoading) return <AppLoading />;

//     const filteredMeals = (meals || []).filter((meal) =>
//         meal.foodName?.toLowerCase().includes(searchText.toLowerCase())
//     );

//     const sortedMeals = [...filteredMeals].sort((a, b) =>
//         sortPrice === "asc" ? a.price - b.price : b.price - a.price
//     );

//     const totalPages = Math.ceil(sortedMeals.length / mealsPerPage);
//     const indexOfLastMeal = currentPage * mealsPerPage;
//     const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
//     const currentMeals = sortedMeals.slice(indexOfFirstMeal, indexOfLastMeal);

//     // Pagination handlers
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);
//     const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//     const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

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
//                                 className="btn bg-yellow-500 text-black btn-sm md:btn-md mt-4 w-full min-h-11"
//                             >
//                                 See Details
//                             </Link>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center mt-10 gap-2 flex-wrap">
//                 <button
//                     onClick={prevPage}
//                     disabled={currentPage === 1}
//                     className="px-4 py-2 rounded bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50"
//                 >
//                     Previous
//                 </button>

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

//                 <button
//                     onClick={nextPage}
//                     disabled={currentPage === totalPages}
//                     className="px-4 py-2 rounded bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AllMeals;



import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AppLoading from "../../Components/Shared/AppLoading";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaShoppingCart, FaHeart } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { CartContext } from "../../providers/CartContext";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AllMeals = () => {
    const { user } = useAuth();
    const { addToCart } = useContext(CartContext);
    const [sortPrice, setSortPrice] = useState("asc");
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [mealsPerPage] = useState(12); 

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const defaultFoodImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600";

    const { data: meals = [], isLoading } = useQuery({
        queryKey: ["all-meals"],
        queryFn: async () => {
            const res = await axiosPublic.get("/meals");
            return Array.isArray(res.data) ? res.data : res.data.meals || [];
        },
    });

    const handleAddToCart = (meal) => {
        const product = {
            id: meal._id,
            name: meal.foodName,
            price: meal.price,
            imageUrl: meal.foodImage || defaultFoodImage,
        };
        addToCart(product);
    };

    const handleAddToFavorites = async (meal) => {
        if (!user) {
            return toast.info("Please login to add to favorites.");
        }

        const favouriteMeal = {
            userEmail: user.email,
            mealId: meal._id,
            mealName: meal.foodName,
            chefId: meal.chefId,
            chefName: meal.chefName,
            price: meal.price,
            addedTime: new Date().toISOString(),
        };

        try {
            const res = await axiosSecure.post("/favorites", favouriteMeal);
            if (res.data.success) {
                Swal.fire({
                    title: "Added!",
                    text: `${meal.foodName} is now in your favorites.`,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                toast.info(res.data.message);
            }
        } catch (_err) {
            toast.error("Failed to add to favorites.");
        }
    };

    if (isLoading) return <AppLoading />;

    const filteredMeals = meals.filter((meal) =>
        meal.foodName?.toLowerCase().includes(searchText.toLowerCase())
    );

    const sortedMeals = [...filteredMeals].sort((a, b) =>
        sortPrice === "asc" ? a.price - b.price : b.price - a.price
    );

    const totalPages = Math.ceil(sortedMeals.length / mealsPerPage) || 1;
    const currentMeals = sortedMeals.slice((currentPage - 1) * mealsPerPage, currentPage * mealsPerPage);

    return (
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 py-12 min-h-screen bg-base-200/30">
            
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-base-content tracking-tight">Culinary Masterpieces</h1>
                <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Smart Search & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-base-100 p-3 rounded-2xl shadow-lg border border-base-200 mb-12 gap-4">
                <div className="relative flex-1 w-full">
                    <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl" />
                    <input
                        type="text"
                        className="w-full bg-base-200 pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="Search your favorite meal..."
                        onChange={(e) => { setSearchText(e.target.value); setCurrentPage(1); }}
                    />
                </div>
                <select
                    className="select bg-base-200 font-bold border-none w-full md:w-auto hover:bg-base-300"
                    onChange={(e) => setSortPrice(e.target.value)}
                >
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-6">
                {currentMeals.map((meal) => (
                    <div key={meal._id} className="card bg-base-100 shadow-md hover:shadow-2xl transition-all duration-300 border border-base-200 hover:-translate-y-2 group">
                        <figure className="aspect-[4/3] overflow-hidden relative">
                            <img src={meal.foodImage || defaultFoodImage} alt={meal.foodName} className="hover:scale-110 transition-transform duration-500 w-full h-full object-cover"/>
                            
                            {/* Overlay Buttons */}
                            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button 
                                    onClick={() => handleAddToFavorites(meal)}
                                    className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-rose-500 shadow-lg hover:bg-rose-500 hover:text-white transition-all active:scale-95"
                                    title="Add to Favorites"
                                >
                                    <FaHeart />
                                </button>
                                <button 
                                    onClick={() => handleAddToCart(meal)}
                                    className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center text-primary shadow-lg hover:bg-primary hover:text-white transition-all active:scale-95"
                                    title="Add to Cart"
                                >
                                    <FaShoppingCart />
                                </button>
                            </div>
                        </figure>
                        <div className="card-body p-4">
                            <h2 className="card-title text-base font-bold truncate">{meal.foodName}</h2>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-primary font-extrabold text-lg">${meal.price}</span>
                                <Link to={`/mealDetails/${meal._id}`}>
                                    <button className="btn btn-primary btn-sm rounded-lg px-6 font-bold shadow-md shadow-primary/20">View</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 gap-3 flex-wrap">
                    {/* Previous Button */}
                    <button
                        onClick={() => {
                            setCurrentPage((prev) => Math.max(prev - 1, 1));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={currentPage === 1}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-base-100 border border-base-200 hover:bg-base-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        <FaChevronLeft className="text-xs" />
                    </button>

                    {/* Page Numbers */}
                    <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => {
                                    setCurrentPage(i + 1);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className={`w-10 h-10 rounded-xl font-black transition-all ${
                                    currentPage === i + 1
                                        ? "bg-primary text-white shadow-lg shadow-primary/30 scale-110"
                                        : "bg-base-100 border border-base-200 hover:bg-base-200"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => {
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-base-100 border border-base-200 hover:bg-base-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        <FaChevronRight className="text-xs" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllMeals;