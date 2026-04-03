import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaUsers, FaClock, FaPhone, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { MdEventSeat, MdRestaurant } from 'react-icons/md';
import { toast } from 'react-toastify';

const ReservationSystem = () => {
    const [reservations, setReservations] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [formData, setFormData] = useState({
        customerName: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        guests: 2,
        table: '',
        specialRequests: '',
        status: 'confirmed'
    });

    // Demo reservations
    useEffect(() => {
        const demoReservations = [
            {
                id: 1,
                customerName: 'John Smith',
                phone: '+1234567890',
                email: 'john@email.com',
                date: new Date().toISOString().split('T')[0],
                time: '19:00',
                guests: 4,
                table: 5,
                specialRequests: 'Window seat preferred',
                status: 'confirmed',
                createdAt: new Date()
            },
            {
                id: 2,
                customerName: 'Sarah Johnson',
                phone: '+1234567891',
                email: 'sarah@email.com',
                date: new Date().toISOString().split('T')[0],
                time: '20:30',
                guests: 2,
                table: 8,
                specialRequests: 'Anniversary dinner',
                status: 'confirmed',
                createdAt: new Date()
            }
        ];
        setReservations(demoReservations);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'badge-success';
            case 'pending': return 'badge-warning';
            case 'cancelled': return 'badge-error';
            case 'completed': return 'badge-info';
            default: return 'badge-ghost';
        }
    };

    const openModal = (type, reservation = null) => {
        setModalType(type);
        if (reservation) {
            setSelectedReservation(reservation);
            setFormData(reservation);
        } else {
            setFormData({
                customerName: '',
                phone: '',
                email: '',
                date: selectedDate,
                time: '',
                guests: 2,
                table: '',
                specialRequests: '',
                status: 'confirmed'
            });
        }
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (modalType === 'add') {
            const newReservation = {
                id: Math.max(...reservations.map(r => r.id), 0) + 1,
                ...formData,
                guests: parseInt(formData.guests),
                table: parseInt(formData.table),
                createdAt: new Date()
            };
            setReservations([...reservations, newReservation]);
            toast.success('Reservation created successfully');
        } else if (modalType === 'edit') {
            setReservations(reservations.map(reservation => 
                reservation.id === selectedReservation.id 
                    ? { ...reservation, ...formData, guests: parseInt(formData.guests), table: parseInt(formData.table) }
                    : reservation
            ));
            toast.success('Reservation updated successfully');
        }
        
        setShowModal(false);
        setSelectedReservation(null);
    };

    const deleteReservation = (id) => {
        if (window.confirm('Are you sure you want to delete this reservation?')) {
            setReservations(reservations.filter(r => r.id !== id));
            toast.success('Reservation deleted successfully');
        }
    };

    const updateStatus = (id, newStatus) => {
        setReservations(reservations.map(reservation => 
            reservation.id === id ? { ...reservation, status: newStatus } : reservation
        ));
        toast.success(`Reservation status updated to ${newStatus}`);
    };

    const filteredReservations = reservations.filter(r => r.date === selectedDate);

    return (
        <div className="min-h-screen bg-base-100 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FaCalendarAlt className="text-primary" />
                        Reservation System
                    </h1>
                    <button 
                        onClick={() => openModal('add')}
                        className="btn btn-primary"
                    >
                        <FaPlus /> New Reservation
                    </button>
                </div>

                {/* Date Selector and Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                    <div className="lg:col-span-1">
                        <label className="label">
                            <span className="label-text font-semibold">Select Date</span>
                        </label>
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>
                    
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-primary">
                            <MdRestaurant className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Reservations</div>
                        <div className="stat-value text-primary">{filteredReservations.length}</div>
                    </div>
                    
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-success">
                            <FaUsers className="text-3xl" />
                        </div>
                        <div className="stat-title">Expected Guests</div>
                        <div className="stat-value text-success">
                            {filteredReservations.reduce((sum, r) => sum + r.guests, 0)}
                        </div>
                    </div>
                    
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-info">
                            <MdEventSeat className="text-3xl" />
                        </div>
                        <div className="stat-title">Tables Booked</div>
                        <div className="stat-value text-info">
                            {new Set(filteredReservations.map(r => r.table)).size}
                        </div>
                    </div>
                </div>

                {/* Reservations List */}
                <div className="card bg-base-200 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title">
                            Reservations for {new Date(selectedDate).toLocaleDateString()}
                        </h2>
                        
                        {filteredReservations.length === 0 ? (
                            <div className="text-center py-8">
                                <FaCalendarAlt className="text-6xl text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">No reservations for this date</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr>
                                            <th>Time</th>
                                            <th>Customer</th>
                                            <th>Contact</th>
                                            <th>Guests</th>
                                            <th>Table</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredReservations
                                            .sort((a, b) => a.time.localeCompare(b.time))
                                            .map(reservation => (
                                            <tr key={reservation.id}>
                                                <td>
                                                    <div className="flex items-center gap-2">
                                                        <FaClock className="text-primary" />
                                                        {reservation.time}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <div className="font-bold">{reservation.customerName}</div>
                                                        {reservation.specialRequests && (
                                                            <div className="text-sm text-gray-500">
                                                                {reservation.specialRequests}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="text-sm">
                                                        <div className="flex items-center gap-1">
                                                            <FaPhone className="text-xs" />
                                                            {reservation.phone}
                                                        </div>
                                                        <div>{reservation.email}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-1">
                                                        <FaUsers />
                                                        {reservation.guests}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="badge badge-outline">
                                                        Table {reservation.table}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="dropdown">
                                                        <label tabIndex={0} className={`badge cursor-pointer ${getStatusColor(reservation.status)}`}>
                                                            {reservation.status}
                                                        </label>
                                                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                                                            <li><a onClick={() => updateStatus(reservation.id, 'confirmed')}>Confirmed</a></li>
                                                            <li><a onClick={() => updateStatus(reservation.id, 'pending')}>Pending</a></li>
                                                            <li><a onClick={() => updateStatus(reservation.id, 'completed')}>Completed</a></li>
                                                            <li><a onClick={() => updateStatus(reservation.id, 'cancelled')}>Cancelled</a></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex gap-2">
                                                        <button 
                                                            onClick={() => openModal('edit', reservation)}
                                                            className="btn btn-sm btn-ghost"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button 
                                                            onClick={() => deleteReservation(reservation.id)}
                                                            className="btn btn-sm btn-ghost text-error"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Add/Edit Modal */}
                {showModal && (
                    <div className="modal modal-open">
                        <div className="modal-box max-w-2xl">
                            <h3 className="font-bold text-lg mb-4">
                                {modalType === 'add' ? 'New Reservation' : 'Edit Reservation'}
                            </h3>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Customer Name *</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full"
                                            value={formData.customerName}
                                            onChange={(e) => setFormData({...formData, customerName: e.target.value})}
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
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="input input-bordered w-full"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Date *</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="input input-bordered w-full"
                                            value={formData.date}
                                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Time *</span>
                                        </label>
                                        <input
                                            type="time"
                                            className="input input-bordered w-full"
                                            value={formData.time}
                                            onChange={(e) => setFormData({...formData, time: e.target.value})}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Guests *</span>
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="12"
                                            className="input input-bordered w-full"
                                            value={formData.guests}
                                            onChange={(e) => setFormData({...formData, guests: e.target.value})}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Table Number</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="input input-bordered w-full"
                                            value={formData.table}
                                            onChange={(e) => setFormData({...formData, table: e.target.value})}
                                            placeholder="Auto-assign if empty"
                                        />
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
                                            <option value="confirmed">Confirmed</option>
                                            <option value="pending">Pending</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Special Requests</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        rows="3"
                                        value={formData.specialRequests}
                                        onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                                        placeholder="Any special requests or notes..."
                                    ></textarea>
                                </div>

                                <div className="modal-action">
                                    <button type="submit" className="btn btn-primary">
                                        {modalType === 'add' ? 'Create Reservation' : 'Update Reservation'}
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

export default ReservationSystem;