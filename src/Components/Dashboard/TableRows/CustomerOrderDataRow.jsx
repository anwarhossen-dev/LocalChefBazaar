import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'


const CustomerOrderDataRow = ({order}) => {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

   const {
    _id,
    meal_Name,
    price,
    quantity,
    orderStatus,
    paymentStatus,
    orderTime,
    chefName,
    chefId,
    image,
  } = order || {};
  

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src='https://i.ibb.co.com/rMHmQP2/money-plant-in-feng-shui-brings-luck.jpg'
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
        </div>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{_id}  </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{meal_Name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>${price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{quantity}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{orderStatus}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{paymentStatus}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{orderTime}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{chefName}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{chefId}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{image}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={() => setIsOpen(true)}
          className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
        >
          <span className='absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full'></span>
          <span className='relative cursor-pointer'>Cancel</span>
        </button>

        <DeleteModal isOpen={isOpen} closeModal={closeModal} />
      </td>
    </tr>
  )
}

export default CustomerOrderDataRow



// import { useState } from "react";
// import DeleteModal from "../../Modal/DeleteModal";
// import { Link } from "react-router-dom";

// const CustomerOrderDataRow = ({ order }) => {
//   let [isOpen, setIsOpen] = useState(false);
//   const closeModal = () => setIsOpen(false);

//   const {
//     _id,
//     mealName,
//     price,
//     quantity,
//     orderStatus,
//     paymentStatus,
//     orderTime,
//     chefName,
//     chefId,
//     image,
//   } = order || {};

//   const deliveryDate = new Date(orderTime).toLocaleString();

//   return (
//     <tr className="bg-white border-b text-sm">
//       {/* IMAGE */}
//       <td className="px-5 py-5">
//         <img
//           src={image}
//           alt="meal"
//           className="h-12 w-16 object-cover rounded-md"
//         />
//       </td>

//       {/* CHEF ID */}
//       <td className="px-5 py-5">
//         <p className="font-medium text-gray-700">{chefId}</p>
//       </td>

//       {/* MEAL NAME */}
//       <td className="px-5 py-5">
//         <p className="font-medium">{mealName}</p>
//       </td>

//       {/* PRICE */}
//       <td className="px-5 py-5">
//         <p>${price}</p>
//       </td>

//       {/* QUANTITY */}
//       <td className="px-5 py-5">
//         <p>{quantity}</p>
//       </td>

//       {/* ORDER STATUS */}
//       <td className="px-5 py-5">
//         <span
//           className={`px-3 py-1 rounded-full text-xs font-semibold ${
//             orderStatus === "accepted"
//               ? "bg-green-200 text-green-900"
//               : orderStatus === "pending"
//               ? "bg-yellow-200 text-yellow-900"
//               : "bg-gray-300 text-gray-700"
//           }`}
//         >
//           {orderStatus}
//         </span>
//       </td>

//       {/* DELIVERY TIME */}
//       <td className="px-5 py-5 text-gray-700">
//         <p>{deliveryDate}</p>
//       </td>

//       {/* PAYMENT STATUS */}
//       <td className="px-5 py-5">
//         <span
//           className={`px-3 py-1 rounded-full text-xs font-semibold ${
//             paymentStatus === "paid"
//               ? "bg-blue-200 text-blue-900"
//               : "bg-red-200 text-red-900"
//           }`}
//         >
//           {paymentStatus}
//         </span>
//       </td>

//       {/* PAY BUTTON */}
//       <td className="px-5 py-5">
//         {orderStatus === "accepted" && paymentStatus === "pending" && (
//           <Link to={`/payment/${_id}`}>
//             <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//               Pay
//             </button>
//           </Link>
//         )}
//       </td>

//       {/* CANCEL BUTTON */}
//       <td className="px-5 py-5">
//         <button
//           onClick={() => setIsOpen(true)}
//           className="px-3 py-1 bg-red-200 text-red-900 rounded-full font-semibold"
//         >
//           Cancel
//         </button>

//         {/* CANCEL MODAL */}
//         <DeleteModal isOpen={isOpen} closeModal={closeModal} orderId={_id} />
//       </td>
//     </tr>
//   );
// };

// export default CustomerOrderDataRow;
