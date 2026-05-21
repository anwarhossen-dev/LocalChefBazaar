import React, { useState, useMemo } from 'react';

const useInventoryLogic = (initialData) => {
    const [inventory, setInventory] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredInventory = useMemo(() => {
        return inventory.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [inventory, searchTerm, selectedCategory]);

    const stats = useMemo(() => {
        const lowStockItems = inventory.filter(item => item.currentStock <= item.minStock);
        const criticalItems = inventory.filter(item => item.currentStock <= item.minStock * 0.5);
        const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0);
        
        return {
            totalItems: inventory.length,
            lowStockCount: lowStockItems.length,
            criticalCount: criticalItems.length,
            totalValue,
            criticalItems
        };
    }, [inventory]);

    const deleteItem = (id) => {
        setInventory(prev => prev.filter(item => item.id !== id));
    };

    const updateStock = (id, newStock) => {
        setInventory(prev => prev.map(item => 
            item.id === id ? { ...item, currentStock: newStock, lastUpdated: new Date() } : item
        ));
    };

    return {
        inventory: filteredInventory,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        stats,
        deleteItem,
        updateStock,
        setInventory
    };
};

const InventoryOrchestrator = ({ demoData, children }) => {
    const logic = useInventoryLogic(demoData);
    return children(logic);
};

export default InventoryOrchestrator;
