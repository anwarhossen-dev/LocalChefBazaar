// d:/B12-assigment-11/LocalChefBazaar/src/components/ProfileUpdate.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';

const ProfileUpdate = () => {
    const { user, updateUserProfile, loading } = useContext(AuthContext);

    const handleUpdate = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;

        updateUserProfile(name, photo)
            .then(() => {
                toast.success("Profile updated successfully!");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    if (!user) return <p className="text-center mt-10">Please login to update your profile.</p>;

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Display Name</label>
                    <input 
                        name="name" type="text" defaultValue={user?.displayName || ""} placeholder="Enter name" required 
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Photo URL</label>
                    <input 
                        name="photo" type="text" defaultValue={user?.photoURL || ""} placeholder="Enter photo URL" required 
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 outline-none"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
};

export default ProfileUpdate;