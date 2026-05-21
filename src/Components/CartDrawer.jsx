// d:/B12-assigment-11/LocalChefBazaar/src/components/CartDrawer.jsx
import React, { Fragment, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CartContext } from '../providers/CartContext';

const CartDrawer = () => {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);

    return (
        <Transition show={isCartOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[150]" onClose={() => setIsCartOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-2xl font-black text-gray-900 tracking-tight">Shopping Bag</Dialog.Title>
                                                <button
                                                    type="button"
                                                    className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
                                                    onClick={() => setIsCartOpen(false)}
                                                >
                                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {cart.length === 0 ? (
                                                            <div className="text-center py-20">
                                                                <p className="text-gray-400 italic">Your bag is empty.</p>
                                                                <button onClick={() => setIsCartOpen(false)} className="mt-4 text-green-600 font-bold hover:underline transition-all">Start Harvesting</button>
                                                            </div>
                                                        ) : (
                                                            cart.map((product) => (
                                                                <li key={product.id} className="flex py-6">
                                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100">
                                                                        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                                                                    </div>
                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div className="flex justify-between text-base font-bold text-gray-900">
                                                                            <h3>{product.name}</h3>
                                                                            <p className="ml-4">${(product.price * product.quantity).toFixed(2)}</p>
                                                                        </div>
                                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                                            <div className="flex items-center border rounded-lg overflow-hidden bg-gray-50">
                                                                                <button onClick={() => updateQuantity(product.id, -1)} className="px-2 py-1 hover:bg-gray-200 transition-colors">-</button>
                                                                                <span className="px-3 font-bold">{product.quantity}</span>
                                                                                <button onClick={() => updateQuantity(product.id, 1)} className="px-2 py-1 hover:bg-gray-200 transition-colors">+</button>
                                                                            </div>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => removeFromCart(product.id)}
                                                                                className="font-medium text-red-500 hover:text-red-400 transition-colors"
                                                                            >
                                                                                Remove
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-100 px-4 py-6 sm:px-6 bg-gray-50/50">
                                            <div className="flex justify-between text-lg font-black text-gray-900">
                                                <p>Subtotal</p>
                                                <p>${cartTotal.toFixed(2)}</p>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-400 tracking-wide">Shipping & taxes calculated at checkout.</p>
                                            <div className="mt-6">
                                                <button className="flex w-full items-center justify-center rounded-xl bg-gray-900 px-6 py-4 text-base font-bold text-white shadow-xl hover:bg-green-600 transition-all active:scale-95">
                                                    Go to Checkout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CartDrawer;