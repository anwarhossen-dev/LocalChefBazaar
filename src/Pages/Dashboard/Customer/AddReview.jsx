import React from 'react';

const AddReview = () => {
    return (
          <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Reviews</h1>
      <div className="grid gap-4">
        {[1, 2].map((review) => (
          <div key={review} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">
                  Delicious Pasta Carbonara
                </h3>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600">
                  Amazing taste! Will definitely order again.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Reviewed on Dec {review}, 2024
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};

export default AddReview;