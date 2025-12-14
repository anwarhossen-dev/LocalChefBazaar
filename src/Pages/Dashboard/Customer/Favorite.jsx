import React from "react";

const Favorite = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Favorite Meals</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4].map((meal) => (
          <div
            key={meal}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="h-48 bg-linear-to-br from-orange-400 to-red-500" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">Meal Name {meal}</h3>
              <p className="text-gray-600 text-sm mb-3">
                Delicious homemade dish
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">
                  ${15 + meal}.99
                </span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;