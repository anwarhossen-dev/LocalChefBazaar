import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { MdWebAsset, MdSave, MdRefresh } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Swal from "sweetalert2";

const WebsiteManagement = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [settings, setSettings] = useState({
        siteName: "Local Chef Bazaar",
        contactEmail: "support@localchefbazaar.com",
        contactPhone: "+1 (555) 123-4567",
        address: "123 Food Street, Culinary District, CA 90210",
        maintenanceMode: false,
        facebookLink: "https://facebook.com/localchefbazaar",
        twitterLink: "https://twitter.com/localchefbazaar",
        instagramLink: "https://instagram.com/localchefbazaar",
        heroTitle: "Discover the Best Local Chefs",
        heroSubtitle: "Order authentic home-cooked meals straight from passionate neighbors.",
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSaveSettings = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            Swal.fire({
                title: 'Success!',
                text: 'Website settings have been updated.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        }, 1000);
    };

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            <Helmet>
                <title>Website Management - Local Chef Bazaar</title>
            </Helmet>
            
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-800">
                        <MdWebAsset className="text-primary" /> Website Management
                    </h2>
                    <p className="text-gray-500 mt-1">Configure global settings, content, and maintenance mode</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-outline" onClick={() => window.location.reload()}>
                        <MdRefresh className="text-lg" /> Discard Changes
                    </button>
                    <button 
                        className="btn btn-primary" 
                        onClick={handleSaveSettings}
                        disabled={isLoading}
                    >
                        {isLoading ? <span className="loading loading-spinner"></span> : <MdSave className="text-lg" />}
                        Save Settings
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* General Settings */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="card bg-base-200 shadow-sm border border-gray-100">
                        <div className="card-body">
                            <h3 className="card-title text-xl mb-4 text-gray-800">General Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label"><span className="label-text font-medium">Site Name</span></label>
                                    <input type="text" name="siteName" value={settings.siteName} onChange={handleInputChange} className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text font-medium">Contact Email</span></label>
                                    <input type="email" name="contactEmail" value={settings.contactEmail} onChange={handleInputChange} className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text font-medium">Contact Phone</span></label>
                                    <input type="text" name="contactPhone" value={settings.contactPhone} onChange={handleInputChange} className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text font-medium">Headquarters Address</span></label>
                                    <input type="text" name="address" value={settings.address} onChange={handleInputChange} className="input input-bordered" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-sm border border-gray-100">
                        <div className="card-body">
                            <h3 className="card-title text-xl mb-4 text-gray-800">Homepage Content</h3>
                            
                            <div className="form-control mb-4">
                                <label className="label"><span className="label-text font-medium">Hero Title</span></label>
                                <input type="text" name="heroTitle" value={settings.heroTitle} onChange={handleInputChange} className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text font-medium">Hero Subtitle</span></label>
                                <textarea name="heroSubtitle" value={settings.heroSubtitle} onChange={handleInputChange} className="textarea textarea-bordered h-24"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    {/* Status & Maintenance */}
                    <div className="card bg-base-200 shadow-sm border border-gray-100">
                        <div className="card-body">
                            <h3 className="card-title text-xl mb-4 text-gray-800">System Status</h3>
                            
                            <div className="form-control">
                                <label className="cursor-pointer label">
                                    <span className="label-text font-medium">Maintenance Mode</span>
                                    <input 
                                        type="checkbox" 
                                        name="maintenanceMode"
                                        checked={settings.maintenanceMode} 
                                        onChange={handleInputChange}
                                        className="toggle toggle-error" 
                                        title="When enabled, only administrators can access the website."
                                    />
                                </label>
                                {settings.maintenanceMode && (
                                    <div className="text-xs text-error mt-1 text-right">
                                        Website is currently offline for users!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="card bg-base-200 shadow-sm border border-gray-100">
                        <div className="card-body">
                            <h3 className="card-title text-xl mb-4 text-gray-800">Social Media</h3>
                            
                            <div className="form-control mb-3">
                                <label className="label justify-start gap-2">
                                    <FaFacebook className="text-blue-600 text-lg" />
                                    <span className="label-text font-medium">Facebook</span>
                                </label>
                                <input type="text" name="facebookLink" value={settings.facebookLink} onChange={handleInputChange} className="input input-bordered input-sm" />
                            </div>
                            <div className="form-control mb-3">
                                <label className="label justify-start gap-2">
                                    <FaTwitter className="text-blue-400 text-lg" />
                                    <span className="label-text font-medium">Twitter</span>
                                </label>
                                <input type="text" name="twitterLink" value={settings.twitterLink} onChange={handleInputChange} className="input input-bordered input-sm" />
                            </div>
                            <div className="form-control">
                                <label className="label justify-start gap-2">
                                    <FaInstagram className="text-pink-600 text-lg" />
                                    <span className="label-text font-medium">Instagram</span>
                                </label>
                                <input type="text" name="instagramLink" value={settings.instagramLink} onChange={handleInputChange} className="input input-bordered input-sm" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WebsiteManagement;
