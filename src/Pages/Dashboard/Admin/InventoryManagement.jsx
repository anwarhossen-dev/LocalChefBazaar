import React, { useState } from 'react';
import { FaBoxes, FaExclamationTriangle, FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { MdInventory, MdTrendingUp } from 'react-icons/md';
import { toast } from 'react-toastify';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import StatCard from '../../../Components/UI/Primitives/StatCard';
import DataTable from '../../../Components/UI/Primitives/DataTable';
import InventoryOrchestrator from '../../../Components/Dashboard/Inventory/InventoryOrchestrator';

const demoInventory = [
    {
        id: 1,
        name: 'Chicken Breast',
        category: 'ingredients',
        currentStock: 25,
        minStock: 20,
        maxStock: 100,
        unit: 'kg',
        costPerUnit: 8.50,
        supplier: 'Fresh Meat Co.',
        expiryDate: '2024-04-10',
        location: 'freezer',
        lastUpdated: new Date(),
        status: 'in-stock'
    },
    {
        id: 2,
        name: 'Tomatoes',
        category: 'ingredients',
        currentStock: 5,
        minStock: 15,
        maxStock: 50,
        unit: 'kg',
        costPerUnit: 3.20,
        supplier: 'Garden Fresh',
        expiryDate: '2024-04-08',
        location: 'kitchen',
        lastUpdated: new Date(),
        status: 'low-stock'
    },
    {
        id: 3,
        name: 'Coca Cola',
        category: 'beverages',
        currentStock: 48,
        minStock: 24,
        maxStock: 120,
        unit: 'bottles',
        costPerUnit: 1.50,
        supplier: 'Beverage Distributors',
        expiryDate: '2024-12-31',
        location: 'bar',
        lastUpdated: new Date(),
        status: 'in-stock'
    },
    {
        id: 4,
        name: 'Olive Oil',
        category: 'ingredients',
        currentStock: 2,
        minStock: 5,
        maxStock: 20,
        unit: 'l',
        costPerUnit: 12.00,
        supplier: 'Mediterranean Imports',
        expiryDate: '2025-01-15',
        location: 'kitchen',
        lastUpdated: new Date(),
        status: 'critical'
    }
];

const InventoryManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'ingredients',
        currentStock: 0,
        minStock: 10,
        maxStock: 100,
        unit: 'kg',
        costPerUnit: 0,
        supplier: '',
        expiryDate: '',
        location: 'main-storage'
    });

    const categories = ['all', 'ingredients', 'beverages', 'cleaning', 'packaging', 'equipment'];

    const getStatusBadge = (item) => {
        if (item.currentStock <= item.minStock * 0.5) return 'badge-error shadow-sm shadow-red-200 text-white border-none py-3';
        if (item.currentStock <= item.minStock) return 'badge-warning shadow-sm shadow-orange-200 text-white border-none py-3';
        return 'badge-success shadow-sm shadow-emerald-200 text-white border-none py-3';
    };

    const getStatusText = (item) => {
        if (item.currentStock <= item.minStock * 0.5) return 'Critical';
        if (item.currentStock <= item.minStock) return 'Low Stock';
        return 'Healthy';
    };

    const columns = [
        { header: 'Asset Item' },
        { header: 'Category' },
        { header: 'Live Stock' },
        { header: 'Health' },
        { header: 'Unit / Total' },
        { header: 'Storage' },
        { header: 'Actions', className: 'text-right' }
    ];

    return (
        <InventoryOrchestrator demoData={demoInventory}>
            {({ inventory, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, stats, deleteItem, updateStock, setInventory }) => {
                
                const openModal = (type, item = null) => {
                    setModalType(type);
                    if (item) {
                        setSelectedItem(item);
                        setFormData({ ...item, expiryDate: item.expiryDate || '' });
                    } else {
                        setFormData({
                            name: '', category: 'ingredients', currentStock: 0, minStock: 10,
                            maxStock: 100, unit: 'kg', costPerUnit: 0, supplier: '',
                            expiryDate: '', location: 'main-storage'
                        });
                    }
                    setShowModal(true);
                };

                const handleSubmit = (e) => {
                    e.preventDefault();
                    if (modalType === 'add') {
                        const newItem = {
                            id: Math.max(...inventory.map(i => i.id), 0) + 1,
                            ...formData,
                            currentStock: parseFloat(formData.currentStock),
                            minStock: parseFloat(formData.minStock),
                            maxStock: parseFloat(formData.maxStock),
                            costPerUnit: parseFloat(formData.costPerUnit),
                            lastUpdated: new Date()
                        };
                        setInventory(prev => [...prev, newItem]);
                        toast.success('Inventory item added successfully!');
                    } else {
                        setInventory(prev => prev.map(item => 
                            item.id === selectedItem.id ? { ...item, ...formData, lastUpdated: new Date() } : item
                        ));
                        toast.success('Inventory updated smoothly.');
                    }
                    setShowModal(false);
                };

                return (
                    <div className="min-h-screen bg-gray-50/50 pb-16 font-sans">
                        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
                            {/* Header */}
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
                                <div>
                                    <h1 className="text-4xl font-extrabold flex items-center gap-3 text-slate-800 tracking-tight">
                                        <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl shadow-lg shadow-primary/30">
                                            <MdInventory className="text-white text-3xl" />
                                        </div>
                                        Inventory Vault
                                    </h1>
                                    <p className="text-slate-500 mt-2 ml-14 font-medium">Real-time stock insights and asset management.</p>
                                </div>
                                <Motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => openModal('add')}
                                    className="btn btn-primary shadow-lg shadow-primary/30 rounded-xl mt-6 md:mt-0 px-6 font-bold"
                                >
                                    <FaPlus /> Stock New Item
                                </Motion.button>
                            </div>

                            {/* Statistics Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                <StatCard title="Total Assets" value={stats.totalItems} icon={FaBoxes} />
                                <StatCard title="Approaching Low" value={stats.lowStockCount} icon={FaExclamationTriangle} colorClass="border-orange-100" />
                                <StatCard 
                                    title="Critical Depletion" 
                                    value={stats.criticalCount} 
                                    icon={FaExclamationTriangle} 
                                    colorClass="bg-gradient-to-br from-red-500 to-rose-600 text-white border-none" 
                                />
                                <StatCard title="Capital Value" value={`$${stats.totalValue.toFixed(2)}`} icon={MdTrendingUp} />
                            </div>

                            {/* Alerts */}
                            <AnimatePresence>
                                {stats.criticalCount > 0 && (
                                    <Motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-2xl mb-8 flex items-center gap-3 shadow-sm text-red-800"
                                    >
                                        <FaExclamationTriangle className="text-xl text-red-500 animate-pulse" />
                                        <p className="font-medium text-sm">
                                            <strong>Immediate Attention Required:</strong> {stats.criticalCount} asset(s) hit critical reserves.
                                        </p>
                                    </Motion.div>
                                )}
                            </AnimatePresence>

                            {/* Controls */}
                            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4">
                                <div className="relative flex-1">
                                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Discover raw materials, suppliers..."
                                        className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 text-slate-700"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <select
                                    className="w-full md:w-64 bg-slate-50 border-none rounded-xl px-4 py-3"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'Every Category' : c.toUpperCase()}</option>)}
                                </select>
                            </div>

                            {/* Main Table */}
                            <DataTable 
                                columns={columns}
                                data={inventory}
                                emptyMessage="No assets discovered."
                                renderRow={(item) => (
                                    <Motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-slate-50 hover:bg-slate-50/50 group">
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold">{item.name.charAt(0)}</div>
                                                <div>
                                                    <div className="font-bold text-slate-800 text-sm group-hover:text-primary">{item.name}</div>
                                                    <div className="text-xs text-slate-400">{item.supplier}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5"><span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">{item.category}</span></td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-2">
                                                <input type="number" className="w-20 bg-slate-50 border rounded-lg px-2 py-1" value={item.currentStock} onChange={(e) => updateStock(item.id, parseFloat(e.target.value) || 0)} />
                                                <span className="text-slate-500 font-semibold uppercase text-xs">{item.unit}</span>
                                            </div>
                                        </td>
                                        <td className="p-5"><div className={`badge ${getStatusBadge(item)}`}>{getStatusText(item)}</div></td>
                                        <td className="p-5">
                                            <div className="text-xs text-slate-500">${item.costPerUnit.toFixed(2)}/u</div>
                                            <div className="font-black text-slate-800">${(item.currentStock * item.costPerUnit).toFixed(2)}</div>
                                        </td>
                                        <td className="p-5"><div className="text-xs font-medium text-slate-600 capitalize">{item.location}</div></td>
                                        <td className="p-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => openModal('edit', item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"><FaEdit size={14} /></button>
                                            <button onClick={() => deleteItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full"><FaTrash size={14} /></button>
                                        </td>
                                    </Motion.tr>
                                )}
                            />

                            {/* Form Modal */}
                            {showModal && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                                    <Motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-3xl shadow-2xl relative w-full max-w-2xl overflow-hidden p-8">
                                        <h3 className="font-black text-2xl mb-6">{modalType === 'add' ? 'Stock Entry' : 'Update Item'}</h3>
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <input className="input input-bordered" placeholder="Item Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                                                <select className="select select-bordered" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                                                    {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <input type="number" className="input input-bordered" placeholder="Stock" value={formData.currentStock} onChange={e => setFormData({...formData, currentStock: e.target.value})} />
                                                <input type="number" className="input input-bordered" placeholder="Min" value={formData.minStock} onChange={e => setFormData({...formData, minStock: e.target.value})} />
                                                <input type="number" className="input input-bordered" placeholder="Price" value={formData.costPerUnit} onChange={e => setFormData({...formData, costPerUnit: e.target.value})} />
                                            </div>
                                            <div className="flex justify-end gap-2 mt-6">
                                                <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost">Cancel</button>
                                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                            </div>
                                        </form>
                                    </Motion.div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            }}
        </InventoryOrchestrator>
    );
};

export default InventoryManagement;