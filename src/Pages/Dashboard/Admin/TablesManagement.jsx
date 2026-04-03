import React, { useState, useEffect } from 'react';
import { FaUsers, FaClock, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { MdTableRestaurant, MdCleaningServices, MdEventSeat } from 'react-icons/md';
import { toast } from 'react-toastify';

const TablesManagement = () => {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'add', 'edit', 'reserve'
    const [formData, setFormData] = useState({
        number: '',
        capacity: 2,
        location: 'main',
        status: 'available'
    });

    // Initialize demo tables
    useEffect(() => {
        const demoTables = Array.from({ length: 24 }, (_, i) => ({
            id: i + 1,
            number: i + 1,
            capacity: Math.floor(Math.random() * 6) + 2,
            location: i < 12 ? 'main' : i < 18 ? 'patio' : 'private',
            status: ['available', 'occupied', 'reserved', 'cleaning'][Math.floor(Math.random() * 4)],
            currentGuests: Math.random() > 0.5 ? Math.floor(Math.random() * 4) + 1 : 0,
            reservedBy: Math.random() > 0.7 ? 'John Doe' : null,
            reservedTime: Math.random() > 0.7 ? new Date(Date.now() + Math.random() * 3600000) : null,
            occupiedSince: Math.random() > 0.6 ? new Date(Date.now() - Math.random() * 7200000) : null,
            lastCleaned: new Date(Date.now() - Math.random() * 3600000),
            revenue: Math.random() * 200
        }));
        setTables(demoTables);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'available': return 'bg-success text-success-content';
            case 'occupied': return 'bg-error text-error-content';
            case 'reserved': return 'bg-warning text-warning-content';
            case 'cleaning': return 'bg-info text-info-content';
            default: return 'bg-base-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'available': return <MdEventSeat />;
            case 'occupied': return <FaUsers />;
            case 'reserved': return <FaClock />;
            case 'cleaning': return <MdCleaningServices />;
            default: return <MdTableRestaurant />;
        }
    };

    const updateTableStatus = (tableId, newStatus) => {
        setTables(tables.map(table => 
            table.id === tableId 
                ? { 
                    ...table, 
                    status: newStatus,
                    occupiedSince: newStatus === 'occupied' ? new Date() : null,
                    currentGuests: newStatus === 'occupied' ? table.capacity : 0
                  }
                : table
        ));
        toast.success(`Table ${tableId} status updated to ${newStatus}`);
    };

    const openModal = (type, table = null) => {
        setModalType(type);
        if (table) {
            setSelectedTable(table);
            setFormData({
                number: table.number,
                capacity: table.capacity,
                location: table.location,
                status: table.status
            });
        } else {
            setFormData({
                number: '',
                capacity: 2,
                location: 'main',
                status: 'available'
            });
        }
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (modalType === 'add') {
            const newTable = {
                id: Math.max(...tables.map(t => t.id)) + 1,
                ...formData,
                number: parseInt(formData.number),
                currentGuests: 0,
                reservedBy: null,
                reservedTime: null,
                occupiedSince: null,
                lastCleaned: new Date(),
                revenue: 0
            };
            setTables([...tables, newTable]);
            toast.success('Table added successfully');
        } else if (modalType === 'edit') {
            setTables(tables.map(table => 
                table.id === selectedTable.id 
                    ? { ...table, ...formData, number: parseInt(formData.number) }
                    : table
            ));
            toast.success('Table updated successfully');
        }
        
        setShowModal(false);
        setSelectedTable(null);
    };

    const deleteTable = (tableId) => {
        if (window.confirm('Are you sure you want to delete this table?')) {
            setTables(tables.filter(table => table.id !== tableId));
            toast.success('Table deleted successfully');
        }
    };

    const getLocationTables = (location) => {
        return tables.filter(table => table.location === location);
    };

    const locations = ['main', 'patio', 'private'];

    const getLocationStats = () => {
        return locations.map(location => {
            const locationTables = getLocationTables(location);
            return {
                location,
                total: locationTables.length,
                available: locationTables.filter(t => t.status === 'available').length,
                occupied: locationTables.filter(t => t.status === 'occupied').length,
                reserved: locationTables.filter(t => t.status === 'reserved').length,
                cleaning: locationTables.filter(t => t.status === 'cleaning').length
            };
        });
    };

    return (
        <div className="min-h-screen bg-base-100 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <MdTableRestaurant className="text-primary" />
                        Tables Management
                    </h1>
                    <button 
                        onClick={() => openModal('add')}
                        className="btn btn-primary"
                    >
                        <FaPlus /> Add Table
                    </button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-primary">
                            <MdTableRestaurant className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Tables</div>
                        <div className="stat-value text-primary">{tables.length}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-success">
                            <MdEventSeat className="text-3xl" />
                        </div>
                        <div className="stat-title">Available</div>
                        <div className="stat-value text-success">{tables.filter(t => t.status === 'available').length}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-error">
                            <FaUsers className="text-3xl" />
                        </div>
                        <div className="stat-title">Occupied</div>
                        <div className="stat-value text-error">{tables.filter(t => t.status === 'occupied').length}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-warning">
                            <FaClock className="text-3xl" />
                        </div>
                        <div className="stat-title">Reserved</div>
                        <div className="stat-value text-warning">{tables.filter(t => t.status === 'reserved').length}</div>
                    </div>
                </div>

                {/* Location Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {getLocationStats().map(stat => (
                        <div key={stat.location} className="card bg-base-200 shadow-md">
                            <div className="card-body">
                                <h3 className="card-title capitalize">{stat.location} Area</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>Total: {stat.total}</div>
                                    <div className="text-success">Available: {stat.available}</div>
                                    <div className="text-error">Occupied: {stat.occupied}</div>
                                    <div className="text-warning">Reserved: {stat.reserved}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tables by Location */}
                {locations.map(location => (
                    <div key={location} className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 capitalize">{location} Area</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                            {getLocationTables(location).map(table => (
                                <div 
                                    key={table.id}
                                    className={`card shadow-md cursor-pointer hover:shadow-lg transition-shadow ${getStatusColor(table.status)}`}
                                    onClick={() => setSelectedTable(table)}
                                >
                                    <div className="card-body p-4 text-center">
                                        <div className="text-2xl mb-2">
                                            {getStatusIcon(table.status)}
                                        </div>
                                        <h3 className="font-bold">Table {table.number}</h3>
                                        <p className="text-sm opacity-80">
                                            {table.capacity} seats
                                        </p>
                                        {table.currentGuests > 0 && (
                                            <p className="text-xs">
                                                {table.currentGuests} guests
                                            </p>
                                        )}
                                        <div className="card-actions justify-center mt-2">
                                            <div className="dropdown dropdown-top">
                                                <label tabIndex={0} className="btn btn-xs">Actions</label>
                                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                                                    <li><a onClick={(e) => { e.stopPropagation(); updateTableStatus(table.id, 'available'); }}>Available</a></li>
                                                    <li><a onClick={(e) => { e.stopPropagation(); updateTableStatus(table.id, 'occupied'); }}>Occupied</a></li>
                                                    <li><a onClick={(e) => { e.stopPropagation(); updateTableStatus(table.id, 'reserved'); }}>Reserved</a></li>
                                                    <li><a onClick={(e) => { e.stopPropagation(); updateTableStatus(table.id, 'cleaning'); }}>Cleaning</a></li>
                                                    <li><a onClick={(e) => { e.stopPropagation(); openModal('edit', table); }}>Edit</a></li>
                                                    <li><a onClick={(e) => { e.stopPropagation(); deleteTable(table.id); }} className="text-error">Delete</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Table Details Modal */}
                {selectedTable && (
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg mb-4">Table {selectedTable.number} Details</h3>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="label-text">Status</label>
                                        <div className={`badge ${getStatusColor(selectedTable.status)} p-3`}>
                                            {selectedTable.status.toUpperCase()}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label-text">Capacity</label>
                                        <p>{selectedTable.capacity} seats</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="label-text">Location</label>
                                        <p className="capitalize">{selectedTable.location}</p>
                                    </div>
                                    <div>
                                        <label className="label-text">Current Guests</label>
                                        <p>{selectedTable.currentGuests}</p>
                                    </div>
                                </div>

                                {selectedTable.occupiedSince && (
                                    <div>
                                        <label className="label-text">Occupied Since</label>
                                        <p>{selectedTable.occupiedSince.toLocaleString()}</p>
                                    </div>
                                )}

                                {selectedTable.reservedBy && (
                                    <div>
                                        <label className="label-text">Reserved By</label>
                                        <p>{selectedTable.reservedBy}</p>
                                    </div>
                                )}

                                <div>
                                    <label className="label-text">Last Cleaned</label>
                                    <p>{selectedTable.lastCleaned.toLocaleString()}</p>
                                </div>

                                <div>
                                    <label className="label-text">Today's Revenue</label>
                                    <p>${selectedTable.revenue.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="modal-action">
                                <button 
                                    onClick={() => openModal('edit', selectedTable)}
                                    className="btn btn-primary"
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button 
                                    onClick={() => setSelectedTable(null)}
                                    className="btn"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add/Edit Modal */}
                {showModal && (
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg mb-4">
                                {modalType === 'add' ? 'Add New Table' : 'Edit Table'}
                            </h3>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="label">
                                        <span className="label-text">Table Number</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="input input-bordered w-full"
                                        value={formData.number}
                                        onChange={(e) => setFormData({...formData, number: e.target.value})}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Capacity</span>
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="12"
                                        className="input input-bordered w-full"
                                        value={formData.capacity}
                                        onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Location</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={formData.location}
                                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    >
                                        <option value="main">Main Area</option>
                                        <option value="patio">Patio</option>
                                        <option value="private">Private Room</option>
                                    </select>
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
                                        <option value="available">Available</option>
                                        <option value="occupied">Occupied</option>
                                        <option value="reserved">Reserved</option>
                                        <option value="cleaning">Cleaning</option>
                                    </select>
                                </div>

                                <div className="modal-action">
                                    <button type="submit" className="btn btn-primary">
                                        {modalType === 'add' ? 'Add Table' : 'Update Table'}
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

export default TablesManagement;