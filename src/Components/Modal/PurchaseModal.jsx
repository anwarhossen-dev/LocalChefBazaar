// import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
// import useAuth from '../../hooks/useAuth'
// import axios from 'axios'

// const PurchaseModal = ({ closeModal, isOpen, meal }) => {
//   const {user} = useAuth()

//   const {_id, foodName, category, price,description, image, ChefName} = meal || {}

//   const handlePayment = async () =>{
//     const paymentInfo = {
//       mealId: _id,
//       foodName, category, price, description, image, quantity: 1, ChefName,
//       customer:{
//         name: user?.displayName,
//         email: user?.email,
//         image: user?.photoURL,
//       },
//     }

//      const result = await axios.post(
//         `${import.meta.env.VITE_API_URL}/create-checkout-session`,paymentInfo
//       )

//       console.log(result)

//   }
//   // Total Price Calculation

//   return (
//     <Dialog
//       open={isOpen}
//       as='div'
//       className='relative z-10 focus:outline-none '
//       onClose={closeModal}
//     >
//       <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
//         <div className='flex min-h-full items-center justify-center p-4'>
//           <DialogPanel
//             transition
//             className='w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl'
//           >
//             <DialogTitle
//               as='h3'
//               className='text-lg font-medium text-center leading-6 text-gray-900'
//             >
//               Review Info Before Purchase
//             </DialogTitle>
//             <div className='mt-2'>
//               <p className='text-sm text-gray-500'>Food Name: {foodName}</p>
//             </div>
//             <div className='mt-2'>
//               <p className='text-sm text-gray-500'>Category: {category}</p>
//             </div>
//             <div className='mt-2'>
//               <p className='text-sm text-gray-500'>Customer: {user?.displayName}</p>
//             </div>

//             <div className='mt-2'>
//               <p className='text-sm text-gray-500'>Price: $ {price}</p>
//             </div>
//             <div className='mt-2'>
//               <p className='text-sm text-gray-500'>Available Quantity: 5</p>
//             </div>
//             <div className='flex mt-2 justify-around'>
//               <button
//               onClick={handlePayment}
//                 type='button'
//                 className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
//               >
//                 Pay
//               </button>
//               <button
//                 type='button'
//                 className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
//                 onClick={closeModal}
//               >
//                 Cancel
//               </button>
//             </div>
//           </DialogPanel>
//         </div>
//       </div>
//     </Dialog>
//   )
// }

// export default PurchaseModal


// import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
// import useAuth from '../../hooks/useAuth'
// import axios from 'axios'

// const PurchaseModal = ({ closeModal, isOpen, meal }) => {
//   const { user } = useAuth()

//   const { _id, foodName, category, price, description, image, ChefName, quantity } = meal || {}

//   const handlePayment = async () => {
//     try {
//       const paymentInfo = {
//         mealId: _id,
//         foodName,
//         category,
//         price,
//         description,
//         image,
//         quantity,
//         ChefName,
//         customer: {
//           name: user?.displayName,
//           email: user?.email,
//           image: user?.photoURL,
//         },
//       }

//       const result = await axios.post(
//         `${import.meta.env.VITE_API_URL}/create-checkout-session`,
//         paymentInfo
//       )

//       // ⬇️ Redirect to Stripe Checkout
//       window.location.replace(result.data.url)

//       closeModal() // Close modal after redirect
//     } catch (err) {
//       console.error("Payment error:", err)
//     }
//   }

//   return (
//     <Dialog
//       open={isOpen}
//       as='div'
//       className='relative z-10 focus:outline-none'
//       onClose={closeModal}
//     >
//       <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
//         <div className='flex min-h-full items-center justify-center p-4'>
//           <DialogPanel
//             transition
//             className='w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl'
//           >
//             <DialogTitle
//               as='h3'
//               className='text-lg font-medium text-center leading-6 text-gray-900'
//             >
//               Review Info Before Purchase
//             </DialogTitle>

//             <div className='mt-2 text-sm text-gray-500'>
//               <p>Food Name: {foodName}</p>
//               <p>Category: {category}</p>
//               <p>Customer: {user?.displayName}</p>
//               <p>Price: ${price}</p>
//               <p>Your Purchase Quantity: {quantity}</p>
//             </div>

//             <div className='flex mt-4 justify-around'>
//               <button
//                 onClick={handlePayment}
//                 type='button'
//                 className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none'
//               >
//                 Pay
//               </button>

//               <button
//                 type='button'
//                 onClick={closeModal}
//                 className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none'
//               >
//                 Cancel
//               </button>
//             </div>
//           </DialogPanel>
//         </div>
//       </div>
//     </Dialog>
//   )
// }

// export default PurchaseModal

// import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
// import useAuth from '../../hooks/useAuth'
// import axios from 'axios'

// const PurchaseModal = ({ closeModal, isOpen, meal }) => {
//   const { user } = useAuth()

//   const {
//     _id,
//     foodName,
//     category,
//     price,
//     description,
//     image,
//     ChefName,
//     quantity,
//   } = meal || {}

//   const handlePayment = async () => {
//   try {
//     const cleanPrice = Number(
//       String(price).replace(/[^0-9.]/g, '')
//     )

//     if (!cleanPrice || isNaN(cleanPrice)) {
//       console.error('Invalid price after cleaning:', price)
//       return
//     }

//     const paymentInfo = {
//       mealId: _id,
//       foodName: foodName || 'Meal Item',
//       category,
//       price: cleanPrice,
//       description,
//       image,
//       quantity: Number(quantity) || 1,
//       ChefName,
//       customer: {
//         name: user?.displayName,
//         email: user?.email,
//         image: user?.photoURL,
//       },
//     }

//     const res = await axios.post(
//       `${import.meta.env.VITE_API_URL}/create-checkout-session`,
//       paymentInfo
//     )

//     window.location.replace(res.data.url)
//     closeModal()
//   } catch (err) {
//     console.error('Payment error:', err.response?.data || err.message)
//   }
// }

//   return (
//     <Dialog open={isOpen} as='div' className='relative z-10' onClose={closeModal}>
//       <div className='fixed inset-0 z-10 flex items-center justify-center p-4'>
//         <DialogPanel className='w-full max-w-md bg-white p-6 rounded-2xl shadow-xl'>
//           <DialogTitle className='text-lg font-semibold text-center'>
//             Review Info Before Purchase
//           </DialogTitle>

//           <div className='mt-4 text-sm text-gray-600'>
//             <p>Food Name: {foodName}</p>
//             <p>Category: {category}</p>
//             <p>Customer: {user?.displayName}</p>
//             <p>Price: ${price}</p>
//             <p>Quantity: {quantity}</p>
//           </div>

//           <div className='flex justify-between mt-6'>
//             <button
//               onClick={handlePayment}
//               className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'
//             >
//               Pay
//             </button>

//             <button
//               onClick={closeModal}
//               className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600'
//             >
//               Cancel
//             </button>
//           </div>
//         </DialogPanel>
//       </div>
//     </Dialog>
//   )
// }

// export default PurchaseModal



import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const PurchaseModal = ({ isOpen, closeModal, meal, address }) => {
  const { user } = useAuth();

  const handlePayment = async () => {
    try {
      const paymentInfo = {
        mealId: meal._id,
        foodName: meal.foodName,
        description: meal.description,
        image: meal.image,
        price: Number(meal.price),
        quantity: Number(meal.quantity),
        address,
        customer: {
          name: user.displayName,
          email: user.email,
        },
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        paymentInfo
      );

      window.location.replace(res.data.url);
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-10">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
          <DialogTitle className="text-lg font-bold text-center">
            Review Before Payment
          </DialogTitle>

          <div className="mt-4 text-sm text-gray-600">
            <p>Food: {meal.foodName}</p>
            <p>Price: ${meal.price}</p>
            <p>Quantity: {meal.quantity}</p>
            <p>Customer: {user.displayName}</p>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePayment}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Pay Now
            </button>

            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
