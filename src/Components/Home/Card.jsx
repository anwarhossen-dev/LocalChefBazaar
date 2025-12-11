// import { Link } from 'react-router'

// const Card = ({meal}) => {
//   const {_id, foodName, image, quantity, price, category, rating} = meal || {}
//   return (
//     <Link
//       to={`/Meals/${_id}`}
//       className='col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl'
//     >
//        <div className='flex flex-col gap-2 w-full'>
//         <div
//           className='
//               aspect-square 
//               w-full 
//               relative 
//               overflow-hidden 
//               rounded-xl
//             '
//         >
//           <img
//             className='
//                 object-cover 
//                 h-full 
//                 w-full 
//                 group-hover:scale-110 
//                 transition
//               '
//            // src='https://i.ibb.co.com/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg'
//            src={image}
//             alt='Meals Image'
//           />
//           <div
//             className='
//               absolute
//               top-3
//               right-3
//             '
//           ></div>
//         </div>
//         <div className='font-semibold text-lg'>{foodName}</div>
//         <div className='font-semibold text-lg'>Category: {category}</div>
//         <div className='font-semibold text-lg'>Quantity: {quantity}</div>
//         <div className='flex flex-row items-center gap-1'>
//           <div className='font-semibold'> Price: {price}$</div>
//         </div>
//       </div> 

//       <div className="meal-card border rounded shadow p-4 flex flex-col">
//       <img
//         src='https://i.ibb.co.com/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg'
//         alt='meal_name'
//         className="w-full h-40 object-cover rounded mb-2"
//       />
//       <h2 className="font-bold text-lg"> {foodName}</h2>
//       <p>Chef: meal chefName (ID: meal chefId)</p>
//       <p>Price: {price}</p>
//       <p>Rating: {rating}</p>
//       <p>Delivery Area: meal.deliveryArea</p>
//       <button
//        // onClick={handleSeeDetails}
//         className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" to='/mealsDetails'
//       >
//         See Details
//       </button>
//     </div>
//     </Link>
//   )
// }

// export default Card



import { Link } from "react-router-dom";

const Card = ({ meal }) => {
  const {
    _id,
    foodName,
    image,
    price,
    rating,
    chefName,
    chefId,
    deliveryArea,
  } = meal || {};

  return (
    <div className="col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl border">
      {/* Food Image */}
      <div className="aspect-square w-full relative overflow-hidden rounded-xl">
        <img
          className="object-cover h-full w-full group-hover:scale-110 transition"
          src={image}
          alt={foodName}
        />
      </div>

      {/* Food Name */}
      <h2 className="font-semibold text-xl mt-2">{foodName}</h2>

      {/* Chef Info */}
      <p className="text-gray-700">
        <span className="font-semibold">Chef:</span> {chefName} (ID: {chefId})
      </p>

      {/* Price */}
      <p className="font-semibold mt-1">Price: ${price}</p>

      {/* Rating */}
      <div className="flex items-center text-yellow-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {rating >= star ? "★" : "☆"}
          </span>
        ))}
        <span className="ml-2 text-gray-700">{rating}</span>
      </div>


      {/* Delivery Area */}
      <p className="text-gray-600">Delivery Area: {deliveryArea}</p>

      {/* See Details Button */}
      <Link to={`/mealsDetails/${_id}`}>
        <button className="mt-3 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          See Details
        </button>
      </Link>
    </div>
  );
};

export default Card;
