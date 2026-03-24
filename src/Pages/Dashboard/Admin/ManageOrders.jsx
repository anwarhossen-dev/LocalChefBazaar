import React, { useState, useMemo } from "react";
import { FaEye, FaEdit, FaCheck, FaTimes, FaSort, FaSortUp, FaSortDown, FaSearch } from "react-icons/fa";

const ManageOrders = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [sortField, setSortField] = useState('orderDate');
    const [sortDirection, setSortDirection] = useState('desc');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPayment, setFilterPayment] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [editingOrder, setEditingOrder] = useState(null);

    // Load all orders from localStorage (in real app, this would be from admin API)
    const allOrders = useMemo(() => {
        const userOrders = JSON.parse(localStorage.getItem('demoOrders') || '[]');
        
        // Add some additional demo orders for admin view
        const adminDemoOrders = [
            {
                orderId: "ORD-1642345678905",
                mealName: "Caesar Salad",
                chefName: "Chef Robert",
                price: 14.99,
                quantity: 1,
                totalPrice: 14.99,
                status: "preparing",
                orderDate: "2024-01-18T10:30:00Z",
                deliveryAddress: "555 Broadway, Central",
                customerName: "Alice Johnson",
                customerEmail: "alice@example.com",
                phone: "+1-555-0123",
                mealImage: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400",
                estimatedDelivery: "25-35 mins",
                paymentMethod: "online",
                paymentStatus: "paid"
            },
            {
                orderId: "ORD-1642345678906",
                mealName: "Spaghetti Bolognese",
                chefName: "Chef Marco",
                price: 19.99,
                quantity: 2,
                totalPrice: 39.98,
                status: "pending",
                orderDate: "2024-01-18T11:15:00Z",
                deliveryAddress: "777 Oak Street, Westside",
                customerName: "Bob Smith",
                customerEmail: "bob@example.com",
                phone: "+1-555-0456",
                mealImage: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400",
                estimatedDelivery: "35-45 mins",
                paymentMethod: "cash",
                paymentStatus: "pending"
            }
        ];

        return [...userOrders, ...adminDemoOrders];
    }, []);

    // Filter and search orders
    const filteredOrders = allOrders.filter(order => {
        const statusMatch = filterStatus === 'all' || order.status === filterStatus;
        const paymentMatch = filterPayment === 'all' || order.paymentMethod === filterPayment;
        const searchMatch = searchTerm === '' || 
            order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.mealName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase());
        
        return statusMatch && paymentMatch && searchMatch;
    });

    // Sort orders
    const sortedOrders = [...filteredOrders].sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (sortField === 'orderDate') {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
        }

        if (sortField === 'totalPrice') {
            aValue = parseFloat(aValue);
            bValue = parseFloat(bValue);
        }

        if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getSortIcon = (field) => {
        if (sortField !== field) return <FaSort className="opacity-50" />;
        return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "delivered":
                return "bg-green-100 text-green-800";
            case "preparing":
                return "bg-blue-100 text-blue-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        document.getElementById("orderModal").showModal();
    };

    const handleUpdateStatus = (order, newStatus) => {
        alert(`Order ${order.orderId} status would be updated to: ${newStatus} (Demo functionality)`);
    };

    const handleEditOrder = (order) => {
        setEditingOrder(order);
        document.getElementById("editModal").showModal();
    };

    // Statistics
    const stats = {
        total: allOrders.length,
        pending: allOrders.filter(o => o.status === 'pending').length,
        preparing: allOrders.filter(o => o.status === 'preparing').length,
        delivered: allOrders.filter(o => o.status === 'delivered').length,
        cancelled: allOrders.filter(o => o.status === 'cancelled').length,
        totalRevenue: allOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0)
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Orders</h2>
                <div className="text-sm text-gray-600">
                    Total Orders: {stats.total} | Revenue: ${stats.totalRevenue.toFixed(2)}
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                    <div className="text-sm text-gray-600">Total Orders</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.preparing}</div>
                    <div className="text-sm text-gray-600">Preparing</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.delivered}</div>
                    <div className="text-sm text-gray-600">Delivered</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
                    <div className="text-sm text-gray-600">Cancelled</div>
                </div>
            </div>

            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded">
                <p className="text-sm text-yellow-800">
                    <strong>Admin Demo:</strong> This shows all orders from the system. In a real application, this would connect to your order management API.
                </p>
            </div>

            {/* Filters and Search */}
            <div className="mb-6 flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-64">
                    <label className="block text-sm font-medium mb-1">Search Orders</label>
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by Order ID, Meal, Customer..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input input-bordered w-full pl-10"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="select select-bordered"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="preparing">Preparing</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Payment</label>
                    <select
                        value={filterPayment}
                        onChange={(e) => setFilterPayment(e.target.value)}
                        className="select select-bordered"
                    >
                        <option value="all">All Payment</option>
                        <option value="cash">Cash on Delivery</option>
                        <option value="online">Online Payment</option>
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th 
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('orderId')}
                            >
                                <div className="flex items-center gap-2">
                                    Order ID {getSortIcon('orderId')}
                                </div>
                            </th>
                            <th>Customer</th>
                            <th>Meal</th>
                            <th 
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('orderDate')}
                            >
                                <div className="flex items-center gap-2">
                                    Date {getSortIcon('orderDate')}
                                </div>
                            </th>
                            <th 
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('totalPrice')}
                            >
                                <div className="flex items-center gap-2">
                                    Total {getSortIcon('totalPrice')}
                                </div>
                            </th>
                            <th 
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort('status')}
                            >
                                <div className="flex items-center gap-2">
                                    Status {getSortIcon('status')}
                                </div>
                            </th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOrders.map((order, index) => (
                            <tr key={order.orderId || `order-${index}`} className="hover:bg-gray-50">
                                <td>
                                    <div className="font-mono text-sm">
                                        #{order.orderId || order._id}
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-semibold">{order.customerName || 'Customer'}</div>
                                        <div className="text-sm text-gray-500">{order.customerEmail}</div>
                                        <div className="text-xs text-gray-400">{order.phone}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={order.mealImage}
                                            alt={order.mealName}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                        <div>
                                            <div className="font-semibold">{order.mealName}</div>
                                            <div className="text-sm text-gray-500">by {order.chefName}</div>
                                            <div className="text-xs text-gray-400">Qty: {order.quantity}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="text-sm">
                                        {new Date(order.orderDate).toLocaleDateString()}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {new Date(order.orderDate).toLocaleTimeString()}
                                    </div>
                                </td>
                                <td>
                                    <div className="font-semibold text-green-600">
                                        ${order.totalPrice}
                                    </div>
                                </td>
                                <td>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="text-sm">
                                        <div>{order.paymentMethod === 'cash' ? 'Cash' : 'Online'}</div>
                                        <span className={`px-2 py-1 rounded text-xs ${
                                            order.paymentStatus === 'paid' 
                                                ? 'bg-green-100 text-green-800' 
                                                : order.paymentStatus === 'refunded'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {order.paymentStatus || 'pending'}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => handleViewDetails(order)}
                                            className="btn btn-xs btn-primary"
                                            title="View Details"
                                        >
                                            <FaEye />
                                        </button>
                                        <button
                                            onClick={() => handleEditOrder(order)}
                                            className="btn btn-xs btn-secondary"
                                            title="Edit Order"
                                        >
                                            <FaEdit />
                                        </button>
                                        {order.status === "pending" && (
                                            <button
                                                onClick={() => handleUpdateStatus(order, 'preparing')}
                                                className="btn btn-xs btn-success"
                                                title="Mark as Preparing"
                                            >
                                                <FaCheck />
                                            </button>
                                        )}
                                        {order.status === "preparing" && (
                                            <button
                                                onClick={() => handleUpdateStatus(order, 'delivered')}
                                                className="btn btn-xs btn-success"
                                                title="Mark as Delivered"
                                            >
                                                <FaCheck />
                                            </button>
                                        )}
                                        {(order.status === "pending" || order.status === "preparing") && (
                                            <button
                                                onClick={() => handleUpdateStatus(order, 'cancelled')}
                                                className="btn btn-xs btn-error"
                                                title="Cancel Order"
                                            >
                                                <FaTimes />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {sortedOrders.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No orders found matching your criteria.</p>
                        <p className="text-sm text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>

            {/* Order Details Modal */}
            <dialog id="orderModal" className="modal">
                <div className="modal-box max-w-4xl">
                    <h3 className="font-bold text-lg mb-4">Order Details</h3>
                    
                    {selectedOrder && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold mb-3">Order Information</h4>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Order ID:</strong> #{selectedOrder.orderId || selectedOrder._id}</p>
                                    <p><strong>Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                                    <p><strong>Status:</strong> 
                                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(selectedOrder.status)}`}>
                                            {selectedOrder.status}
                                        </span>
                                    </p>
                                    <p><strong>Estimated Delivery:</strong> {selectedOrder.estimatedDelivery}</p>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-3">Customer Information</h4>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Name:</strong> {selectedOrder.customerName || 'Customer'}</p>
                                    <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                                    <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                                    <p><strong>Address:</strong> {selectedOrder.deliveryAddress}</p>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-3">Meal Information</h4>
                                <div className="flex gap-4">
                                    <img
                                        src={selectedOrder.mealImage}
                                        alt={selectedOrder.mealName}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="space-y-1 text-sm">
                                        <p><strong>Meal:</strong> {selectedOrder.mealName}</p>
                                        <p><strong>Chef:</strong> {selectedOrder.chefName}</p>
                                        <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
                                        <p><strong>Unit Price:</strong> ${selectedOrder.price}</p>
                                        <p><strong>Total:</strong> ${selectedOrder.totalPrice}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-3">Payment Information</h4>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Method:</strong> {selectedOrder.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Online Payment'}</p>
                                    <p><strong>Status:</strong> 
                                        <span className={`ml-2 px-2 py-1 rounded text-xs ${
                                            selectedOrder.paymentStatus === 'paid' 
                                                ? 'bg-green-100 text-green-800' 
                                                : selectedOrder.paymentStatus === 'refunded'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {selectedOrder.paymentStatus || 'pending'}
                                        </span>
                                    </p>
                                    {selectedOrder.specialInstructions && (
                                        <p><strong>Special Instructions:</strong> {selectedOrder.specialInstructions}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div className="modal-action">
                        <button 
                            className="btn"
                            onClick={() => {
                                document.getElementById("orderModal").close();
                                setSelectedOrder(null);
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </dialog>

            {/* Edit Order Modal */}
            <dialog id="editModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Edit Order Status</h3>
                    
                    {editingOrder && (
                        <div className="space-y-4">
                            <p><strong>Order:</strong> #{editingOrder.orderId || editingOrder._id}</p>
                            <p><strong>Meal:</strong> {editingOrder.mealName}</p>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Update Status</label>
                                <select className="select select-bordered w-full">
                                    <option value="pending">Pending</option>
                                    <option value="preparing">Preparing</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Admin Notes</label>
                                <textarea 
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Add any notes about this order..."
                                ></textarea>
                            </div>
                        </div>
                    )}
                    
                    <div className="modal-action">
                        <button 
                            className="btn btn-primary"
                            onClick={() => {
                                alert('Order status updated! (Demo functionality)');
                                document.getElementById("editModal").close();
                                setEditingOrder(null);
                            }}
                        >
                            Update Order
                        </button>
                        <button 
                            className="btn"
                            onClick={() => {
                                document.getElementById("editModal").close();
                                setEditingOrder(null);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ManageOrders;