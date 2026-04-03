import React, { useState, useEffect } from 'react';
import { FaTruck, FaPlus, FaEdit, FaTrash, FaPhone, FaEnvelope, FaStar } from 'react-icons/fa';
import { MdPayment, MdHistory, MdLocationOn } from 'react-icons/md';
import { toast } from 'react-toastify';

const SuppliersManagement = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        contactPerson: '',
        phone: '',
        email: '',
        address: '',
        category: 'food',
        rating: 5,
        paymentTerms: '30',
        status: 'active',
        notes: ''
    });

    const categories = ['food', 'beverages', 'cleaning', 'equipment', 'packaging', 'other'];
    const paymentTermsOptions = ['15', '30', '45', '60', 'COD'];

    // Demo suppliers data
    useEffect(() => {
        const demoSuppliers = [
            {
                id: 1,
                name: 'Fresh Farm Produce',
                contactPerson: 'John Smith',
                phone: '+1-555-0123',
                email: 'john@freshfarm.com',
                address: '123 Farm Road, Green Valley, CA 90210',
                category: 'food',
                rating: 4.8,
                paymentTerms: '30',
                status: 'active',
                notes: 'Excellent quality vegetables and fruits',
                totalOrders: 156,
                totalSpent: 45678.90,
                lastOrder: '2024-04-01',
                products: ['Tomatoes', 'Lettuce', 'Onions', 'Carrots']
            },
            {
                id: 2,
                name: 'Premium Meat Co.',
                contactPerson: 'Sarah Johnson',
                phone: '+1-555-0124',
                email: 'sarah@premiummeat.com',
                address: '456 Butcher Street, Meat District, TX 75201',
                category: 'food',
                rating: 4.9,
                paymentTerms: '15',
                status: 'active',
                notes: 'High-quality meat products, reliable delivery',
                totalOrders: 89,
                totalSpent: 67890.12,
                lastOrder: '2024-04-02',
                products: ['Beef', 'Chicken', 'Pork', 'Lamb']
            },
            {
                id: 3,
                name: 'Beverage Distributors Inc.',
                contactPerson: 'Mike Wilson',
                phone: '+1-555-0125',
                email: 'mike@beveragedist.com',
                address: '789 Drink Avenue, Liquid City, FL 33101',
                category: 'beverages',
                rating: 4.5,
                paymentTerms: '45',
                status: 'active',
                notes: 'Wide selection of beverages, competitive prices',
                totalOrders: 234,
                totalSpent: 23456.78,
                lastOrder: '2024-03-30',
                products: ['Soft Drinks', 'Juices', 'Water', 'Energy Drinks']
            },
            {
                id: 4,
                name: 'Clean & Shine Supplies',
                contactPerson: 'Lisa Brown',
                phone: '+1-555-0126',
                email: 'lisa@cleanshine.com',
                address: '321 Clean Street, Sparkle Town, NY 10001',
                category: 'cleaning',
                rating: 4.2,
                paymentTerms: '30',
                status: 'inactive',
                notes: 'Good cleaning supplies but delivery issues',
                totalOrders: 45,
                totalSpent: 8765.43,
                lastOrder: '2024-03-15',
                products: ['Detergents', 'Sanitizers', 'Paper Towels', 'Gloves']
            }
        ];
        setSuppliers(demoSuppliers);
    }, []);

    const openModal = (type, supplier = null) => {
        setModalType(type);
        if (supplier) {
            setSelectedSupplier(supplier);
            setFormData({
                name: supplier.name,
                contactPerson: supplier.contactPerson,
                phone: supplier.phone,
                email: supplier.email,
                address: supplier.address,
                category: supplier.category,
                rating: supplier.rating,
                paymentTerms: supplier.paymentTerms,
                status: supplier.status,
                notes: supplier.notes
            });
        } else {
            setFormData({
                name: '',
                contactPerson: '',
                phone: '',
                email: '',
                address: '',
                category: 'food',
                rating: 5,
                paymentTerms: '30',
                status: 'active',
                notes: ''
            });
        }
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (modalType === 'add') {
            const newSupplier = {
                id: Math.max(...suppliers.map(s => s.id), 0) + 1,
                ...formData,
                rating: parseFloat(formData.rating),
                totalOrders: 0,
                totalSpent: 0,
                lastOrder: null,
                products: []
            };
            setSuppliers([...suppliers, newSupplier]);
            toast.success('Supplier added successfully');
        } else if (modalType === 'edit') {
            setSuppliers(suppliers.map(supplier => 
                supplier.id === selectedSupplier.id 
                    ? { ...supplier, ...formData, rating: parseFloat(formData.rating) }
                    : supplier
            ));
            toast.success('Supplier updated successfully');
        }
        
        setShowModal(false);
        setSelectedSupplier(null);
    };

    const deleteSupplier = (id) => {
        if (window.confirm('Are you sure you want to delete this supplier?')) {
            setSuppliers(suppliers.filter(supplier => supplier.id !== id));
            toast.success('Supplier deleted successfully');
        }
    };

    const updateStatus = (id, newStatus) => {
        setSuppliers(suppliers.map(supplier => 
            supplier.id === id ? { ...supplier, status: newStatus } : supplier
        ));
        toast.success(`Supplier status updated to ${newStatus}`);
    };

    const getStatusColor = (status) => {
        return status === 'active' ? 'badge-success' : 'badge-error';
    };

    const getRatingStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <FaStar 
                key={i} 
                className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'} 
            />
        ));
    };

    const activeSuppliers = suppliers.filter(s => s.status === 'active').length;
    const totalSpent = suppliers.reduce((sum, s) => sum + s.totalSpent, 0);
    const avgRating = suppliers.length > 0 ? suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length : 0;

    return (
        <div className="min-h-screen bg-base-100 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FaTruck className="text-primary" />
                        Suppliers Management
                    </h1>
                    <button 
                        onClick={() => openModal('add')}
                        className="btn btn-primary"
                    >
                        <FaPlus /> Add Supplier
                    </button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-primary">
                            <FaTruck className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Suppliers</div>
                        <div className="stat-value text-primary">{suppliers.length}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-success">
                            <FaTruck className="text-3xl" />
                        </div>
                        <div className="stat-title">Active Suppliers</div>
                        <div className="stat-value text-success">{activeSuppliers}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-info">
                            <MdPayment className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Spent</div>
                        <div className="stat-value text-info">${totalSpent.toFixed(2)}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-warning">
                            <FaStar className="text-3xl" />
                        </div>
                        <div className="stat-title">Avg Rating</div>
                        <div className="stat-value text-warning">{avgRating.toFixed(1)}</div>
                    </div>
                </div>

                {/* Suppliers Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {suppliers.map(supplier => (
                        <div key={supplier.id} className="card bg-base-200 shadow-lg">
                            <div className="card-body">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="card-title text-lg">{supplier.name}</h3>
                                        <p className="text-sm text-gray-500">{supplier.contactPerson}</p>
                                    </div>
                                    <div className={`badge ${getStatusColor(supplier.status)}`}>
                                        {supplier.status.toUpperCase()}
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaPhone className="text-primary" />
                                        {supplier.phone}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaEnvelope className="text-primary" />
                                        {supplier.email}
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <MdLocationOn className="text-primary mt-0.5" />
                                        <span className="line-clamp-2">{supplier.address}</span>
                                    </div>
                                </div>

                                {/* Category and Rating */}
                                <div className="flex justify-between items-center mb-4">
                                    <div className="badge badge-outline">
                                        {supplier.category.charAt(0).toUpperCase() + supplier.category.slice(1)}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {getRatingStars(supplier.rating)}
                                        <span className="text-sm ml-1">{supplier.rating}</span>
                                    </div>
                                </div>

                                {/* Statistics */}
                                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                    <div>
                                        <div className="text-gray-500">Total Orders</div>
                                        <div className="font-semibold">{supplier.totalOrders}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500">Total Spent</div>
                                        <div className="font-semibold">${supplier.totalSpent.toFixed(2)}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500">Payment Terms</div>
                                        <div className="font-semibold">{supplier.paymentTerms} days</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500">Last Order</div>
                                        <div className="font-semibold">
                                            {supplier.lastOrder ? new Date(supplier.lastOrder).toLocaleDateString() : 'Never'}
                                        </div>
                                    </div>
                                </div>

                                {/* Products */}
                                {supplier.products && supplier.products.length > 0 && (
                                    <div className="mb-4">
                                        <div className="text-sm text-gray-500 mb-1">Products</div>
                                        <div className="flex flex-wrap gap-1">
                                            {supplier.products.slice(0, 3).map((product, index) => (
                                                <div key={index} className="badge badge-sm badge-ghost">
                                                    {product}
                                                </div>
                                            ))}
                                            {supplier.products.length > 3 && (
                                                <div className="badge badge-sm badge-ghost">
                                                    +{supplier.products.length - 3} more
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Notes */}
                                {supplier.notes && (
                                    <div className="mb-4">
                                        <div className="text-sm text-gray-500 mb-1">Notes</div>
                                        <p className="text-sm line-clamp-2">{supplier.notes}</p>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="card-actions justify-end">
                                    <div className="dropdown dropdown-end">
                                        <label tabIndex={0} className="btn btn-sm btn-ghost">
                                            Status
                                        </label>
                                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                                            <li><a onClick={() => updateStatus(supplier.id, 'active')}>Active</a></li>
                                            <li><a onClick={() => updateStatus(supplier.id, 'inactive')}>Inactive</a></li>
                                        </ul>
                                    </div>
                                    <button 
                                        onClick={() => openModal('edit', supplier)}
                                        className="btn btn-sm btn-info"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button 
                                        onClick={() => deleteSupplier(supplier.id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {suppliers.length === 0 && (
                    <div className="text-center py-12">
                        <FaTruck className="text-6xl text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No suppliers found</p>
                    </div>
                )}

                {/* Add/Edit Modal */}
                {showModal && (
                    <div className="modal modal-open">
                        <div className="modal-box max-w-2xl">
                            <h3 className="font-bold text-lg mb-4">
                                {modalType === 'add' ? 'Add New Supplier' : 'Edit Supplier'}
                            </h3>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Company Name *</span>
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
                                            <span className="label-text">Contact Person *</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="input input-bordered w-full"
                                            value={formData.contactPerson}
                                            onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
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

                                <div>
                                    <label className="label">
                                        <span className="label-text">Address *</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        rows="2"
                                        value={formData.address}
                                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                                        required
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Category *</span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={formData.category}
                                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                                            required
                                        >
                                            {categories.map(category => (
                                                <option key={category} value={category}>
                                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Rating</span>
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="5"
                                            step="0.1"
                                            className="input input-bordered w-full"
                                            value={formData.rating}
                                            onChange={(e) => setFormData({...formData, rating: e.target.value})}
                                        />
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Payment Terms</span>
                                        </label>
                                        <select
                                            className="select select-bordered w-full"
                                            value={formData.paymentTerms}
                                            onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}
                                        >
                                            {paymentTermsOptions.map(term => (
                                                <option key={term} value={term}>
                                                    {term === 'COD' ? 'Cash on Delivery' : `${term} days`}
                                                </option>
                                            ))}
                                        </select>
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
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
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
                                        placeholder="Additional notes about the supplier..."
                                    ></textarea>
                                </div>

                                <div className="modal-action">
                                    <button type="submit" className="btn btn-primary">
                                        {modalType === 'add' ? 'Add Supplier' : 'Update Supplier'}
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

export default SuppliersManagement;