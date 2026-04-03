import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaTrash, FaCashRegister, FaCreditCard, FaReceipt, FaSearch } from 'react-icons/fa';
import { MdPayment, MdDiscount } from 'react-icons/md';
import { toast } from 'react-toastify';

const POSSystem = () => {
    const [cart, setCart] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [discount, setDiscount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Demo menu items
    const menuItems = [
        { id: 1, name: 'Chicken Burger', price: 12.99, category: 'burgers', image: '' },
        { id: 2, name: 'Beef Pizza', price: 18.99, category: 'pizza', image: '' },
        { id: 3, name: 'Caesar Salad', price: 8.99, category: 'salads', image: '' },
        { id: 4, name: 'Grilled Salmon', price: 24.99, category: 'seafood', image: '' },
        { id: 5, name: 'Pasta Carbonara', price: 16.99, category: 'pasta', image: '' },
        { id: 6, name: 'Chocolate Cake', price: 6.99, category: 'desserts', image: '' },
        { id: 7, name: 'Coffee', price: 3.99, category: 'beverages', image: '' },
        { id: 8, name: 'French Fries', price: 4.99, category: 'sides', image: '' }
    ];

    const categories = ['all', 'burgers', 'pizza', 'salads', 'seafood', 'pasta', 'desserts', 'beverages', 'sides'];

    const tables = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        capacity: Math.floor(Math.random() * 6) + 2
    }));

    const addToCart = (item) => {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
        toast.success(`${item.name} added to cart`);
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity === 0) {
            setCart(cart.filter(item => item.id !== id));
        } else {
            setCart(cart.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
        toast.info('Item removed from cart');
    };

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * 0.1; // 10% tax
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const tax = calculateTax();
        const discountAmount = subtotal * (discount / 100);
        return subtotal + tax - discountAmount;
    };

    const processPayment = () => {
        if (cart.length === 0) {
            toast.error('Cart is empty');
            return;
        }

        if (!selectedTable) {
            toast.error('Please select a table');
            return;
        }

        // Simulate payment processing
        toast.success(`Payment of $${calculateTotal().toFixed(2)} processed successfully!`);
        
        // Save order to localStorage
        const order = {
            id: Date.now(),
            table: selectedTable,
            items: cart,
            subtotal: calculateSubtotal(),
            tax: calculateTax(),
            discount: discount,
            total: calculateTotal(),
            paymentMethod: paymentMethod,
            timestamp: new Date().toISOString(),
            status: 'completed'
        };

        const existingOrders = JSON.parse(localStorage.getItem('posOrders') || '[]');
        localStorage.setItem('posOrders', JSON.stringify([...existingOrders, order]));

        // Reset cart and selections
        setCart([]);
        setSelectedTable(null);
        setDiscount(0);
        setPaymentMethod('cash');
    };

    const filteredItems = menuItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-base-100 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FaCashRegister className="text-primary" />
                        POS System
                    </h1>
                    <div className="text-sm text-gray-500">
                        {new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Menu Items Section */}
                    <div className="lg:col-span-2">
                        {/* Search and Filter */}
                        <div className="mb-4 space-y-4">
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search menu items..."
                                    className="input input-bordered w-full pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`btn btn-sm ${selectedCategory === category ? 'btn-primary' : 'btn-outline'}`}
                                    >
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Menu Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredItems.map(item => (
                                <div
                                    key={item.id}
                                    className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                                    onClick={() => addToCart(item)}
                                >
                                    <figure className="px-4 pt-4">
                                        <div className="w-full h-24 bg-gray-300 rounded-lg flex items-center justify-center">
                                            <span className="text-gray-500 text-xs">Image</span>
                                        </div>
                                    </figure>
                                    <div className="card-body p-4">
                                        <h3 className="font-semibold text-sm">{item.name}</h3>
                                        <p className="text-primary font-bold">${item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cart and Payment Section */}
                    <div className="space-y-6">
                        {/* Table Selection */}
                        <div className="card bg-base-200 shadow-md">
                            <div className="card-body">
                                <h3 className="card-title text-lg">Select Table</h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {tables.slice(0, 12).map(table => (
                                        <button
                                            key={table.id}
                                            onClick={() => setSelectedTable(table.id)}
                                            className={`btn btn-sm ${
                                                selectedTable === table.id 
                                                    ? 'btn-primary' 
                                                    : table.status === 'occupied' 
                                                        ? 'btn-error' 
                                                        : 'btn-outline'
                                            }`}
                                            disabled={table.status === 'occupied'}
                                        >
                                            {table.id}
                                        </button>
                                    ))}
                                </div>
                                {selectedTable && (
                                    <div className="mt-2 text-sm text-success">
                                        Table {selectedTable} selected
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Cart */}
                        <div className="card bg-base-200 shadow-md">
                            <div className="card-body">
                                <h3 className="card-title text-lg">Order Summary</h3>
                                
                                {cart.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">Cart is empty</p>
                                ) : (
                                    <div className="space-y-2 max-h-64 overflow-y-auto">
                                        {cart.map(item => (
                                            <div key={item.id} className="flex items-center justify-between bg-base-100 p-2 rounded">
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm">{item.name}</p>
                                                    <p className="text-xs text-gray-500">${item.price} each</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="btn btn-xs btn-circle"
                                                    >
                                                        <FaMinus />
                                                    </button>
                                                    <span className="w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="btn btn-xs btn-circle"
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="btn btn-xs btn-circle btn-error ml-2"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {cart.length > 0 && (
                                    <div className="space-y-4 mt-4">
                                        {/* Discount */}
                                        <div className="flex items-center gap-2">
                                            <MdDiscount />
                                            <input
                                                type="number"
                                                placeholder="Discount %"
                                                className="input input-sm input-bordered flex-1"
                                                value={discount}
                                                onChange={(e) => setDiscount(Number(e.target.value))}
                                                min="0"
                                                max="100"
                                            />
                                        </div>

                                        {/* Payment Method */}
                                        <div className="space-y-2">
                                            <label className="label-text font-medium">Payment Method</label>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setPaymentMethod('cash')}
                                                    className={`btn btn-sm flex-1 ${paymentMethod === 'cash' ? 'btn-primary' : 'btn-outline'}`}
                                                >
                                                    <FaCashRegister /> Cash
                                                </button>
                                                <button
                                                    onClick={() => setPaymentMethod('card')}
                                                    className={`btn btn-sm flex-1 ${paymentMethod === 'card' ? 'btn-primary' : 'btn-outline'}`}
                                                >
                                                    <FaCreditCard /> Card
                                                </button>
                                            </div>
                                        </div>

                                        {/* Totals */}
                                        <div className="space-y-1 text-sm">
                                            <div className="flex justify-between">
                                                <span>Subtotal:</span>
                                                <span>${calculateSubtotal().toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Tax (10%):</span>
                                                <span>${calculateTax().toFixed(2)}</span>
                                            </div>
                                            {discount > 0 && (
                                                <div className="flex justify-between text-success">
                                                    <span>Discount ({discount}%):</span>
                                                    <span>-${(calculateSubtotal() * (discount / 100)).toFixed(2)}</span>
                                                </div>
                                            )}
                                            <div className="divider my-2"></div>
                                            <div className="flex justify-between font-bold text-lg">
                                                <span>Total:</span>
                                                <span>${calculateTotal().toFixed(2)}</span>
                                            </div>
                                        </div>

                                        {/* Payment Button */}
                                        <button
                                            onClick={processPayment}
                                            className="btn btn-primary w-full"
                                        >
                                            <MdPayment /> Process Payment
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default POSSystem;