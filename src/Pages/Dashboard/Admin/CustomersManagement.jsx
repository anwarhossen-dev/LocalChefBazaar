import React, { useState, useEffect } from 'react';
import { FaUsers, FaPlus, FaEdit, FaTrash, FaPhone, FaEnvelope, FaStar, FaGift } from 'react-icons/fa';
import { MdLocationOn, MdCake, MdHistory, MdLoyalty } from 'react-icons/md';
import { toast } from 'react-toastify';

const CustomersManagement = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        birthday: '',
        preferences: '',
        notes: ''
    });

    // Demo customers data
    useEffect(() => {
        const demoCustomers = [
            {
                id: 1,
                name: 'John Smith',
                email: 'john.smith@email.com',
                phone: '+1-555-0123',
                address: '123 Main St, Anytown, CA 90210',
                birthday: '1985-06-15',
                preferences: 'Vegetarian, No spicy food',
                notes: 'Regular customer, prefers table by window',
                loyaltyPoints: 1250,
                totalOrders: 45,
                totalSpent: 1890.50,
                lastVisit: '2024-04-01',
                favoriteItems: ['Caesar Salad', 'Margherita Pizza', 'Chocolate Cake'],
                status: 'active',
                tier: 'gold',
                joinDate: '2023-01-15'
            },
            {
                id: 2,
                name: 'Sarah Johnson',
                email: 'sarah.j@email.com',
                phone: '+1-555-0124',
                address: '456 Oak Ave, Somewhere, NY 10001',
                birthday: '1990-12-03',
                preferences: 'Gluten-free options',
                notes: 'Allergic to nuts',
                loyaltyPoints: 890,
                totalOrders: 28,
                totalSpent: 1245.75,
                lastVisit: '2024-03-28',
                favoriteItems: ['Grilled Salmon', 'Quinoa Salad'],
                status: 'active',
                tier: 'silver',
                joinDate: '2023-03-22'
            },
            {
                id: 3,
                name: 'Mike Wilson',
                email: 'mike.wilson@email.com',
                phone: '+1-555-0125',
                address: '789 Pine St, Elsewhere, TX 75201',
                birthday: '1978-09-20',
                preferences: 'Loves spicy food, Craft beer',
                notes: 'Celebrates anniversary here every year',
                loyaltyPoints: 2150,
                totalOrders: 67,
                totalSpent: 3456.80,
                lastVisit: '2024-04-02',
                favoriteItems: ['Spicy Wings', 'BBQ Ribs', 'IPA Beer'],
                status: 'active',
                tier: 'platinum',
                joinDate: '2022-08-10'
            },
            {
                id: 4,
                name: 'Emily Davis',
                email: 'emily.davis@email.com',
                phone: '+1-555-0126',
                address: '321 Elm St, Nowhere, FL 33101',
                birthday: '1995-04-08',
                preferences: 'Vegan options, Organic ingredients',
                notes: 'Food blogger, takes photos of meals',
                loyaltyPoints: 650,
                totalOrders: 18,
                totalSpent: 789.25,
                lastVisit: '2024-03-25',
                favoriteItems: ['Vegan Burger', 'Organic Salad'],
                status: 'active',
                tier: 'bronze',
                joinDate: '2023-11-05'
            }
        ];
        setCustomers(demoCustomers);
    }, []);

    const openModal = (type, customer = null) => {
        setModalType(type);
        if (customer) {
            setSelectedCustomer(customer);
            setFormData({
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                address: customer.address,
                birthday: customer.birthday,
                preferences: customer.preferences,
                notes: customer.notes
            });
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                address: '',
                birthday: '',
                preferences: '',
                notes: ''
            });
        }
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (modalType === 'add') {
            const newCustomer = {
                id: Math.max(...customers.map(c => c.id), 0) + 1,
                ...formData,
                loyaltyPoints: 0,
                totalOrders: 0,
                totalSpent: 0,
                lastVisit: null,
                favoriteItems: [],
                status: 'active',
                tier: 'bronze',
                joinDate: new Date().toISOString().split('T')[0]
            };
            setCustomers([...customers, newCustomer]);
            toast.success('Customer added successfully');
        } else if (modalType === 'edit') {
            setCustomers(customers.map(customer => 
                customer.id === selectedCustomer.id 
                    ? { ...customer, ...formData }
                    : customer
            ));
            toast.success('Customer updated successfully');
        }
        
        setShowModal(false);
        setSelectedCustomer(null);
    };

    const deleteCustomer = (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            setCustomers(customers.filter(customer => customer.id !== id));
            toast.success('Customer deleted successfully');
        }
    };

    const getTierColor = (tier) => {
        switch (tier) {
            case 'platinum': return 'badge-info';
            case 'gold': return 'badge-warning';
            case 'silver': return 'badge-neutral';
            case 'bronze': return 'badge-accent';
            default: return 'badge-ghost';
        }
    };

    const getTierIcon = (tier) => {
        return <FaStar className={`text-${tier === 'platinum' ? 'info' : tier === 'gold' ? 'warning' : tier === 'silver' ? 'neutral' : 'accent'}`} />;
    };

    const isUpcomingBirthday = (birthday) => {
        if (!birthday) return false;
        const today = new Date();
        const birthDate = new Date(birthday);
        const thisYearBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        const daysUntil = Math.ceil((thisYearBirthday - today) / (1000 * 60 * 60 * 24));
        return daysUntil >= 0 && daysUntil <= 30;
    };

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
    );

    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === 'active').length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const avgOrderValue = customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.reduce((sum, c) => sum + c.totalOrders, 1);

    return (
        <div className="min-h-screen bg-base-100 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FaUsers className="text-primary" />
                        Customers Management
                    </h1>
                    <button 
                        onClick={() => openModal('add')}
                        className="btn btn-primary"
                    >
                        <FaPlus /> Add Customer
                    </button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-primary">
                            <FaUsers className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Customers</div>
                        <div className="stat-value text-primary">{totalCustomers}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-success">
                            <FaUsers className="text-3xl" />
                        </div>
                        <div className="stat-title">Active Customers</div>
                        <div className="stat-value text-success">{activeCustomers}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-info">
                            <MdLoyalty className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Revenue</div>
                        <div className="stat-value text-info">${totalRevenue.toFixed(0)}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-warning">
                            <MdHistory className="text-3xl" />
                        </div>
                        <div className="stat-title">Avg Order Value</div>
                        <div className="stat-value text-warning">${avgOrderValue.toFixed(0)}</div>
                    </div>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search customers by name, email, or phone..."
                        className="input input-bordered w-full max-w-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Customers Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCustomers.map(customer => (
                        <div key={customer.id} className="card bg-base-200 shadow-lg">
                            <div className="card-body">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="card-title text-lg flex items-center gap-2">
                                            {customer.name}
                                            {isUpcomingBirthday(customer.birthday) && (
                                                <MdCake className="text-warning" title="Birthday this month!" />
                                            )}
                                        </h3>
                                        <div className={`badge ${getTierColor(customer.tier)} gap-1`}>
                                            {getTierIcon(customer.tier)}
                                            {customer.tier.toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500">Loyalty Points</div>
                                        <div className="font-bold text-primary">{customer.loyaltyPoints}</div>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaEnvelope className="text-primary" />
                                        {customer.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaPhone className="text-primary" />
                                        {customer.phone}
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <MdLocationOn className="text-primary mt-0.5" />
                                        <span className="line-clamp-2">{customer.address}</span>
                                    </div>
                                </div>

                                {/* Statistics */}
                                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                    <div>
                                        <div className="text-gray-500">Total Orders</div>
                                        <div className="font-semibold">{customer.totalOrders}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500">Total Spent</div>
                                        <div className="font-semibold">${customer.totalSpent.toFixed(2)}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500">Last Visit</div>
                                        <div className="font-semibold">
                                            {customer.lastVisit ? new Date(customer.lastVisit).toLocaleDateString() : 'Never'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500">Member Since</div>
                                        <div className="font-semibold">{new Date(customer.joinDate).toLocaleDateString()}</div>
                                    </div>
                                </div>

                                {/* Birthday */}
                                {customer.birthday && (
                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <MdCake className={isUpcomingBirthday(customer.birthday) ? 'text-warning' : 'text-primary'} />
                                            <span>Birthday: {new Date(customer.birthday).toLocaleDateString()}</span>
                                            {isUpcomingBirthday(customer.birthday) && (
                                                <FaGift className="text-warning" title="Send birthday offer!" />
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Favorite Items */}
                                {customer.favoriteItems && customer.favoriteItems.length > 0 && (
                                    <div className="mb-4">
                                        <div className="text-sm text-gray-500 mb-1">Favorite Items</div>
                                        <div className="flex flex-wrap gap-1">
                                            {customer.favoriteItems.slice(0, 2).map((item, index) => (
                                                <div key={index} className="badge badge-sm badge-ghost">
                                                    {item}
                                                </div>
                                            ))}
                                            {customer.favoriteItems.length > 2 && (
                                                <div className="badge badge-sm badge-ghost">
                                                    +{customer.favoriteItems.length - 2} more
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Preferences */}
                                {customer.preferences && (
                                    <div className="mb-4">
                                        <div className="text-sm text-gray-500 mb-1">Preferences</div>
                                        <p className="text-sm line-clamp-2">{customer.preferences}</p>
                                    </div>
                                )}

                                {/* Notes */}
                                {customer.notes && (
                                    <div className="mb-4">
                                        <div className="text-sm text-gray-500 mb-1">Notes</div>
                                        <p className="text-sm line-clamp-2">{customer.notes}</p>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="card-actions justify-end">
                                    <button 
                                        onClick={() => toast.success('Loyalty reward sent!')}
                                        className="btn btn-sm btn-success"
                                    >
                                        <FaGift /> Reward
                                    </button>
                                    <button 
                                        onClick={() => openModal('edit', customer)}
                                        className="btn btn-sm btn-info"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button 
                                        onClick={() => deleteCustomer(customer.id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCustomers.length === 0 && (
                    <div className="text-center py-12">
                        <FaUsers className="text-6xl text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No customers found</p>
                    </div>
                )}

                {/* Add/Edit Modal */}
                {showModal && (
                    <div className="modal modal-open">
                        <div className="modal-box max-w-2xl">
                            <h3 className="font-bold text-lg mb-4">
                                {modalType === 'add' ? 'Add New Customer' : 'Edit Customer'}
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
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Birthday</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="input input-bordered w-full"
                                            value={formData.birthday}
                                            onChange={(e) => setFormData({...formData, birthday: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Address</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        rows="2"
                                        value={formData.address}
                                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Dietary Preferences</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full"
                                        value={formData.preferences}
                                        onChange={(e) => setFormData({...formData, preferences: e.target.value})}
                                        placeholder="e.g., Vegetarian, Gluten-free, No nuts"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Notes</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        rows="3"
                                        value={formData.notes}
                                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                        placeholder="Any special notes about the customer..."
                                    ></textarea>
                                </div>

                                <div className="modal-action">
                                    <button type="submit" className="btn btn-primary">
                                        {modalType === 'add' ? 'Add Customer' : 'Update Customer'}
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

export default CustomersManagement;