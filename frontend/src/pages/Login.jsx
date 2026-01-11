import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
            {/* Left Side - Image */}
            <div className="hidden lg:block relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2021&q=80"
                    alt="Travel Adventure"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
                <div className="absolute bottom-20 left-12 text-white p-6 max-w-lg">
                    <h2 className="text-5xl font-bold mb-6 leading-tight">Explore the world with new friends.</h2>
                    <p className="text-xl text-white/90">Join WanderPals and connect with travelers heading your way.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex flex-col justify-center p-8 sm:p-20 relative">
                {/* Minimal Header */}
                <div className="absolute top-8 left-8 sm:left-20">
                    <Link to="/" className="text-2xl font-bold text-travelo-dark tracking-tight">
                        WanderPals
                    </Link>
                </div>

                <div className="w-full max-w-md mx-auto">
                    <div className="mb-10 mt-12 lg:mt-0">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome Back</h1>
                        <p className="text-gray-500">Please enter your details to sign in.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-center">
                                <span className="mr-2">⚠️</span> {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-travelo-dark transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-travelo-dark/20 focus:border-travelo-dark transition-all duration-200"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-travelo-dark transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-travelo-dark/20 focus:border-travelo-dark transition-all duration-200"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-travelo-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-travelo-dark/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center group"
                        >
                            Sign In
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-travelo-dark font-bold hover:underline">
                                Sign up for free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
