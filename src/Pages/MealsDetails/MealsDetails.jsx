// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Container from "../../Components/Shared/Container";
// import Heading from "../../Components/Shared/Heading";
// import Button from "../../Components/Shared/Button/Button";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
// import { FaStar } from "react-icons/fa";

// const MealsDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { data: meal = {}, isLoading } = useQuery({
//     queryKey: ["meal", id],
//     queryFn: async () => {
//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/meals/${id}`);
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="text-center py-12 text-xl font-semibold">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   // Meal Data
//   const {
//     foodName,
//     chefName,
//     chefId,
//     image,
//     price,
//     rating,
//     description,
//     deliveryArea,
//     deliveryTime,
//     chefExperience,
//   } = meal;

//   return (
//     <Container>
//       <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12 my-12">

//         {/* Left — Image */}
//         <div className="flex-1">
//           <div className="w-full rounded-2xl overflow-hidden shadow-xl border">
//             <img
//               className="object-cover w-full h-[450px]"
//               src={image}
//               alt={foodName}
//             />
//           </div>
//         </div>

//         {/* Right — Details */}
//         <div className="flex-1 flex flex-col gap-6 mt-6 lg:mt-0">

//           {/* Title */}
//           <Heading
//             title={foodName}
//             subtitle={`Chef: ${chefName} (ID: ${chefId})`}
//           />

//           {/* Rating */}
//           <div className="flex items-center gap-2 mt-2">
//             <p className="font-semibold text-white-700 text-lg">Rating:</p>

//             {[1, 2, 3, 4, 5].map((star) => (
//               <FaStar
//                 key={star}
//                 className={`text-xl ${rating >= star ? "text-yellow-400" : "text-white-700"
//                   }`}
//               />
//             ))}

//             <span className="text-white-700 ml-1">({rating}/5)</span>
//           </div>

//           <hr />

//           {/* Ingredients */}
//           <p className="text-lg text-white-700">
//             <span className="font-semibold">Ingredients:</span> {description}
//           </p>

//           <hr />

//           {/* Delivery Info */}
//           <p className="text-white-700">
//             <strong>Delivery Area:</strong> {deliveryArea}
//           </p>

//           <p className="text-white-700">
//             <strong>Estimated Delivery Time:</strong> {deliveryTime} mins
//           </p>

//           <hr />

//           {/* Chef Experience */}
//           <p className="text-white-700">
//             <strong>Chef Experience:</strong> {chefExperience} years
//           </p>

//           <hr />

//           {/* Price + Order Now */}
//           {/* <div className="flex justify-between items-center w-full mt-4">
//             <p className="font-bold text-3xl text-gray-700">
//               Price: ${price}
//             </p>

//             <div className="ml-auto">
//               <Button
//                 label="Order Now"
//                 onClick={() => navigate(`/order/${id}`)}
//               />
//             </div>
//           </div> */}

//           {/* Price + Order Now */}
//           <div className="w-full mt-4">
//             <div className="flex justify-between items-center">
//               <p className="font-bold text-3xl text-gray-700">
//                 Price: ${price}
//               </p>

//               <Button
//                 label="Order Now"
//                 onClick={() => navigate(`/order/${id}`)}
//               />
//             </div>

//             <hr className="my-6" />

//             {/* Price + Purchase Button */}
//             <div className="flex justify-between items-center">
//               <p className="font-bold text-3xl text-gray-500">
//                 Price: ${price}
//               </p>

//               <Button
//                 onClick={() => setIsOpen(true)}
//                 label="Purchase"
//               />
//             </div>

//             <hr className="my-6" />

//             <PurchaseModal
//               meal={meal}
//               closeModal={closeModal}
//               isOpen={isOpen}
//             />
//           </div>

//           <hr />
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default MealsDetails;



import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../../Components/Shared/Container";
import Heading from "../../Components/Shared/Heading";
import Button from "../../Components/Shared/Button/Button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import { FaStar } from "react-icons/fa";
import PurchaseModal from "../../Components/Modal/PurchaseModal";


const MealsDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();   // <-- ADDED

  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/meals/${id}`
      );
      return result.data;
    },
  });

  const closeModal = () => setIsOpen(false);

  if (isLoading) {
    return (
      <div className="text-center py-12 text-xl font-semibold">
        <LoadingSpinner />
      </div>
    );
  }

  const {
    foodName,
    chefName,
    chefId,
    image,
    price,
    quantity,
    rating,
    description,
    deliveryArea,
    deliveryTime,
    chefExperience,
  } = meal;

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12 my-12">

        {/* Left: Image */}
        <div className="flex-1">
          <div className="w-full rounded-2xl overflow-hidden shadow-xl border">
            <img
              className="object-cover w-full h-[450px]"
              src={image}
              alt={foodName}
            />
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex-1 flex flex-col gap-6 mt-6 lg:mt-0">

          <Heading
            title={foodName}
            subtitle={`Chef: ${chefName} (ID: ${chefId})`}
          />

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <p className="font-semibold text-gray-700 text-lg">Rating:</p>

            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`text-xl ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}

            <span className="text-gray-600 ml-1">({rating}/5)</span>
          </div>

          <hr />

          {/* Ingredients */}
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Ingredients:</span> {description}
          </p>

          <hr />

          {/* Delivery Info */}
          <p className="text-gray-700">
            <strong>Delivery Area:</strong> {deliveryArea}
          </p>
          <p className="text-gray-700">
            <strong>quantity:</strong> {quantity}
          </p>

          <p className="text-gray-700">
            <strong>Estimated Delivery Time:</strong> {deliveryTime} mins
          </p>

          <hr />

          <p className="text-gray-700">
            <strong>Chef Experience:</strong> {chefExperience} years
          </p>

          <hr />

          {/* Price + Order Button */}
          {/* <div className="w-full mt-4">
            <div className="flex justify-between items-center">
              <p className="font-bold text-3xl text-gray-700">
                Price: ${price}
              </p>

              <Button
                onClick={() => setIsOpen(true)}
                label="Purchase"
              />
            </div>

            <hr className="my-6" />

            <PurchaseModal
              meal={meal}
              closeModal={closeModal}
              isOpen={isOpen}
            />
          </div> */}

          {/* Price + Order Button */}
          <div className="w-full mt-4">
            <div className="flex items-center">
              <p className="font-bold text-3xl text-gray-700">
                Price: ${price}
              </p>

              {/* Push button to the right */}
              <div className="ml-auto">
                <Button
                  onClick={() => setIsOpen(true)}
                  label="Order"
                />
              </div>
            </div>

            <hr className="my-6" />

            <PurchaseModal
              meal={meal}
              closeModal={closeModal}
              isOpen={isOpen}
            />
          </div>


        </div>
      </div>
    </Container>
  );
};

export default MealsDetails;



