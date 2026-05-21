// d:/B12-assigment-11/LocalChefBazaar/src/components/Login.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, Link } from 'react-router';

const Login = () => {
    const { signIn, signInWithGoogle, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(() => {
                toast.success("Logged in with Google!");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signIn(email, password)
            .then(() => {
                toast.success("Logged in successfully!");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.error("Firebase Auth Error:", error.code, error.message);
                
                switch (error.code) {
                    case 'auth/user-not-found':
                        toast.error("No account found with this email address.");
                        break;
                    case 'auth/wrong-password':
                        toast.error("Incorrect password. Please try again.");
                        break;
                    case 'auth/invalid-credential':
                    case 'auth/invalid-login-credentials':
                        toast.error("Invalid email or password combination.");
                        break;
                    case 'auth/operation-not-allowed':
                        toast.error("Email/Password sign-in is not enabled in Firebase Console.");
                        break;
                    case 'auth/too-many-requests':
                        toast.error("Access disabled due to many failed attempts. Try again later.");
                        break;
                    default:
                        toast.error(error.message);
                }
            });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <input 
                    name="email" type="email" placeholder="Email" required 
                    className="w-full p-2 border rounded"
                />
                <input 
                    name="password" type="password" placeholder="Password" required 
                    className="w-full p-2 border rounded"
                />
                <div className="text-right">
                    <Link to="/forgot-password" title="Forgot password?" className="text-sm text-blue-600 hover:underline">
                        Forgot Password?
                    </Link>
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            <div className="mt-6 border-t pt-6">
                <button 
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-50 transition">
                    <img src="https://www.gstatic.com/firebase/anonymous-scan.png" alt="Google" className="w-5 h-5" />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;