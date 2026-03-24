import React, { useState } from "react";
import { FaHeart, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

const FavouriteMeal = () => {
    const navigate = useNavigate();
    const [favourites, setFavourites] = useState([
        {
            _id: "1",
            foodName: "Grilled Chicken Salad",
            chefName: "Chef Maria",
            deliveryArea: "Downtown",
            price: 12.99,
            rating: 4.5,
            foodImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
            ingredients: ["Grilled Chicken", "Mixed Greens", "Cherry Tomatoes", "Cucumber", "Olive Oil"],
            estimatedDeliveryTime: "30-45 mins",
            addedToFavourites: "2024-01-10"
        },
        {
            _id: "2",
            foodName: "Beef Burger Deluxe",
            chefName: "Chef John",
            deliveryArea: "Uptown",
            price: 15.99,
            rating: 4.8,
            foodImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
            ingredients: ["Beef Patty", "Cheese", "Lettuce", "Tomato", "Special Sauce"],
            estimatedDeliveryTime: "25-35 mins",
            addedToFavourites: "2024-01-08"
        },
        {
            _id: "3",
            foodName: "Vegetarian Pizza",
            chefName: "Chef Anna",
            deliveryArea: "Midtown",
            price: 18.99,
            rating: 4.3,
            foodImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
            ingredients: ["Pizza Dough", "Tomato Sauce", "Mozzarella", "Bell Peppers", "Mushrooms"],
            estimatedDeliveryTime: "40-50 mins",
            addedToFavourites: "2024-01-05"
        },
        {
            _id: "4",
            foodName: "Salmon Teriyaki",
            chefName: "Chef David",
            deliveryArea: "Downtown",
            price: 22.99,
            rating: 4.7,
            foodImage: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
            ingredients: ["Fresh Salmon", "Teriyaki Sauce", "Steamed Rice", "Vegetables"],
            estimatedDeliveryTime: "35-45 mins",
            addedToFavourites: "2024-01-03"
        },
        {
            _id: "5",
            foodName: "Pasta Carbonara",
            chefName: "Chef Isabella",
            deliveryArea: "Westside",
            price: 16.99,
            rating: 4.6,
            foodImage: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400",
            ingredients: ["Pasta", "Eggs", "Parmesan", "Pancetta", "Black Pepper"],
            estimatedDeliveryTime: "30-40 mins",
            addedToFavourites: "2024-01-01"
        }
    ]);

    const handleRemoveFromFavourites = (mealId) => {
        setFavourites(favourites.filter(meal => meal._id !== mealId));
        alert("Removed from favourites! (Demo functionality)");
    };

    const handleOrderNow = (mealId) => {
        navigate(`/order/${mealId}`);
    };

    const handleViewDetails = (mealId) => {
        navigate(`/mealDetails/${mealId}`);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Favourite Meals</h2>
            
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded">
                <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> This is demo data. Server features have been disabled.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {favourites.map((meal) => (
                    <div key={meal._id} className="card bg-white shadow-md hover:shadow-xl transition">
                        <figure className="relative">
                            <img
                                src={meal.foodImage}
                                alt={meal.foodName}
                                className="h-40 sm:h-44 md:h-48 w-full object-cover"
                            />
                            <button
                                onClick={() => handleRemoveFromFavourites(meal._id)}
                                className="absolute top-2 right-2 btn btn-circle btn-sm bg-red-500 hover:bg-red-600 text-white border-none"
                                title="Remove from favourites"
                            >
                                <FaHeart className="text-sm" />
                            </button>
                        </figure>

                        <div className="card-body p-4 text-black sm:p-5">
                            <h3 className="card-title sm:text-lg">{meal.foodName}</h3>
                            <p className="text-xs sm:text-sm">
                                Chef: <span className="font-semibold">{meal.chefName}</span>
                            </p>
                            <p className="text-xs sm:text-sm">
                                Delivery Area: <span className="font-semibold">{meal.deliveryArea}</span>
                            </p>
                            <p className="text-xs sm:text-sm">
                                Delivery Time: <span className="font-semibold">{meal.estimatedDeliveryTime}</span>
                            </p>

                            <div className="flex justify-between items-center mt-3">
                                <span className="font-semibold text-sm sm:text-base">${meal.price}</span>
                                <span className="flex items-center text-xs sm:text-sm">
                                    <FaStarHalfAlt className="text-orange-500" />{" "}
                                    <span className="text-xl font-bold">{meal.rating}</span>
                                </span>
                            </div>

                            <p className="text-xs text-gray-500 mt-2">
                                Added: {new Date(meal.addedToFavourites).toLocaleDateString()}
                            </p>

                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => handleViewDetails(meal._id)}
                                    className="btn btn-sm bg-gray-200 text-black flex-1"
                                >
                                    Details
                                </button>
                                <button
                                    onClick={() => handleOrderNow(meal._id)}
                                    className="btn btn-sm bg-orange-500 text-white flex-1"
                                >
                                    Order
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {favourites.length === 0 && (
                <div className="text-center py-10">
                    <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No favourite meals yet.</p>
                    <p className="text-gray-400 text-sm">Start adding meals to your favourites!</p>
                </div>
            )}

            {/* Statistics */}
            {favourites.length > 0 && (
                <div className="mt-8 bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3">Favourites Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold text-primary">{favourites.length}</p>
                            <p className="text-sm text-gray-600">Total Favourites</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">
                                ${(favourites.reduce((sum, meal) => sum + meal.price, 0) / favourites.length).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">Avg Price</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-orange-500">
                                {(favourites.reduce((sum, meal) => sum + meal.rating, 0) / favourites.length).toFixed(1)}
                            </p>
                            <p className="text-sm text-gray-600">Avg Rating</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-blue-600">
                                {[...new Set(favourites.map(meal => meal.chefName))].length}
                            </p>
                            <p className="text-sm text-gray-600">Different Chefs</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FavouriteMeal;