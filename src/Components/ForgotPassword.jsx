// d:/B12-assigment-11/LocalChefBazaar/src/components/ForgotPassword.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const ForgotPassword = () => {
    const { resetPassword } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleReset = (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        resetPassword(email)
            .then(() => {
                toast.success("Password reset email sent! Check your inbox.");
                navigate('/login');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <p className="text-sm text-gray-600 mb-4">
                Enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleReset} className="space-y-4">
                <input 
                    name="email" type="email" placeholder="Email Address" required 
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition">
                    Send Reset Link
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;