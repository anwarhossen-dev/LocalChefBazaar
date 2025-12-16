// import { useState } from 'react'
// import DeleteModal from '../../Modal/DeleteModal'


// const CustomerOrderDataRow = ({order}) => {
//   let [isOpen, setIsOpen] = useState(false)
//   const closeModal = () => setIsOpen(false)

//    const {
//     _id,
//     meal_Name,
//     price,
//     quantity,
//     orderStatus,
//     paymentStatus,
//     orderTime,
//     chefName,
//     chefId,
//     image,
//   } = order || {};


//   return (
//     <tr>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <div className='flex items-center'>
//           <div className='shrink-0'>
//             <div className='block relative'>
//               <img
//                 alt='profile'
//                 src={image}
//                 className='mx-auto object-cover rounded h-10 w-15 '
//               />
//             </div>
//           </div>
//         </div>
//       </td>

//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900'>{_id}  </p>
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900'>{meal_Name}</p>
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900'>${price}</p>
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900'>{quantity}</p>
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900'>{orderStatus}</p>
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900'>{paymentStatus}</p>
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900'>{orderTime}</p>
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900'>{chefName}</p>
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900'>{chefId}</p>
//       </td>
//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <p className='text-gray-900'>{image}</p>
//       </td>

//       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
//         <button
//           onClick={() => setIsOpen(true)}
//           className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
//         >
//           <span className='absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full'></span>
//           <span className='relative cursor-pointer'>Cancel</span>
//         </button>

//         <DeleteModal isOpen={isOpen} closeModal={closeModal} />
//       </td>
//     </tr>
//   )
// }

// export default CustomerOrderDataRow

// import { useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { format } from "date-fns";
// import { useMutation } from "@tanstack/react-query";

// const CustomerOrderDataRow = ({ order, refetch }) => {
//   const axiosSecure = useAxiosSecure();
//   const [loading, setLoading] = useState(false);

//   const {
//     _id,
//     FoodName,
//     OrderStatus,
//     Price ,
//     DeliveryTime,
//     ChefName,
//     ChefId,
//     PaymentStatus,
//     image,
//   } = order || {};

//   // ✅ React Query v5 mutation
//   const updateStatus = useMutation({
//     mutationFn: async (newStatus) => {
//       setLoading(true);
//       const res = await axiosSecure.patch(`/orders/${_id}`, {
//         orderStatus: newStatus,
//       });
//       return res.data;
//     },
//     onSuccess: () => {
//       setLoading(false);
//       refetch(); // live update
//     },
//     onError: () => {
//       setLoading(false);
//     },
//   });

//   return (
//     <tr>
//       <td className="px-5 py-5 border-b bg-white text-sm">
//         <img src={image} alt="meal" className="h-10 w-16 rounded object-cover" />
//       </td>

//       <td className="px-5 py-5 border-b bg-white text-sm">{FoodName}</td>
//       <td className="px-5 py-5 border-b bg-white text-sm">{OrderStatus}</td>
//       <td className="px-5 py-5 border-b bg-white text-sm">${Price}</td>
//       <td className="px-5 py-5 border-b bg-white text-sm">{DeliveryTime}</td>
//       <td className="px-5 py-5 border-b bg-white text-sm">
//         {/* {format(new Date(orderTime), "dd MMM yyyy, hh:mm a")} */}
//       </td>
//       <td className="px-5 py-5 border-b bg-white text-sm">{ChefName}</td>
//       <td className="px-5 py-5 border-b bg-white text-sm">{ChefId}</td>
//       <td className="px-5 py-5 border-b bg-white text-sm">{PaymentStatus}</td>
//     </tr>
//   );
// };

// export default CustomerOrderDataRow;

import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CustomerOrderDataRow = ({ order }) => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // const {
  //   _id,
  //   FoodName,
  //   OrderStatus,
  //   Price,
  //   DeliveryTime,
  //   ChefName,
  //   ChefId,
  //   PaymentStatus,
  //   image,
  // } = order || {};

  const {
    _id,
    name,
    orderStatus,
    price,
    quantity,
    orderTime,
    chefName,
    chefId,
    paymentStatus,
    image,
  } = order || {};


  // ✅ Handle Pay Button
  const handlePay = async () => {
    try {
      const res = await axiosSecure.post("/create-payment-intent", {
        orderId: _id,
        price: price,
      });

      navigate(`/dashboard/payment/${_id}`, {
        state: {
          clientSecret: res.data.clientSecret,
          order,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <tr>
    //   <td className="px-5 py-5 border-b bg-white text-sm">
    //     <img src={image} alt="meal" className="h-10 w-16 rounded object-cover" />
    //   </td>

    //   <td className="px-5 py-5 border-b bg-white text-black-400 text-sm">{FoodName}</td>
    //   <td className="px-5 py-5 border-b bg-white text-black-400 text-sm">{OrderStatus}</td>
    //   <td className="px-5 py-5 border-b bg-white text-black-400 text-sm">${Price}</td>
    //   <td className="px-5 py-5 border-b bg-white text-black-400 text-sm">{DeliveryTime}</td>
    //   <td className="px-5 py-5 border-b bg-white text-black-400 text-sm">{ChefName}</td>
    //   <td className="px-5 py-5 border-b bg-white text-black-400 text-sm">{ChefId}</td>

    //   <td className="px-5 py-5 border-b bg-white text-sm">
    //     <span
    //       className={`font-semibold ${
    //         PaymentStatus === "paid" ? "text-green-600" : "text-red-500"
    //       }`}
    //     >
    //       {PaymentStatus}
    //     </span>
    //   </td>

    //   {/* ✅ PAYMENT BUTTON COLUMN */}
    //   <td className="px-5 py-5 border-b bg-white text-sm">
    //     {OrderStatus === "accepted" && PaymentStatus === "pending" && (
    //       <button
    //         onClick={handlePay}
    //         className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
    //       >
    //         Pay
    //       </button>
    //     )}

    //     {PaymentStatus === "paid" && (
    //       <span className="text-green-600 font-medium">Paid</span>
    //     )}
    //   </td>
    // </tr>

    <tr className="mx-auto">
      <td className="px-2 py-2 border-b  text-sm">
        <img src={image} alt="meal" className="h-10 w-16 rounded object-cover" />
      </td>

      <td className="px-2 py-2 border-b bg-white font-black text-sm">{name}</td>

      <td className="px-2 py-2 border-b bg-white font-black text-sm capitalize">
        {orderStatus}
      </td>

      <td className="px-2 py-2 border-b bg-white font-black text-xl">
        ${price}
      </td>

      <td className="px-2 py-2 border-b bg-white font-black text-sm">
        {quantity}
      </td>

      <td className="px-2 py-2 border-b bg-white font-black text-sm">
        {new Date(orderTime).toLocaleString()}
      </td>

      <td className="px-5 py-5 border-b bg-white font-black text-sm">{chefName}</td>

      <td className="px-5 py-5 border-b bg-white font-black text-sm">{chefId}</td>

      <td className="px-5 py-5 border-b bg-white font-black text-sm">
        <span
          className={`font-semibold ${paymentStatus === "paid"
              ? "text-green-600"
              : "text-red-500"
            }`}
        >
          {paymentStatus}
        </span>
      </td>

      <td className="px-5 py-5 border-b bg-white text-sm">
        {orderStatus === "accepted" && paymentStatus === "pending" && (
          <button
            onClick={handlePay}
            className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Pay
          </button>
        )}

        {paymentStatus === "paid" && (
          <span className="text-green-600 font-medium">Paid</span>
        )}
      </td>
    </tr>

  );
};

export default CustomerOrderDataRow;

