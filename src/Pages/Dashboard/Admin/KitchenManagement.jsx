import React, { useState, useEffect } from 'react';
import { FaClock, FaCheck, FaPlay, FaPause, FaUtensils, FaFire } from 'react-icons/fa';
import { MdKitchen, MdTimer, MdRestaurant } from 'react-icons/md';
import { toast } from 'react-toastify';

const KitchenManagement = () => {
    const [orders, setOrders] = useState([]);
    const [selectedStation, setSelectedStation] = useState('all');
    const [currentTime, setCurrentTime] = useState(new Date());

    // Kitchen stations
    const stations = [
        { id: 'all', name: 'All Stations', color: 'primary' },
        { id: 'grill', name: 'Grill Station', color: 'error' },
        { id: 'salad', name: 'Salad Station', color: 'success' },
        { id: 'pizza', name: 'Pizza Station', color: 'warning' },
        { id: 'dessert', name: 'Dessert Station', color: 'info' },
        { id: 'beverage', name: 'Beverage Station', color: 'accent' }
    ];

    // Demo kitchen orders
    useEffect(() => {
        const demoOrders = [
            {
                id: 1,
                orderNumber: 'ORD-001',
                table: 5,
                items: [
                    { name: 'Grilled Chicken', station: 'grill', prepTime: 15, status: 'preparing' },
                    { name: 'Caesar Salad', station: 'salad', prepTime: 5, status: 'ready' }
                ],
                priority: 'high',
                orderTime: new Date(Date.now() - 10 * 60000), // 10 minutes ago
                estimatedTime: 20,
                chef: 'John Doe',
                status: 'preparing'
            },
            {
                id: 2,
                orderNumber: 'ORD-002',
                table: 3,
                items: [
                    { name: 'Margherita Pizza', station: 'pizza', prepTime: 12, status: 'preparing' },
                    { name: 'Garlic Bread', station: 'grill', prepTime: 8, status: 'pending' }
                ],
                priority: 'medium',
                orderTime: new Date(Date.now() - 5 * 60000), // 5 minutes ago
                estimatedTime: 15,
                chef: 'Jane Smith',
                status: 'pending'
            },
            {
                id: 3,
                orderNumber: 'ORD-003',
                table: 8,
                items: [
                    { name: 'Chocolate Cake', station: 'dessert', prepTime: 3, status: 'ready' },
                    { name: 'Coffee', station: 'beverage', prepTime: 2, status: 'ready' }
                ],
                priority: 'low',
                orderTime: new Date(Date.now() - 15 * 60000), // 15 minutes ago
                estimatedTime: 5,
                chef: 'Mike Johnson',
                status: 'ready'
            }
        ];
        setOrders(demoOrders);
    }, []);

    // Update current time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
        toast.success(`Order ${orderId} status updated to ${newStatus}`);
    };

    const updateItemStatus = (orderId, itemIndex, newStatus) => {
        setOrders(orders.map(order => {
            if (order.id === orderId) {
                const updatedItems = [...order.items];
                updatedItems[itemIndex] = { ...updatedItems[itemIndex], status: newStatus };
                return { ...order, items: updatedItems };
            }
            return order;
        }));
        toast.success('Item status updated');
    };

    const getElapsedTime = (orderTime) => {
        const elapsed = Math.floor((currentTime - orderTime) / 60000); // minutes
        return elapsed;
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-error';
            case 'medium': return 'text-warning';
            case 'low': return 'text-success';
            default: return 'text-base-content';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'badge-warning';
            case 'preparing': return 'badge-info';
            case 'ready': return 'badge-success';
            case 'served': return 'badge-neutral';
            default: return 'badge-ghost';
        }
    };

    const filteredOrders = selectedStation === 'all' 
        ? orders 
        : orders.filter(order => 
            order.items.some(item => item.station === selectedStation)
          );

    return (
        <div className="min-h-screen bg-base-100 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <MdKitchen className="text-primary" />
                        Kitchen Management System
                    </h1>
                    <div className="text-right">
                        <div className="text-2xl font-mono">
                            {currentTime.toLocaleTimeString()}
                        </div>
                        <div className="text-sm text-gray-500">
                            {currentTime.toLocaleDateString()}
                        </div>
                    </div>
                </div>

                {/* Kitchen Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-primary">
                            <MdRestaurant className="text-3xl" />
                        </div>
                        <div className="stat-title">Active Orders</div>
                        <div className="stat-value text-primary">{orders.filter(o => o.status !== 'served').length}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-warning">
                            <FaClock className="text-3xl" />
                        </div>
                        <div className="stat-title">Pending</div>
                        <div className="stat-value text-warning">{orders.filter(o => o.status === 'pending').length}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-info">
                            <FaFire className="text-3xl" />
                        </div>
                        <div className="stat-title">Preparing</div>
                        <div className="stat-value text-info">{orders.filter(o => o.status === 'preparing').length}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-success">
                            <FaCheck className="text-3xl" />
                        </div>
                        <div className="stat-title">Ready</div>
                        <div className="stat-value text-success">{orders.filter(o => o.status === 'ready').length}</div>
                    </div>
                </div>

                {/* Station Filter */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                        {stations.map(station => (
                            <button
                                key={station.id}
                                onClick={() => setSelectedStation(station.id)}
                                className={`btn btn-sm ${
                                    selectedStation === station.id 
                                        ? `btn-${station.color}` 
                                        : 'btn-outline'
                                }`}
                            >
                                {station.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Orders Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredOrders.map(order => (
                        <div 
                            key={order.id} 
                            className={`card bg-base-200 shadow-lg border-l-4 ${
                                order.priority === 'high' ? 'border-error' :
                                order.priority === 'medium' ? 'border-warning' : 'border-success'
                            }`}
                        >
                            <div className="card-body">
                                {/* Order Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="card-title text-lg">{order.orderNumber}</h3>
                                        <p className="text-sm text-gray-500">Table {order.table}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className={`badge ${getStatusColor(order.status)} mb-1`}>
                                            {order.status.toUpperCase()}
                                        </div>
                                        <div className={`text-sm font-semibold ${getPriorityColor(order.priority)}`}>
                                            {order.priority.toUpperCase()} PRIORITY
                                        </div>
                                    </div>
                                </div>

                                {/* Time Info */}
                                <div className="flex justify-between items-center mb-4 p-2 bg-base-100 rounded">
                                    <div className="flex items-center gap-2">
                                        <MdTimer className="text-info" />
                                        <span className="text-sm">Elapsed: {getElapsedTime(order.orderTime)}m</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaClock className="text-warning" />
                                        <span className="text-sm">Est: {order.estimatedTime}m</span>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="space-y-2 mb-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center p-2 bg-base-100 rounded">
                                            <div>
                                                <p className="font-medium text-sm">{item.name}</p>
                                                <p className="text-xs text-gray-500">{item.station} station</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs">{item.prepTime}m</span>
                                                <div className="dropdown dropdown-end">
                                                    <label tabIndex={0} className={`badge cursor-pointer ${getStatusColor(item.status)}`}>
                                                        {item.status}
                                                    </label>
                                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                                                        <li><a onClick={() => updateItemStatus(order.id, index, 'pending')}>Pending</a></li>
                                                        <li><a onClick={() => updateItemStatus(order.id, index, 'preparing')}>Preparing</a></li>
                                                        <li><a onClick={() => updateItemStatus(order.id, index, 'ready')}>Ready</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Chef Assignment */}
                                <div className="flex items-center gap-2 mb-4">
                                    <FaUtensils className="text-primary" />
                                    <span className="text-sm">Chef: {order.chef}</span>
                                </div>

                                {/* Action Buttons */}
                                <div className="card-actions justify-end">
                                    {order.status === 'pending' && (
                                        <button 
                                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                                            className="btn btn-sm btn-info"
                                        >
                                            <FaPlay /> Start
                                        </button>
                                    )}
                                    {order.status === 'preparing' && (
                                        <button 
                                            onClick={() => updateOrderStatus(order.id, 'ready')}
                                            className="btn btn-sm btn-success"
                                        >
                                            <FaCheck /> Mark Ready
                                        </button>
                                    )}
                                    {order.status === 'ready' && (
                                        <button 
                                            onClick={() => updateOrderStatus(order.id, 'served')}
                                            className="btn btn-sm btn-neutral"
                                        >
                                            <FaCheck /> Served
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredOrders.length === 0 && (
                    <div className="text-center py-12">
                        <MdKitchen className="text-6xl text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No orders for selected station</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KitchenManagement;