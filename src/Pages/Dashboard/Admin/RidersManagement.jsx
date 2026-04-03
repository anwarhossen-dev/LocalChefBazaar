import React, { useState, useEffect } from 'react';
import { FaMotorcycle, FaPlus, FaEdit, FaTrash, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { MdDeliveryDining, MdGpsFixed, MdPayment } from 'react-icons/md';
import { toast } from 'react-toastify';

const RidersManagement = () => {
    const [riders, setRiders] = useState([]);
    const [activeDeliveries, setActiveDeliveries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [selectedRider, setSelectedRider] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        vehicleType: 'motorcycle',
        vehicleNumber: '',
        licenseNumber: '',
        status: 'available',
        commissionRate: 15
    });

    const vehicleTypes = ['motorcycle', 'bicycle', 'car', 'scooter'];
    const statusOptions = ['available', 'busy', 'offline', 'break'];

    // Demo riders data
    useEffect(() => {
        const demoRiders = [
            {
                id: 1,
                name: 'Alex Rodriguez',
                phone: '+1-555-0201',
                email: 'alex.r@delivery.com',
                vehicleType: 'motorcycle',
                vehicleNumber: 'DL-1234',
                licenseNumber: 'LIC123456',
                status: 'busy',
                commissionRate: 15,
                rating: 4.8,
                totalDeliveries: 234,
                completedToday: 12,
                earnings: 1890.50,
                currentLocation: { lat: 40.7128, lng: -74.0060 },
                joinDate: '2023-01-15',
                currentDelivery: {
                    orderId: 'ORD-001',
                    customer: 'John Smith',
                    address: '123 Main St',
                    estimatedTime: 15
                }
            },
            {
                id: 2,
                name: 'Maria Garcia',
                phone: '+1-555-0202',
                email: 'maria.g@delivery.com',
                vehicleType: 'bicycle',
                vehicleNumber: 'BC-5678',
                licenseNumber: 'LIC789012',
                status: 'available',
                commissionRate: 18,
                rating: 4.9,
                totalDeliveries: 189,
                completedToday: 8,
                earnings: 1456.75,
                currentLocation: { lat: 40.7589, lng: -73.9851 },
                joinDate: '2023-02-20',
                currentDelivery: null
            },
            {
                id: 3,
                name: 'David Chen',
                phone: '+1-555-0203',
                email: 'david.c@delivery.com',
                vehicleType: 'scooter',
                vehicleNumber: 'SC-9012',
                licenseNumber: 'LIC345678',
                status: 'available',
                commissionRate: 16,
                rating: 4.7,
                totalDeliveries: 156,
                completedToday: 6,
                earnings: 1234.25,
                currentLocation: { lat: 40.7505, lng: -73.9934 },
                joinDate: '2023-03-10',
                currentDelivery: null
            },
            {
                id: 4,
                name: 'Sarah Johnson',
                phone: '+1-555-0204',
                email: 'sarah.j@delivery.com',
                vehicleType: 'car',
                vehicleNumber: 'CAR-3456',
                licenseNumber: 'LIC901234',
                status: 'break',
                commissionRate: 12,
                rating: 4.6,
                totalDeliveries: 98,
                completedToday: 4,
                earnings: 987.60,
                currentLocation: { lat: 40.7282, lng: -73.7949 },
                joinDate: '2023-04-01',
                currentDelivery: null
            }
        ];
        setRiders(demoRiders);

        // Demo active deliveries
        const demoDeliveries = [
            {
                id: 1,
                orderId: 'ORD-001',
                riderId: 1,
                customer: 'John Smith',
                customerPhone: '+1-555-1001',
                pickupAddress: 'Restaurant Main Branch',
                deliveryAddress: '123 Main St, Anytown',
                orderValue: 45.50,
                deliveryFee: 5.99,
                estimatedTime: 15,
                status: 'picked_up',
                startTime: new Date(Date.now() - 10 * 60000) // 10 minutes ago
            }
        ];
        setActiveDeliveries(demoDeliveries);
    }, []);

    const openModal = (type, rider = null) => {
        setModalType(type);
        if (rider) {
            setSelectedRider(rider);
            setFormData({
                name: rider.name,
                phone: rider.phone,
                email: rider.email,
                vehicleType: rider.vehicleType,
                vehicleNumber: rider.vehicleNumber,
                licenseNumber: rider.licenseNumber,
                status: rider.status,
                commissionRate: rider.commissionRate
            });
        } else {
            setFormData({
                name: '',
                phone: '',
                email: '',
                vehicleType: 'motorcycle',
                vehicleNumber: '',
                licenseNumber: '',
                status: 'available',
                commissionRate: 15
            });
        }
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (modalType === 'add') {
            const newRider = {
                id: Math.max(...riders.map(r => r.id), 0) + 1,
                ...formData,
                commissionRate: parseFloat(formData.commissionRate),
                rating: 5.0,
                totalDeliveries: 0,
                completedToday: 0,
                earnings: 0,
                currentLocation: { lat: 40.7128, lng: -74.0060 },
                joinDate: new Date().toISOString().split('T')[0],
                currentDelivery: null
            };
            setRiders([...riders, newRider]);
            toast.success('Rider added successfully');
        } else if (modalType === 'edit') {
            setRiders(riders.map(rider => 
                rider.id === selectedRider.id 
                    ? { ...rider, ...formData, commissionRate: parseFloat(formData.commissionRate) }
                    : rider
            ));
            toast.success('Rider updated successfully');
        }
        
        setShowModal(false);
        setSelectedRider(null);
    };

    const deleteRider = (id) => {
        if (window.confirm('Are you sure you want to delete this rider?')) {
            setRiders(riders.filter(rider => rider.id !== id));
            toast.success('Rider deleted successfully');
        }
    };

    const updateRiderStatus = (id, newStatus) => {
        setRiders(riders.map(rider => 
            rider.id === id ? { ...rider, status: newStatus } : rider
        ));
        toast.success(`Rider status updated to ${newStatus}`);
    };

    const assignDelivery = (riderId) => {
        // Simulate assigning a delivery
        const rider = riders.find(r => r.id === riderId);
        if (rider && rider.status === 'available') {
            updateRiderStatus(riderId, 'busy');
            toast.success(`Delivery assigned to ${rider.name}`);
        } else {
            toast.error('Rider is not available for delivery');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'available': return 'badge-success';
            case 'busy': return 'badge-warning';
            case 'offline': return 'badge-error';
            case 'break': return 'badge-info';
            default: return 'badge-ghost';
        }
    };

    const getVehicleIcon = (vehicleType) => {
        switch (vehicleType) {
            case 'motorcycle': return '🏍️';
            case 'bicycle': return '🚲';
            case 'car': return '🚗';
            case 'scooter': return '🛵';
            default: return '🚚';
        }
    };

    const getRatingStars = (rating) => {
        return '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '⭐' : '');
    };

    const availableRiders = riders.filter(r => r.status === 'available').length;
    const busyRiders = riders.filter(r => r.status === 'busy').length;
    const totalEarnings = riders.reduce((sum, r) => sum + r.earnings, 0);
    const avgRating = riders.length > 0 ? riders.reduce((sum, r) => sum + r.rating, 0) / riders.length : 0;

    return (
        <div className="min-h-screen bg-base-100 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FaMotorcycle className="text-primary" />
                        Riders Management
                    </h1>
                    <button 
                        onClick={() => openModal('add')}
                        className="btn btn-primary"
                    >
                        <FaPlus /> Add Rider
                    </button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-primary">
                            <FaMotorcycle className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Riders</div>
                        <div className="stat-value text-primary">{riders.length}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-success">
                            <MdGpsFixed className="text-3xl" />
                        </div>
                        <div className="stat-title">Available</div>
                        <div className="stat-value text-success">{availableRiders}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-warning">
                            <MdDeliveryDining className="text-3xl" />
                        </div>
                        <div className="stat-title">On Delivery</div>
                        <div className="stat-value text-warning">{busyRiders}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-info">
                            <MdPayment className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Earnings</div>
                        <div className="stat-value text-info">${totalEarnings.toFixed(0)}</div>
                    </div>
                </div>

                {/* Active Deliveries */}
                {activeDeliveries.length > 0 && (
                    <div className="card bg-base-200 shadow-lg mb-6">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Active Deliveries</h2>
                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Rider</th>
                                            <th>Customer</th>
                                            <th>Delivery Address</th>
                                            <th>Status</th>
                                            <th>ETA</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activeDeliveries.map(delivery => {
                                            const rider = riders.find(r => r.id === delivery.riderId);
                                            return (
                                                <tr key={delivery.id}>
                                                    <td className="font-semibold">{delivery.orderId}</td>
                                                    <td>{rider?.name}</td>
                                                    <td>
                                                        <div>
                                                            <div>{delivery.customer}</div>
                                                            <div className="text-sm text-gray-500">{delivery.customerPhone}</div>
                                                        </div>
                                                    </td>
                                                    <td>{delivery.deliveryAddress}</td>
                                                    <td>
                                                        <div className="badge badge-warning">
                                                            {delivery.status.replace('_', ' ').toUpperCase()}
                                                        </div>
                                                    </td>
                                                    <td>{delivery.estimatedTime} min</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-info">
                                                            <FaMapMarkerAlt /> Track
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Riders Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {riders.map(rider => (
                        <div key={rider.id} className="card bg-base-200 shadow-lg">
                            <div className="card-body">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="card-title text-lg flex items-center gap-2">
                                            {rider.name}
                                            <span className="text-2xl">{getVehicleIcon(rider.vehicleType)}</span>
                                        </h3>
                                        <p className="text-sm text-gray-500 capitalize">{rider.vehicleType} Rider</p>
                                    </div>
                                    <div className={`badge ${getStatusColor(rider.status)}`}>
                                        {rider.status.toUpperCase()}
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaPhone className="text-primary" />
                                        {rider.phone}
                                    </div>
                                    <div className="text-sm">
                                        <span className="text-gray-500">Vehicle:</span> {rider.vehicleNumber}
                                    </div>
                                    <div className="text-sm">
                                        <span className="text-gray-500">License:</span> {rider.licenseNumber}
                                    </div>
                                </div>

                                {/* Rating and Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                    <div>
                                        <div className="text-gray-500">Rating</div>
                                        <div className="flex items-center gap-1">
                                            <span className="font-semibold">{rider.rating}</span>
                                            <span>{getRatingStars(rider.rating)}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500">Commission</div>
                                        <div className="font-semibold">{rider.commissionRate}%</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500">Total Deliveries</div>
                                        <div className="font-semibold">{rider.totalDeliveries}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500">Today</div>
                                        <div className="font-semibold">{rider.completedToday}</div>
                                    </div>
                                </div>

                                {/* Earnings */}
                                <div className="mb-4">
                                    <div className="text-sm text-gray-500">Total Earnings</div>
                                    <div className="text-lg font-bold text-success">${rider.earnings.toFixed(2)}</div>
                                </div>

                                {/* Current Delivery */}
                                {rider.currentDelivery && (
                                    <div className="mb-4 p-3 bg-warning bg-opacity-20 rounded">
                                        <div className="text-sm font-semibold mb-1">Current Delivery</div>
                                        <div className="text-sm">
                                            <div>Order: {rider.currentDelivery.orderId}</div>
                                            <div>Customer: {rider.currentDelivery.customer}</div>
                                            <div className="flex items-center gap-1">
                                                <FaClock />
                                                ETA: {rider.currentDelivery.estimatedTime} min
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="card-actions justify-end">
                                    <div className="dropdown dropdown-end">
                                        <label tabIndex={0} className="btn btn-sm btn-ghost">
                                            Status
                                        </label>
                                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                                            {statusOptions.map(status => (
                                                <li key={status}>
                                                    <a onClick={() => updateRiderStatus(rider.id, status)}>
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    {rider.status === 'available' && (
                                        <button 
                                            onClick={() => assignDelivery(rider.id)}
                                            className="btn btn-sm btn-success"
                                        >
                                            <MdDeliveryDining /> Assign
                                        </button>
                                    )}
                                    
                                    <button 
                                        onClick={() => openModal('edit', rider)}
                                        className="btn btn-sm btn-info"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button 
                                        onClick={() => deleteRider(rider.id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {riders.length === 0 && (
                    <div className="text-center py-12">
                        <FaMotorcycle className="text-6xl text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No riders found</p>
                    </div>
                )}

                {/* Add/Edit Modal */}
                {showModal && (
                    <div className="modal modal-open">
                        <div className="modal-box max-w-2xl">
                            <h3 className="font-bold text-lg mb-4">
                                {modalType === 'add' ? 'Add New Rider' : 'Edit Rider'}
                            </h3>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Full Name *</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Phone *</span>
                                        </label>
                                        <input
                                            type="tel"
                                            className="input input-bordered w-full"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Email *</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="input input-bordered w-full"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Vehicle Type *</span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={formData.vehicleType}
                                            onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                                            required
                                        >
                                            {vehicleTypes.map(type => (
                                                <option key={type} value={type}>
                                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Vehicle Number *</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full"
                                            value={formData.vehicleNumber}
                                            onChange={(e) => setFormData({...formData, vehicleNumber: e.target.value})}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">
                                            <span className="label-text">License Number *</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full"
                                            value={formData.licenseNumber}
                                            onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Commission Rate (%)</span>
                                        </label>
                                        <input
                                            type="number"
                                            min="5"
                                            max="25"
                                            step="0.5"
                                            className="input input-bordered w-full"
                                            value={formData.commissionRate}
                                            onChange={(e) => setFormData({...formData, commissionRate: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Status</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={formData.status}
                                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    >
                                        {statusOptions.map(status => (
                                            <option key={status} value={status}>
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="modal-action">
                                    <button type="submit" className="btn btn-primary">
                                        {modalType === 'add' ? 'Add Rider' : 'Update Rider'}
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="btn"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RidersManagement;