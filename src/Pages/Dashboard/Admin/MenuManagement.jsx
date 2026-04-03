import React, { useState, useEffect } from 'react';
import { FaUtensils, FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaImage } from 'react-icons/fa';
import { MdRestaurantMenu, MdCategory } from 'react-icons/md';
import { toast } from 'react-toastify';

const MenuManagement = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        ingredients: '',
        allergens: '',
        calories: '',
        prepTime: 15,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        isSpicy: false,
        isAvailable: true,
        isPopular: false,
        image: ''
    });

    // Demo categories
    useEffect(() => {
        const demoCategories = [
            { id: 1, name: 'Appetizers', description: 'Start your meal right', active: true },
            { id: 2, name: 'Main Course', description: 'Hearty main dishes', active: true },
            { id: 3, name: 'Desserts', description: 'Sweet endings', active: true },
            { id: 4, name: 'Beverages', description: 'Refreshing drinks', active: true },
            { id: 5, name: 'Salads', description: 'Fresh and healthy', active: true }
        ];
        setCategories(demoCategories);
    }, []);

    // Demo menu items
    useEffect(() => {
        const demoMenuItems = [
            {
                id: 1,
                name: 'Grilled Chicken Caesar Salad',
                description: 'Fresh romaine lettuce with grilled chicken, parmesan cheese, and caesar dressing',
                price: 14.99,
                category: 'Salads',
                ingredients: 'Romaine lettuce, Grilled chicken, Parmesan cheese, Caesar dressing, Croutons',
                allergens: 'Dairy, Gluten',
                calories: 420,
                prepTime: 12,
                isVegetarian: false,
                isVegan: false,
                isGlutenFree: false,
                isSpicy: false,
                isAvailable: true,
                isPopular: true,
                image: ''
            },
            {
                id: 2,
                name: 'Margherita Pizza',
                description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil',
                price: 16.99,
                category: 'Main Course',
                ingredients: 'Pizza dough, Tomato sauce, Mozzarella, Fresh basil, Olive oil',
                allergens: 'Gluten, Dairy',
                calories: 680,
                prepTime: 18,
                isVegetarian: true,
                isVegan: false,
                isGlutenFree: false,
                isSpicy: false,
                isAvailable: true,
                isPopular: true,
                image: ''
            },
            {
                id: 3,
                name: 'Chocolate Lava Cake',
                description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
                price: 8.99,
                category: 'Desserts',
                ingredients: 'Dark chocolate, Butter, Eggs, Sugar, Flour, Vanilla ice cream',
                allergens: 'Gluten, Dairy, Eggs',
                calories: 520,
                prepTime: 8,
                isVegetarian: true,
                isVegan: false,
                isGlutenFree: false,
                isSpicy: false,
                isAvailable: true,
                isPopular: false,
                image: ''
            }
        ];
        setMenuItems(demoMenuItems);
    }, []);

    const openModal = (type, item = null) => {
        setModalType(type);
        if (item) {
            setSelectedItem(item);
            setFormData(item);
        } else {
            setFormData({
                name: '',
                description: '',
                price: 0,
                category: categories[0]?.name || '',
                ingredients: '',
                allergens: '',
                calories: '',
                prepTime: 15,
                isVegetarian: false,
                isVegan: false,
                isGlutenFree: false,
                isSpicy: false,
                isAvailable: true,
                isPopular: false,
                image: ''
            });
        }
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (modalType === 'add') {
            const newItem = {
                id: Math.max(...menuItems.map(i => i.id), 0) + 1,
                ...formData,
                price: parseFloat(formData.price),
                calories: parseInt(formData.calories) || 0,
                prepTime: parseInt(formData.prepTime)
            };
            setMenuItems([...menuItems, newItem]);
            toast.success('Menu item added successfully');
        } else if (modalType === 'edit') {
            setMenuItems(menuItems.map(item => 
                item.id === selectedItem.id 
                    ? { 
                        ...item, 
                        ...formData,
                        price: parseFloat(formData.price),
                        calories: parseInt(formData.calories) || 0,
                        prepTime: parseInt(formData.prepTime)
                      }
                    : item
            ));
            toast.success('Menu item updated successfully');
        }
        
        setShowModal(false);
        setSelectedItem(null);
    };

    const deleteItem = (id) => {
        if (window.confirm('Are you sure you want to delete this menu item?')) {
            setMenuItems(menuItems.filter(item => item.id !== id));
            toast.success('Menu item deleted successfully');
        }
    };

    const toggleAvailability = (id) => {
        setMenuItems(menuItems.map(item => 
            item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
        ));
        toast.success('Availability updated');
    };

    const filteredItems = selectedCategory === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === selectedCategory);

    const getItemBadges = (item) => {
        const badges = [];
        if (item.isVegetarian) badges.push({ text: 'Vegetarian', class: 'badge-success' });
        if (item.isVegan) badges.push({ text: 'Vegan', class: 'badge-accent' });
        if (item.isGlutenFree) badges.push({ text: 'Gluten Free', class: 'badge-info' });
        if (item.isSpicy) badges.push({ text: 'Spicy', class: 'badge-error' });
        if (item.isPopular) badges.push({ text: 'Popular', class: 'badge-warning' });
        return badges;
    };

    return (
        <div className="min-h-screen bg-base-100 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <MdRestaurantMenu className="text-primary" />
                        Menu Management
                    </h1>
                    <button 
                        onClick={() => openModal('add')}
                        className="btn btn-primary"
                    >
                        <FaPlus /> Add Menu Item
                    </button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-primary">
                            <FaUtensils className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Items</div>
                        <div className="stat-value text-primary">{menuItems.length}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-success">
                            <FaEye className="text-3xl" />
                        </div>
                        <div className="stat-title">Available</div>
                        <div className="stat-value text-success">{menuItems.filter(i => i.isAvailable).length}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-warning">
                            <MdCategory className="text-3xl" />
                        </div>
                        <div className="stat-title">Categories</div>
                        <div className="stat-value text-warning">{categories.length}</div>
                    </div>
                    <div className="stat bg-base-200 rounded-lg">
                        <div className="stat-figure text-info">
                            <FaUtensils className="text-3xl" />
                        </div>
                        <div className="stat-title">Avg Price</div>
                        <div className="stat-value text-info">
                            ${menuItems.length > 0 ? (menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length).toFixed(2) : '0.00'}
                        </div>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`btn btn-sm ${selectedCategory === 'all' ? 'btn-primary' : 'btn-outline'}`}
                        >
                            All Items
                        </button>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.name)}
                                className={`btn btn-sm ${selectedCategory === category.name ? 'btn-primary' : 'btn-outline'}`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map(item => (
                        <div key={item.id} className="card bg-base-200 shadow-lg">
                            <figure className="px-4 pt-4">
                                <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center relative">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                                    ) : (
                                        <FaImage className="text-4xl text-gray-500" />
                                    )}
                                    {!item.isAvailable && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                                            <span className="text-white font-bold">UNAVAILABLE</span>
                                        </div>
                                    )}
                                </div>
                            </figure>
                            <div className="card-body">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="card-title text-lg">{item.name}</h3>
                                    <div className="text-xl font-bold text-primary">${item.price}</div>
                                </div>
                                
                                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                                
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {getItemBadges(item).map((badge, index) => (
                                        <div key={index} className={`badge badge-sm ${badge.class}`}>
                                            {badge.text}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
                                    <div>Prep: {item.prepTime} min</div>
                                    <div>Cal: {item.calories}</div>
                                    <div>Category: {item.category}</div>
                                    <div className={item.isAvailable ? 'text-success' : 'text-error'}>
                                        {item.isAvailable ? 'Available' : 'Unavailable'}
                                    </div>
                                </div>

                                <div className="card-actions justify-end">
                                    <button 
                                        onClick={() => toggleAvailability(item.id)}
                                        className={`btn btn-sm ${item.isAvailable ? 'btn-warning' : 'btn-success'}`}
                                    >
                                        {item.isAvailable ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    <button 
                                        onClick={() => openModal('edit', item)}
                                        className="btn btn-sm btn-info"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button 
                                        onClick={() => deleteItem(item.id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <FaUtensils className="text-6xl text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No menu items found for selected category</p>
                    </div>
                )}

                {/* Add/Edit Modal */}
                {showModal && (
                    <div className="modal modal-open">
                        <div className="modal-box max-w-4xl">
                            <h3 className="font-bold text-lg mb-4">
                                {modalType === 'add' ? 'Add New Menu Item' : 'Edit Menu Item'}
                            </h3>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Item Name *</span>
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
                                            <span className="label-text">Price *</span>
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="input input-bordered w-full"
                                            value={formData.price}
                                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Description *</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        rows="3"
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
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
                                            <option value="">Select Category</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.name}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Prep Time (min)</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="input input-bordered w-full"
                                            value={formData.prepTime}
                                            onChange={(e) => setFormData({...formData, prepTime: e.target.value})}
                                        />
                                    </div>

                                    <div>
                                        <label className="label">
                                            <span className="label-text">Calories</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="input input-bordered w-full"
                                            value={formData.calories}
                                            onChange={(e) => setFormData({...formData, calories: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Ingredients</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        rows="2"
                                        value={formData.ingredients}
                                        onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
                                        placeholder="Comma-separated list of ingredients"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Allergens</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full"
                                        value={formData.allergens}
                                        onChange={(e) => setFormData({...formData, allergens: e.target.value})}
                                        placeholder="e.g., Dairy, Gluten, Nuts"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Image URL</span>
                                    </label>
                                    <input
                                        type="url"
                                        className="input input-bordered w-full"
                                        value={formData.image}
                                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                {/* Checkboxes */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Vegetarian</span>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={formData.isVegetarian}
                                            onChange={(e) => setFormData({...formData, isVegetarian: e.target.checked})}
                                        />
                                    </label>

                                    <label className="label cursor-pointer">
                                        <span className="label-text">Vegan</span>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={formData.isVegan}
                                            onChange={(e) => setFormData({...formData, isVegan: e.target.checked})}
                                        />
                                    </label>

                                    <label className="label cursor-pointer">
                                        <span className="label-text">Gluten Free</span>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={formData.isGlutenFree}
                                            onChange={(e) => setFormData({...formData, isGlutenFree: e.target.checked})}
                                        />
                                    </label>

                                    <label className="label cursor-pointer">
                                        <span className="label-text">Spicy</span>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={formData.isSpicy}
                                            onChange={(e) => setFormData({...formData, isSpicy: e.target.checked})}
                                        />
                                    </label>

                                    <label className="label cursor-pointer">
                                        <span className="label-text">Popular</span>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={formData.isPopular}
                                            onChange={(e) => setFormData({...formData, isPopular: e.target.checked})}
                                        />
                                    </label>

                                    <label className="label cursor-pointer">
                                        <span className="label-text">Available</span>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            checked={formData.isAvailable}
                                            onChange={(e) => setFormData({...formData, isAvailable: e.target.checked})}
                                        />
                                    </label>
                                </div>

                                <div className="modal-action">
                                    <button type="submit" className="btn btn-primary">
                                        {modalType === 'add' ? 'Add Item' : 'Update Item'}
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

export default MenuManagement;