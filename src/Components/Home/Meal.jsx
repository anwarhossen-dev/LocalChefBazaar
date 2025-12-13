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


import React, { useState } from 'react';
import Container from '../Shared/Container';
import Card from './Card';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';

const Meal = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 3; // <-- 12 items per page

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ['meals'],
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/meals`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const totalPages = Math.ceil(meals.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentMeals = meals.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container>
      {currentMeals.length > 0 && (
        <>
          {/* Meal Cards */}
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {currentMeals.map((meal) => (
              <Card key={meal._id} meal={meal} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 my-12">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="btn"
              >
                Previous
              </button>

              <span className="px-4 py-2">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Meal;
