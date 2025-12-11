// import React, { useState } from 'react';
// import Container from '../../Components/Shared/Container';
// import Heading from '../../Components/Shared/Heading';
// import Button from '../../Components/Shared/Button/Button';
// import PurchaseModal from '../../Components/Modal/PurchaseModal';

// const MealsDetails = () => {
//   let [isOpen, setIsOpen] = useState(false)

//   const closeModal = () => {
//     setIsOpen(false)
//   }


//     return (
//          <Container>
//       <div className='mx-auto flex flex-col lg:flex-row justify-between w-full gap-12'>
//         {/* Header */}
//         <div className='flex flex-col gap-6 flex-1'>
//           <div>
//             <div className='w-full overflow-hidden rounded-xl'>
//               <img
//                 className='object-cover w-full'
//                 src='https://i.ibb.co/DDnw6j9/1738597899-golden-money-plant.jpg'
//                 alt='header image'
//               />
//             </div>
//           </div>
//         </div>
//         <div className='md:gap-10 flex-1'>
//           {/* Plant Info */}
//           <Heading
//             title={'Money Meal'}
//             subtitle={`Category: ${'Succulent'}`}
//           />
//           <hr className='my-6' />
//           <div
//             className='
//           text-lg font-light text-neutral-500'
//           >
//             Professionally deliver sticky testing procedures for next-generation
//             portals. Objectively communicate just in time infrastructures
//             before.
//           </div>
//           <hr className='my-6' />

//           <div
//             className='
//                 text-xl 
//                 font-semibold 
//                 flex 
//                 flex-row 
//                 items-center
//                 gap-2
//               '
//           >
//             <div>Seller: Shakil Ahmed Atik</div>

//             <img
//               className='rounded-full'
//               height='30'
//               width='30'
//               alt='Avatar'
//               referrerPolicy='no-referrer'
//               src='https://lh3.googleusercontent.com/a/ACg8ocKUMU3XIX-JSUB80Gj_bYIWfYudpibgdwZE1xqmAGxHASgdvCZZ=s96-c'
//             />
//           </div>
//           <hr className='my-6' />
//           <div>
//             <p
//               className='
//                 gap-4 
//                 font-light
//                 text-neutral-500
//               '
//             >
//               Quantity: 10 Units Left Only!
//             </p>
//           </div>
//           <hr className='my-6' />
//           <div className='flex justify-between'>
//             <p className='font-bold text-3xl text-gray-500'>Price: 10$</p>
//             <div>
//               <Button onClick={() => setIsOpen(true)} label='Purchase' />
//             </div>
//           </div>
//           <hr className='my-6' />

//           <PurchaseModal closeModal={closeModal} isOpen={isOpen} />
//         </div>
//       </div>
//     </Container>
//     );
// };

// export default MealsDetails;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../Components/Shared/Container";
import Heading from "../../Components/Shared/Heading";
import Button from "../../Components/Shared/Button/Button";

const MealsDetails = () => {
  const navigate = useNavigate();
  const { mealId } = useParams(); // get meal ID from URL
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token"); // or your auth logic
    if (!token) {
      navigate("/login"); // redirect to login if not logged in
      return;
    }

    // Fetch meal details from API
    fetch(`/api/meals/${mealId}`)
      .then((res) => res.json())
      .then((data) => setMeal(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [mealId, navigate]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!meal) return <p className="text-center mt-10">Meal not found.</p>;

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">
        {/* Image */}
        <div className="flex-1">
          <div className="w-full overflow-hidden rounded-xl">
            <img
              className="object-cover w-full"
              src={meal.image}
              alt={meal.name}
            />
          </div>
        </div>

        {/* Meal Info */}
        <div className="flex-1 space-y-4">
          <Heading title={meal.name} subtitle={`Category: ${meal.category}`} />

          <p className="text-lg text-neutral-500">{meal.description}</p>

          <div className="flex items-center gap-2 text-xl font-semibold">
            <span>Chef: {meal.chefName}</span>
            <img
              src={meal.chefImage}
              alt="Chef Avatar"
              className="w-10 h-10 rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>

          <p className="text-gray-500">Chef Experience: {meal.chefExperience}</p>
          <p className="text-gray-500">Chef ID: {meal.chefId}</p>
          <p className="text-gray-500">Ingredients: {meal.ingredients.join(", ")}</p>
          <p className="text-gray-500">Delivery Area: {meal.deliveryArea}</p>
          <p className="text-gray-500">Estimated Delivery: {meal.estimatedDelivery} mins</p>
          <p className="font-bold text-3xl">Price: ${meal.price}</p>
          <p className="text-yellow-500">Rating: {meal.rating} ⭐</p>

          <Button
            label="Order Now"
            onClick={() => navigate(`/order/${meal._id}`)}
          />
        </div>
      </div>
    </Container>
  );
};

export default MealsDetails;
