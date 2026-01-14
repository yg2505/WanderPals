import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { User, Mail, Lock, ArrowRight, ArrowLeft, Globe, Smile, Map, Camera, Hash } from "lucide-react";

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        age: "",
        country: "",
        state: "",
        avatar: "",
        bio: "",
        travelStyle: "Explorer",
        languages: "", // processed into array on submit
        interests: ""  // processed into array on submit
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => {
        setError("");
        if (step === 1) {
            if (!formData.name || !formData.email || !formData.password) {
                setError("Please fill in all required fields.");
                return;
            }
        }
        if (step === 2) {
            if (!formData.age || !formData.country || !formData.state) {
                setError("Please fill in all required fields.");
                return;
            }
        }
        setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        if (!formData.languages.trim() || !formData.interests.trim()) {
            setError("Languages and Interests are required to create a profile.");
            return;
        }

        try {
            // Process comma-separated strings into arrays
            const payload = {
                ...formData,
                languages: formData.languages.split(',').map(s => s.trim()).filter(s => s),
                interests: formData.interests.split(',').map(s => s.trim()).filter(s => s),
                age: Number(formData.age) || undefined
            };

            await register(payload);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
            {/* Left Side - Image */}
            <div className="hidden lg:block relative overflow-hidden order-last">
                <img
                    src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Travel Landscape"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
                <div className="absolute bottom-20 right-12 text-white p-6 max-w-lg text-right">
                    <h2 className="text-5xl font-bold mb-6 leading-tight">Start your journey today.</h2>
                    <p className="text-xl text-white/90">Create an account and discover your next adventure with WanderPals.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex flex-col justify-center p-8 sm:p-20 relative order-first">
                {/* Minimal Header */}
                <div className="absolute top-8 left-8 sm:left-20">
                    <Link to="/" className="text-2xl font-bold text-travelo-dark tracking-tight">
                        WanderPals
                    </Link>
                </div>

                <div className="w-full max-w-md mx-auto">
                    {/* Progress Bar */}
                    <div className="flex items-center mb-10 w-full">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? "bg-travelo-dark text-white" : "bg-gray-200 text-gray-500"} transition-all duration-300`}>
                                    {s}
                                </div>
                                {s < 3 && <div className={`h-1 w-full mx-2 rounded ${step > s ? "bg-travelo-dark" : "bg-gray-200"}`} />}
                            </div>
                        ))}
                    </div>

                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">
                            {step === 1 && "Create Account"}
                            {step === 2 && "Personal Details"}
                            {step === 3 && "Build Your Profile"}
                        </h1>
                        <p className="text-gray-500">
                            {step === 1 && "Sign up to get started."}
                            {step === 2 && "Tell us a bit about yourself."}
                            {step === 3 && "Share your travel interests."}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-center mb-6">
                            <span className="mr-2">⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* STEP 1: Account Info */}
                        {step === 1 && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ml-1">Full Name *</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400 group-focus-within:text-travelo-dark transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="input-field-with-icon pl-12"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ml-1">Email Address *</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-travelo-dark transition-colors" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            className="input-field-with-icon pl-12"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ml-1">Password *</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-travelo-dark transition-colors" />
                                        </div>
                                        <input
                                            type="password"
                                            name="password"
                                            required
                                            className="input-field-with-icon pl-12"
                                            placeholder="Create a password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Personal Info */}
                        {step === 2 && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 ml-1">Age *</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Smile className="h-5 w-5 text-gray-400 group-focus-within:text-travelo-dark transition-colors" />
                                            </div>
                                            <input
                                                type="number"
                                                name="age"
                                                required
                                                className="input-field-with-icon pl-12"
                                                placeholder="25"
                                                value={formData.age}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 ml-1">Country *</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Globe className="h-5 w-5 text-gray-400 group-focus-within:text-travelo-dark transition-colors" />
                                            </div>
                                            <input
                                                type="text"
                                                name="country"
                                                required
                                                className="input-field-with-icon pl-12"
                                                placeholder="USA"
                                                value={formData.country}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-sm font-medium text-gray-700 ml-1">State/Province *</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Map className="h-5 w-5 text-gray-400 group-focus-within:text-travelo-dark transition-colors" />
                                            </div>
                                            <input
                                                type="text"
                                                name="state"
                                                required
                                                className="input-field-with-icon pl-12"
                                                placeholder="California"
                                                value={formData.state}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ml-1">Profile Photo URL</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Camera className="h-5 w-5 text-gray-400 group-focus-within:text-travelo-dark transition-colors" />
                                        </div>
                                        <input
                                            type="url"
                                            name="avatar"
                                            className="input-field-with-icon pl-12"
                                            placeholder="https://example.com/me.jpg"
                                            value={formData.avatar}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 ml-1">Leave blank for default avatar</p>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: Travel Profile */}
                        {step === 3 && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ml-1">Bio (Max 200 chars)</label>
                                    <textarea
                                        name="bio"
                                        maxLength="200"
                                        rows="3"
                                        className="block w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-travelo-dark/20 focus:border-travelo-dark transition-all duration-200 resize-none"
                                        placeholder="Tell us about your travel dreams..."
                                        value={formData.bio}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ml-1">Travel Style</label>
                                    <select
                                        name="travelStyle"
                                        className="block w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-travelo-dark/20 focus:border-travelo-dark transition-all duration-200"
                                        value={formData.travelStyle}
                                        onChange={handleChange}
                                    >
                                        <option value="Explorer">Explorer</option>
                                        <option value="Backpacker">Backpacker</option>
                                        <option value="Luxury">Luxury</option>
                                        <option value="Foodie">Foodie</option>
                                        <option value="Adventure">Adventure</option>
                                        <option value="Relaxed">Relaxed</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ml-1">Languages (Comma separated)</label>
                                    <input
                                        type="text"
                                        name="languages"
                                        className="input-field-with-icon px-4"
                                        placeholder="English, Spanish, French"
                                        value={formData.languages}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 ml-1">Interests (Comma separated)</label>
                                    <input
                                        type="text"
                                        name="interests"
                                        className="input-field-with-icon px-4"
                                        placeholder="Hiking, Photography, History"
                                        value={formData.interests}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4 pt-4">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center"
                                >
                                    <ArrowLeft className="mr-2 w-5 h-5" /> Back
                                </button>
                            )}

                            {step < 3 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex-1 bg-travelo-dark text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
                                >
                                    Next <ArrowRight className="ml-2 w-5 h-5" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="flex-1 bg-travelo-dark text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
                                >
                                    Complete <ArrowRight className="ml-2 w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500">
                            Already have an account?{' '}
                            <Link to="/login" className="text-travelo-dark font-bold hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <style>{`
                        .input-field-with-icon {
                            display: block;
                            width: 100%;
                            padding-top: 0.875rem; /* 14px */
                            padding-bottom: 0.875rem;
                            padding-right: 1rem;
                            background-color: rgb(249 250 251); /* gray-50 */
                            border-width: 1px;
                            border-color: rgb(229 231 235); /* gray-200 */
                            border-radius: 0.75rem; /* rounded-xl */
                            color: rgb(17 24 39); /* gray-900 */
                        }
                        .input-field-with-icon:focus {
                            outline: 2px solid transparent;
                            outline-offset: 2px;
                            --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
                            --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
                            box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
                            --tw-ring-color: rgba(30, 41, 59, 0.2);
                            border-color: rgb(30 29 59); /* travelo-dark */
                        }
                    `}</style>
                </div>
            </div>
        </div>
    );
};

export default Register;
