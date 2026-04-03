import React, { useState, useEffect, useMemo } from 'react';
import { FaBoxes, FaExclamationTriangle, FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { MdInventory, MdTrendingDown, MdTrendingUp } from 'react-icons/md';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const InventoryManagement = () => {
    const [inventory, setInventory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
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
    const units = ['kg', 'g', 'l', 'ml', 'pcs', 'boxes', 'bottles'];
    const locations = ['main-storage', 'kitchen', 'bar', 'freezer', 'dry-storage'];

    // Demo inventory data
    useEffect(() => {
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
        setInventory(demoInventory);
    }, []);

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

    const openModal = (type, item = null) => {
        setModalType(type);
        if (item) {
            setSelectedItem(item);
            setFormData({
                ...item,
                expiryDate: item.expiryDate || ''
            });
        } else {
            setFormData({
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
                lastUpdated: new Date(),
                status: 'in-stock'
            };
            setInventory([...inventory, newItem]);
            toast.success('Inventory item added successfully!', { position: 'bottom-right' });
        } else if (modalType === 'edit') {
            setInventory(inventory.map(item => 
                item.id === selectedItem.id 
                    ? { 
                        ...item, 
                        ...formData,
                        currentStock: parseFloat(formData.currentStock),
                        minStock: parseFloat(formData.minStock),
                        maxStock: parseFloat(formData.maxStock),
                        costPerUnit: parseFloat(formData.costPerUnit),
                        lastUpdated: new Date()
                      }
                    : item
            ));
            toast.success('Inventory updated smoothly.', { position: 'bottom-right' });
        }
        
        setShowModal(false);
        setSelectedItem(null);
    };

    const deleteItem = (id) => {
        if (window.confirm('Erase this item from records?')) {
            setInventory(inventory.filter(item => item.id !== id));
            toast.success('Item deleted', { position: 'bottom-right' });
        }
    };

    const updateStock = (id, newStock) => {
        setInventory(inventory.map(item => 
            item.id === id 
                ? { ...item, currentStock: newStock, lastUpdated: new Date() }
                : item
        ));
    };

    const filteredInventory = inventory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const lowStockItems = inventory.filter(item => item.currentStock <= item.minStock);
    const criticalItems = inventory.filter(item => item.currentStock <= item.minStock * 0.5);
    const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0);

    const currentDate = useMemo(() => new Date(), []);
    const weekFromNow = useMemo(() => new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000), [currentDate]);

    // Parent container animations
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pb-16 font-sans">
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10"
                >
                    <div>
                        <h1 className="text-4xl font-extrabold flex items-center gap-3 text-slate-800 tracking-tight">
                            <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl shadow-lg shadow-primary/30">
                                <MdInventory className="text-white text-3xl" />
                            </div>
                            Inventory Vault
                        </h1>
                        <p className="text-slate-500 mt-2 ml-14 font-medium">Real-time stock insights and asset management.</p>
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openModal('add')}
                        className="btn btn-primary shadow-lg shadow-primary/30 rounded-xl mt-6 md:mt-0 px-6 font-bold"
                    >
                        <FaPlus /> Stock New Item
                    </motion.button>
                </motion.div>

                {/* Statistics Cards */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
                >
                    <motion.div variants={itemVariants} className="bg-white hover:shadow-xl transition-all duration-300 rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-6 group">
                        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <FaBoxes className="text-2xl text-blue-500" />
                        </div>
                        <div>
                            <div className="text-slate-500 font-medium text-sm">Total Assets</div>
                            <div className="text-3xl font-black text-slate-800">{inventory.length}</div>
                        </div>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="bg-white hover:shadow-xl transition-all duration-300 rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-6 group relative overflow-hidden">
                        <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <FaExclamationTriangle className="text-2xl text-orange-500" />
                        </div>
                        <div>
                            <div className="text-slate-500 font-medium text-sm">Approaching Low</div>
                            <div className="text-3xl font-black text-slate-800">{lowStockItems.length}</div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl p-6 shadow-lg shadow-rose-200 flex items-center gap-6 group relative overflow-hidden text-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm shadow-inner">
                            <FaExclamationTriangle className="text-2xl text-white" />
                        </div>
                        <div className="relative z-10">
                            <div className="text-red-100 font-medium text-sm">Critical Depletion</div>
                            <div className="text-3xl font-black">{criticalItems.length}</div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-white hover:shadow-xl transition-all duration-300 rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-6 group">
                        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <MdTrendingUp className="text-2xl text-emerald-500" />
                        </div>
                        <div>
                            <div className="text-slate-500 font-medium text-sm">Capital Value</div>
                            <div className="text-3xl font-black text-slate-800">${totalValue.toFixed(2)}</div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Alerts */}
                <AnimatePresence>
                    {criticalItems.length > 0 && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-2xl mb-8 flex items-center gap-3 shadow-sm text-red-800"
                        >
                            <div className="flex-shrink-0 animate-pulse">
                                <FaExclamationTriangle className="text-xl text-red-500" />
                            </div>
                            <p className="font-medium text-sm">
                                <strong>Immediate Attention Required:</strong> {criticalItems.length} asset(s) hit critical reserves: 
                                <span className="ml-1 opacity-80">{criticalItems.map(item => item.name).join(', ')}</span>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Controls (Search & Filter) */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 backdrop-blur-xl"
                >
                    <div className="relative flex-1">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Discover raw materials, suppliers, or items..."
                            className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="w-full md:w-64">
                        <select
                            className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer font-medium appearance-none"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(category => (
                                <option key={category} value={category} className="font-medium">
                                    {category === 'all' ? 'Every Category' : category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </motion.div>

                {/* Main Data Table */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden"
                >
                    <div className="overflow-x-auto p-1">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider">Asset Item</th>
                                    <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider">Category</th>
                                    <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider">Live Stock</th>
                                    <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider">Health</th>
                                    <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider">Unit / Total</th>
                                    <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider">Storage</th>
                                    <th className="p-5 font-bold text-slate-500 uppercase text-xs tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {filteredInventory.map(item => (
                                        <motion.tr 
                                            key={item.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group"
                                        >
                                            <td className="p-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold shadow-inner">
                                                        {item.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors">{item.name}</div>
                                                        <div className="text-xs text-slate-400 font-medium">{item.supplier}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold capitalize tracking-wide shadow-sm">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="p-5 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        className="w-20 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-bold focus:outline-none focus:border-primary transition-colors"
                                                        value={item.currentStock}
                                                        onChange={(e) => updateStock(item.id, parseFloat(e.target.value) || 0)}
                                                    />
                                                    <span className="text-slate-500 font-semibold uppercase">{item.unit}</span>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className={`badge ${getStatusBadge(item)} select-none`}>
                                                    {getStatusText(item)}
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="text-xs text-slate-500 font-medium mb-0.5">${item.costPerUnit.toFixed(2)}/u</div>
                                                <div className="font-black text-slate-800 tracking-tight">
                                                    ${(item.currentStock * item.costPerUnit).toFixed(2)}
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 capitalize">
                                                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                                                    {item.location.replace('-', ' ')}
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <motion.button 
                                                        whileHover={{ scale: 1.1, backgroundColor: '#f1f5f9' }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => openModal('edit', item)}
                                                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-blue-600"
                                                    >
                                                        <FaEdit size={14} />
                                                    </motion.button>
                                                    <motion.button 
                                                        whileHover={{ scale: 1.1, backgroundColor: '#fef2f2' }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => deleteItem(item.id)}
                                                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500"
                                                    >
                                                        <FaTrash size={14} />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                        
                        {filteredInventory.length === 0 && (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">📦</div>
                                <h3 className="text-xl font-bold text-slate-700">No assets discovered.</h3>
                                <p className="text-slate-400 mt-2">Adjust your filters to reveal concealed items.</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Form Modal */}
                <AnimatePresence>
                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                                onClick={() => setShowModal(false)}
                            ></motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-white rounded-3xl shadow-2xl relative w-full max-w-2xl overflow-hidden"
                            >
                                <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 p-6 px-8">
                                    <h3 className="font-black text-2xl text-slate-800">
                                        {modalType === 'add' ? 'Stock Entry Form' : 'Update Stock Attributes'}
                                    </h3>
                                    <p className="text-sm text-slate-500 font-medium">Please verify all data before committing to the grand ledger.</p>
                                </div>
                                
                                <div className="p-8 pb-4">
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Item Designation *</label>
                                                <input type="text" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required placeholder="e.g. Saffron" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Asset Class *</label>
                                                <select className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required>
                                                    {categories.slice(1).map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-5">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Current Qty</label>
                                                <input type="number" step="1" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-primary/50" value={formData.currentStock} onChange={(e) => setFormData({...formData, currentStock: e.target.value})} required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Min Reserve</label>
                                                <input type="number" step="1" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-700 font-bold text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/50" value={formData.minStock} onChange={(e) => setFormData({...formData, minStock: e.target.value})} required />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Capacity</label>
                                                <input type="number" step="1" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-primary/50" value={formData.maxStock} onChange={(e) => setFormData({...formData, maxStock: e.target.value})} required />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Unit Type</label>
                                                <select className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-700 font-bold uppercase focus:outline-none focus:ring-2 focus:ring-primary/50" value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})}>
                                                    {units.map(u => <option key={u} value={u}>{u}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Cost Rate ($)</label>
                                                <input type="number" step="0.01" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/50" value={formData.costPerUnit} onChange={(e) => setFormData({...formData, costPerUnit: e.target.value})} required />
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 pb-4">
                                            <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost rounded-xl">Discard</button>
                                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="btn btn-primary rounded-xl px-8 shadow-lg shadow-primary/30 text-white font-bold tracking-wide">
                                                {modalType === 'add' ? 'Commit Entry' : 'Save Attributes'}
                                            </motion.button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default InventoryManagement;