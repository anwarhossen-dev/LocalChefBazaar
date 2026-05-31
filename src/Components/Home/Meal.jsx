// import React from 'react';
// import Container from '../Shared/Container';
// import Card from './Card';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import LoadingSpinner from '../Shared/LoadingSpinner';
// import { data } from 'react-router';

// const Meal = () => {
  
//   const {data: meals = [], isLoading, isError} = useQuery({
//     queryKey: ['meals'],
//     queryFn: async()=>{
//       const result = await axios(`${import.meta.env.VITE_API_URL}/meals`)
//       return result.data
//     },
//   })

//   console.log(data)
//   if (isLoading) return <LoadingSpinner/>
//     return (
//         <Container>
//       {
//         meals && meals.length>0 ? (
//           <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8'>
//         {
//           meals.map(meal=><Card key={meal._id} meal={meal}/>)
//         }
//       </div>
//         ): null
//       }

      
//     </Container>
//     );
// };

// export default Meal;


import React, { useState, useEffect } from 'react';
import Container from '../Shared/Container';
import Card from './Card';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { IoSearchOutline } from "react-icons/io5";
import useAxiosPublic from '../../hooks/useAxiosPublic.jsx';

const Meal = () => {
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const itemsPerPage = 12; 

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ['meals'],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/meals");
        // Handle both simple array responses or object-wrapped arrays
        return Array.isArray(res.data) ? res.data : (res.data?.meals || []);
      } catch (err) {
        console.error("Fetch Error:", err);
        return [];
      }
    },
  });

  // Smooth scroll to top when the page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  if (isLoading) return <LoadingSpinner />;

  // Filter and Sort logic
  const filteredMeals = meals
    .filter(meal => meal.foodName?.toLowerCase().includes(search.trim().toLowerCase()))
    .sort((a, b) => sort === "asc" ? a.price - b.price : b.price - a.price);

  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentMeals = filteredMeals.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container className="py-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-800">Our Culinary Collection</h2>
        <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Search and Sort Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 gap-4">
        <div className="relative flex-1 w-full">
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
          <input
            type="text"
            className="w-full bg-slate-50 pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Search meals..."
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <select 
          className="select bg-slate-50 font-bold border-none w-full md:w-auto"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {currentMeals.length > 0 ? (
        <>
          {/* Meal Cards */}
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {currentMeals.map((meal) => (
              <Card key={meal._id} meal={meal} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 my-16">
              {/* Previous Button */}
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="btn btn-circle btn-outline border-slate-200"
              >
                ❮
              </button>

              {/* Dynamic Page Number Buttons */}
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPage(idx + 1)} // This makes the specific page button functional
                  className={`w-10 h-10 rounded-xl font-bold transition-all ${page === idx + 1 ? 'bg-primary text-white shadow-lg' : 'bg-white border border-slate-100 hover:bg-slate-50'}`}
                >
                  {idx + 1}
                </button>
              ))}

              {/* Next Button */}
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="btn btn-circle btn-outline border-slate-200"
              >
                ❯
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="py-24 text-center">
          <p className="text-2xl font-bold text-slate-300 italic">No matches found for your search.</p>
        </div>
      )}
    </Container>
  );
};

export default Meal;
