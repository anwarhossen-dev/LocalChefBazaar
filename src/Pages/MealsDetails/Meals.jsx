import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../Components/Shared/LoadingSpinner';
import SearchNotFound from '../../Components/Shared/SearchNotFound';
import Card from '../../Components/Home/Card';

// import React, { useEffect, useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import Loading from "../../components/Shared/Loading";
// import MealCard from "../../components/MealCard";
// import SearchNotFound from "../../components/SearchNotFound";

const Meals = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("none");
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const { data: meals = [] , isLoading} = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/meals");
      return res.data;
    },
  });
  // Search filter
  const term = search.trim().toLowerCase();
  const searched = term
    ? meals.filter((meal) => meal.foodName?.toLowerCase().includes(term))
    : meals;

  // Sort filter
  const sorted = [...searched].sort((a, b) => {
    if (sort === "low-asc") return a.price - b.price;
    if (sort === "high-desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="w-11/12 mx-auto">
      <div className="text-center mt-10 mb-20">
        <h2 className="text-4xl font-bold text-primary mb-3">Discover Your Next Favorite Recipe</h2>
        <p className="text-gray-600 mb-10">
          Thousands of tried-and-tested recipes, from quick weeknight dinners to show-stopping desserts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center mb-16">
        <div className="col-span-2">
          <h1 className="lg:font-bold font-normal text-primary lg:text-xl text-small ">
            ({sorted.length}) Available
          </h1>
        </div>
        {/* Search box  */}
        <div className="col-span-8 mx-auto flex items-center border pl-4 gap-2 bg-white border-gray-500/30 h-[46px] rounded-full overflow-hidden max-w-md w-full ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="#6B7280"
          >
            <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search Apps"
            className="w-full h-full outline-none text-sm text-gray-500"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-orange-700 transition w-32 h-9 rounded-full text-sm text-white mr-[5px] cursor-pointer"
          >
            Search
          </button>
        </div>
        {/*  Sorting data */}
        <div className="col-span-2">
          <select
            className="select select-bordered cursor-pointer"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="none">Sort by price</option>
            <option value="low-asc">Low - High</option>
            <option value="high-desc">High - Low</option>
          </select>
        </div>
      </div>

      {/* Loading state and set data */}
      {isLoading ? (
        <LoadingSpinner />
      ) : sorted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {sorted.map((meal) => (
            <Card key={meal._id} meal={meal} />
          ))}
        </div>
      ) : (
        <div className="p-10">
          <SearchNotFound />
        </div>
      )}
    </div>
  );
};

export default Meals;