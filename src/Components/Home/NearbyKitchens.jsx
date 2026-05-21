// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import SkeletonCard from '../Shared/SkeletonCard';

// const NearbyKitchens = () => {
//     const axiosSecure = useAxiosSecure();

//     const { data: kitchens = [], isLoading, isError } = useQuery({
//         queryKey: ['nearby-kitchens'], // This query key is appropriate
//         queryFn: async () => {
//             // --- CRITICAL SUGGESTION: Use a dedicated API endpoint for kitchens/chefs ---
//             // The current implementation falls back to 'meals' if a 'kitchens' endpoint isn't ready.
//             // For a "Nearby Kitchens" section, it's essential to fetch actual kitchen/chef data
//             // from a dedicated endpoint (e.g., '/kitchens' or '/chefs').
//             // The data structure returned should contain properties like `kitchen.name`, `kitchen.image`,
//             // `kitchen.rating`, `kitchen.distance`, `kitchen.description`, `kitchen.tags`.
//             const res = await axiosSecure.get('meals'); // Placeholder: Replace with '/kitchens' or '/chefs'
//             // Ensure we always return an array to prevent .map errors
//             return Array.isArray(res.data) ? res.data : [];
//         },
//         retry: 1, // Only retry once to avoid excessive failing logs
//     });

//     return (
//         <section className="py-stack-lg bg-surface max-w-7xl mx-auto px-container-padding">
//             <div className="flex justify-between items-end mb-12">
//                 <div>
//                     <h2 className="font-headline-lg text-headline-lg mb-2">Nearby Kitchens</h2>
//                     <p className="font-body-md text-body-md text-on-surface-variant">The freshest talent in your immediate 5-mile radius.</p>
//                 </div>
//                 <Link to="/kitchens" className="text-primary font-label-lg flex items-center gap-1 hover:gap-2 transition-all"> {/* SUGGESTION: Link to /kitchens or /chefs */}
//                     View All <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
//                 </Link>
//             </div>

//             {isError && (
//                 <div className="text-center py-10 bg-red-50 rounded-xl border border-red-100">
//                     <p className="text-red-600 font-medium">Kitchens currently unavailable. Please check your backend route.</p>
//                 </div>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                 {isLoading && !isError ? (
//                     [...Array(3)].map((_, i) => (
//                         <SkeletonCard key={i} />
//                     ))
//                 ) : !isError && kitchens.length > 0 ? (
//                     kitchens.map((kitchen) => (
//                         <Link to={`/kitchens/${kitchen._id}`} key={kitchen._id} className="group block"> {/* Assuming _id is the unique identifier */}
//                             <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-surface-container-highest">
//                                 <img 
//                                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
//                                     src={kitchen.image} // Assuming `image` property from a dedicated kitchen endpoint
//                                     alt={kitchen.name} // Assuming `name` property from a dedicated kitchen endpoint
//                                 />
//                                 <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm" aria-label={`Rating: ${kitchen.rating} out of 5 stars`}>
//                                     <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">star</span> {/* Assuming `rating` property */}
//                                     <span className="font-label-lg text-sm" aria-hidden="true">{kitchen.rating}</span>
//                                 </div>
//                             </div>
//                             <div className="flex justify-between items-start mb-2">
//                                 <h3 className="font-headline-md text-headline-md group-hover:text-primary transition-colors">{kitchen.name || kitchen.foodName}</h3>
//                                 <span className="font-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded">{kitchen.distance || 'Local'}</span>
//                             </div>
//                             <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">{kitchen.description || 'Fresh ingredients prepared daily.'}</p>
//                             <div className="flex gap-2">
//                                 {(kitchen.tags || ['Home Cooked']).map((tag, index) => (
//                                 <span key={index} className="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs rounded-full font-label-lg">{tag}</span>
//                             ))}
//                         </div>
//                         </Link>
//                     ))
//                 ) : (
//                     !isError && (
//                         <div className="col-span-full text-center py-16 bg-surface-container-low rounded-[2rem] border border-outline-variant/30">
//                             <p className="text-on-surface-variant font-bold text-xl">No Kitchens Found</p>
//                             <p className="text-on-surface-variant/60 mt-2">We couldn't find any artisanal kitchens in your area right now. Please check back later!</p>
//                         </div>
//                     )
//                 )}
//             </div>
//         </section>
//     );
// };

// export default NearbyKitchens;


import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
//import useAxiosSecure from '../../hooks/useAxiosSecure';
import SkeletonCard from '../Shared/SkeletonCard';
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

const NearbyKitchens = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: kitchens = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['nearby-kitchens'],
        queryFn: async () => {
            try {
                // Recommended API endpoint
                // const res = await axiosSecure.get('/kitchens');

                // Temporary fallback endpoint
                const res = await axiosSecure.get('/meals');

                // Handle both array response and object with meals property
                const data = Array.isArray(res.data) ? res.data : (res.data?.meals || []);
                return data;
            } catch (error) {
                console.error('Error fetching kitchens:', error);
                return [];
            }
        },
        retry: 1,
    });

    return (
        <section className="py-20 bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
                    <div>
                        <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                            Discover Kitchens
                        </span>

                        <h2 className="text-4xl md:text-5xl font-black text-on-surface mb-4 leading-tight">
                            Nearby Kitchens
                        </h2>

                        <p className="text-on-surface-variant text-lg max-w-2xl">
                            Explore home chefs and artisanal kitchens serving fresh,
                            delicious meals near your location.
                        </p>
                    </div>

                    <Link
                        to="/kitchens"
                        className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
                    >
                        View All Kitchens
                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                            arrow_forward
                        </span>
                    </Link>
                </div>

                {/* Error State */}
                {isError && (
                    <div className="bg-red-50 border border-red-200 rounded-3xl p-10 text-center mb-10">
                        <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-red-500 text-3xl">
                                error
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-red-600 mb-2">
                            Kitchens Unavailable
                        </h3>

                        <p className="text-red-500">
                            Unable to load kitchen data right now. Please try again later.
                        </p>
                    </div>
                )}

                {/* Kitchens Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Loading */}
                    {isLoading && !isError &&
                        [...Array(6)].map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}

                    {/* Kitchen Cards */}
                    {!isLoading &&
                        !isError &&
                        kitchens.length > 0 &&
                        kitchens.map((kitchen) => (
                            <Link
                                key={kitchen._id}
                                to={`/kitchens/${kitchen._id}`}
                                className="group"
                            >
                                <article className="bg-surface-container rounded-3xl overflow-hidden border border-outline-variant/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">

                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={
                                                kitchen.image ||
                                                'https://i.ibb.co/z6J7XzS/food-placeholder.jpg'
                                            }
                                            alt={kitchen.name || kitchen.foodName}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                                        {/* Rating */}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                            <span
                                                className="material-symbols-outlined text-yellow-500 text-[18px]"
                                                style={{
                                                    fontVariationSettings: "'FILL' 1",
                                                }}
                                            >
                                                star
                                            </span>

                                            <span className="text-sm font-bold text-gray-800">
                                                {kitchen.rating || '4.8'}
                                            </span>
                                        </div>

                                        {/* Distance */}
                                        <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-md">
                                            {kitchen.distance || 'Nearby'}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">

                                        {/* Name */}
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <h3 className="text-2xl font-bold text-on-surface group-hover:text-primary transition-colors">
                                                {kitchen.name || kitchen.foodName}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <p className="text-on-surface-variant mb-5 line-clamp-2 leading-relaxed">
                                            {kitchen.description ||
                                                'Fresh homemade meals prepared daily with quality ingredients and authentic flavors.'}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {(kitchen.tags || [
                                                'Home Cooked',
                                                'Fresh',
                                                'Organic',
                                            ]).map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">

                                            <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                                                <span className="material-symbols-outlined text-[18px]">
                                                    schedule
                                                </span>

                                                <span>Fast Delivery</span>
                                            </div>

                                            <div className="flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all">
                                                Explore
                                                <span className="material-symbols-outlined text-[18px]">
                                                    arrow_forward
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}

                    {/* Empty State */}
                    {!isLoading &&
                        !isError &&
                        kitchens.length === 0 && (
                            <div className="col-span-full">
                                <div className="bg-surface-container-low border border-outline-variant/20 rounded-[2rem] py-20 px-8 text-center">

                                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                        <span className="material-symbols-outlined text-primary text-5xl">
                                            restaurant
                                        </span>
                                    </div>

                                    <h3 className="text-3xl font-bold text-on-surface mb-4">
                                        No Kitchens Found
                                    </h3>

                                    <p className="text-on-surface-variant max-w-xl mx-auto mb-8 text-lg">
                                        We couldn't find any nearby kitchens right now.
                                        Please check back later for fresh homemade meals.
                                    </p>

                                    <Link
                                        to="/LatestMeals"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:scale-105 transition-transform"
                                    >
                                        Browse Meals
                                        <span className="material-symbols-outlined">
                                            arrow_forward
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </section>
    );
};

export default NearbyKitchens;
