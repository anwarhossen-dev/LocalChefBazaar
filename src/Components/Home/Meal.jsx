import React from 'react';
import Container from '../Shared/Container';
import Card from './Card';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { data } from 'react-router';

const Meal = () => {
  
  const {data: meals = [], isLoading, isError} = useQuery({
    queryKey: ['meals'],
    queryFn: async()=>{
      const result = await axios(`${import.meta.env.VITE_API_URL}/meals`)
      return result.data
    },
  })

  console.log(data)
  if (isLoading) return <LoadingSpinner/>
    return (
        <Container>
      {
        meals && meals.length>0 ? (
          <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8'>
        {
          meals.map(meal=><Card key={meal._id} meal={meal}/>)
        }
      </div>
        ): null
      }

      
    </Container>
    );
};

export default Meal;