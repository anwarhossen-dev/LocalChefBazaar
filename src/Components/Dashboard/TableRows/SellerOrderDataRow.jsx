import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
const SellerOrderDataRow = ({ order }) => {
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

  const { name, price, quantity, status, customer } = order || {}

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{customer}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>${price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{quantity}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{status}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center gap-2'>
          <select
            required
            defaultValue={status}
            className='p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900  bg-white'
            name='category'
          >
            <option value='Pending'>Pending</option>
            <option value='In Progress'>Start Processing</option>
            <option value='Delivered'>Deliver</option>
          </select>
          <button
            onClick={() => setIsOpen(true)}
            className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
          >
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
            ></span>
            <span className='relative'>Cancel</span>
          </button>
        </div>
        <DeleteModal isOpen={isOpen} closeModal={closeModal} />
      </td>
    </tr>
  )
}

export default SellerOrderDataRow


// import { useState } from "react";
// import DeleteModal from "../../Modal/DeleteModal";
// import axios from "axios";
// import { toast } from "react-toastify";

// const SellerOrderDataRow = ({ order, refetch }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const closeModal = () => setIsOpen(false);

//   const {
//     _id,
//     name,
//     customer,
//     price,
//     quantity,
//     address,
//     status,
//     orderTime,
//     paymentStatus,
//   } = order;

//   // -------- BUTTON CONDITIONS ----------
//   const isCancelled = status === "cancelled";
//   const isAccepted = status === "accepted";
//   const isDelivered = status === "delivered";

//   const disableCancel = isCancelled || isDelivered;
//   const disableAccept = isCancelled || isAccepted || isDelivered;
//   const disableDeliver = !isAccepted || isCancelled || isDelivered;

//   // -------- API CALL FUNCTION ----------
//   const updateStatus = async (newStatus) => {
//     try {
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/orders/status/${_id}`,
//         { status: newStatus }
//       );

//       toast.success(`Order ${newStatus} successfully`);
//       refetch(); // refresh table
//     } catch (error) {
//       toast.error("Failed to update status");
//     }
//   };

//   return (
//     <tr>
//       <td className="px-5 py-5 border-b bg-white text-sm">{name}</td>
//       <td className="px-5 py-5 border-b bg-white text-sm">{customer}</td>
//       <td className="px-5 py-5 border-b bg-white text-sm">${price}</td>
//       <td className="px-5 py-5 border-b bg-white text-sm">{quantity}</td>
//       <td className="px-5 py-5 border-b bg-white text-sm">{address}</td>
//       <td className="px-5 py-5 border-b bg-white text-sm capitalize">
//         {status}
//       </td>

//       <td className="px-5 py-5 border-b bg-white text-sm">

//         <div className="flex gap-2 items-center">

//           {/* CANCEL BUTTON */}
//           <button
//             disabled={disableCancel}
//             onClick={() => updateStatus("cancelled")}
//             className={`px-3 py-1 rounded text-sm font-semibold 
//               ${disableCancel
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-red-500 text-white hover:bg-red-600"}
//             `}
//           >
//             Cancel
//           </button>

//           {/* ACCEPT BUTTON */}
//           <button
//             disabled={disableAccept}
//             onClick={() => updateStatus("accepted")}
//             className={`px-3 py-1 rounded text-sm font-semibold 
//               ${disableAccept
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-blue-500 text-white hover:bg-blue-600"}
//             `}
//           >
//             Accept
//           </button>

//           {/* DELIVER BUTTON */}
//           <button
//             disabled={disableDeliver}
//             onClick={() => updateStatus("delivered")}
//             className={`px-3 py-1 rounded text-sm font-semibold 
//               ${disableDeliver
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-green-500 text-white hover:bg-green-600"}
//             `}
//           >
//             Deliver
//           </button>
//         </div>

//         <DeleteModal isOpen={isOpen} closeModal={closeModal} />
//       </td>
//     </tr>
//   );
// };

// export default SellerOrderDataRow;
