// import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react'
// const BecomeSellerModal = ({ closeModal, isOpen }) => {
//   return (
//     <Dialog
//       open={isOpen}
//       as='div'
//       className='relative z-10 focus:outline-none '
//       onClose={close}
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
//               Become A Chef!
//             </DialogTitle>
//             <div className='mt-2'>
//               <p className='text-sm text-gray-500'>
//                 Please read all the terms & conditions before becoming a Chef.
//               </p>
//             </div>
//             <hr className='mt-8 ' />
//             <div className='flex mt-2 justify-around'>
//               <button
//                 type='button'
//                 className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
//               >
//                 Continue
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

// export default BecomeSellerModal

// src/Components/Modal/BecomeSellerModal.jsx
import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react';

const BecomeSellerModal = ({ closeModal, isOpen, onContinue, requestType }) => {
  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10 focus:outline-none'
      onClose={closeModal}
    >
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl'
          >
            <DialogTitle
              as='h3'
              className='text-lg font-medium text-center leading-6 text-gray-900'
            >
              Become {requestType === 'chef' ? 'A Chef' : 'An Admin'}!
            </DialogTitle>
            <div className='mt-2'>
              <p className='text-sm text-gray-500'>
                Please read all the terms & conditions before becoming {requestType === 'chef' ? 'a Chef' : 'an Admin'}.
              </p>
              <div className='mt-4 p-4 bg-gray-50 rounded-lg max-h-60 overflow-y-auto'>
                <ul className='list-disc list-inside text-sm text-gray-600 space-y-2'>
                  {requestType === 'chef' ? (
                    <>
                      <li>You must provide accurate meal information</li>
                      <li>Maintain food quality and hygiene standards</li>
                      <li>Respond to orders within 24 hours</li>
                      <li>Honor the estimated delivery times</li>
                      <li>Accept responsibility for food safety</li>
                      <li>Comply with local food regulations</li>
                    </>
                  ) : (
                    <>
                      <li>You will have access to manage all users</li>
                      <li>Handle role requests responsibly</li>
                      <li>Monitor platform activity</li>
                      <li>Ensure fair treatment of all users</li>
                      <li>Maintain platform integrity</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <hr className='mt-8' />
            <div className='flex mt-2 justify-around'>
              <button
                type='button'
                onClick={onContinue}
                className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
              >
                Continue
              </button>
              <button
                type='button'
                className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default BecomeSellerModal;