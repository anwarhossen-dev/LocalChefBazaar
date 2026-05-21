import React from "react";

const SkeletonCard = () => (
    <div className="card bg-base-100 shadow-md border border-gray-100 animate-pulse h-full">
        <div className="h-40 sm:h-44 md:h-48 bg-gray-200 rounded-t-xl" />
        <div className="card-body p-4 sm:p-5 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
            <div className="flex justify-between items-center mt-3">
                <div className="h-6 bg-gray-200 rounded w-16" />
                <div className="h-6 bg-gray-200 rounded w-12" />
            </div>
            <div className="mt-4 h-10 bg-gray-200 rounded-md w-full" />
        </div>
    </div>
);

export default SkeletonCard;