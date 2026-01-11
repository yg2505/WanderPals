import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import TripCard from "../components/TripCard";
import TripDetailsModal from "../components/TripDetailsModal";
import { User, Mail, Edit3, MapPin, Calendar, Camera, X, MessageSquare, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, updateUser, logout } = useContext(AuthContext);
    const [myTrips, setMyTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        bio: "",
        avatar: "",
        age: "",
        country: "",
        travelStyle: "Explorer",
        languages: "",
        interests: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setEditForm({
                name: user.name || "",
                email: user.email || "",
                bio: user.bio || "",
                avatar: user.avatar || "",
                age: user.age || "",
                country: user.country || "",
                travelStyle: user.travelStyle || "Explorer",
                languages: user.languages?.join(", ") || "",
                interests: user.interests?.join(", ") || ""
            });
            fetchMyTrips();
        } else {
            navigate('/login');
        }
    }, [user, navigate]);

    const fetchMyTrips = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            const { data } = await axios.get("http://localhost:8080/api/trips", config);
            setMyTrips(data);
        } catch (error) {
            console.error("Error fetching my trips", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const updatedData = {
                ...editForm,
                age: Number(editForm.age) || undefined,
                languages: editForm.languages.split(',').map(s => s.trim()).filter(s => s),
                interests: editForm.interests.split(',').map(s => s.trim()).filter(s => s)
            };
            await updateUser(updatedData);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile", error);
            alert("Failed to update profile");
        }
    };

    const handleChat = async (tripOwner) => {
        if (!user) {
            navigate("/login");
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post(
                "http://localhost:8080/api/chat",
                { userId: tripOwner._id },
                config
            );

            navigate("/chat", { state: { chat: data } });
        } catch (error) {
            console.error("Error creating/accessing chat", error);
            alert("Failed to open chat. Please check console.");
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container-custom py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT SIDEBAR - PROFILE CARD */}
                    <div className="lg:col-span-4 xl:col-span-3">
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden sticky top-28">
                            {/* Cover / Header Gradient */}
                            <div className="h-32 bg-gradient-to-br from-travelo-dark to-travelo-navy"></div>

                            <div className="px-6 pb-8 pt-24 relative">
                                {/* Avatar */}
                                <div className="absolute -top-16 left-6">
                                    <div className="relative">
                                        <img
                                            src={user.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                            alt={user.name}
                                            className="w-32 h-32 rounded-3xl border-4 border-white shadow-md object-cover bg-white"
                                        />
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="absolute bottom-[-10px] right-[-10px] p-2 bg-travelo-dark text-white rounded-xl hover:bg-gray-800 transition-all shadow-md active:scale-95"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div >
                                    <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                                    <div className="flex items-center text-gray-500 mt-1 text-sm">
                                        <Mail className="w-4 h-4 mr-2" />
                                        <span className="truncate">{user.email}</span>
                                    </div>

                                    {/* Bio */}
                                    <p className="text-gray-600 text-center leading-relaxed mb-6 italic">
                                        "{user?.bio || "No bio yet..."}"
                                    </p>

                                    {/* Personal Details */}
                                    <div className="w-full space-y-3 mb-6 bg-gray-50 p-4 rounded-xl">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Age:</span>
                                            <span className="font-semibold text-gray-800">{user?.age || "N/A"}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">From:</span>
                                            <span className="font-semibold text-gray-800">{user?.country || "Earth"}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Style:</span>
                                            <span className="font-semibold text-travelo-dark">{user?.travelStyle || "Explorer"}</span>
                                        </div>
                                    </div>

                                    {/* Languages */}
                                    {user?.languages && user.languages.length > 0 && (
                                        <div className="w-full mb-4">
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Languages</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {user.languages.map((lang, index) => (
                                                    <span key={index} className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md font-medium">
                                                        {lang}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Interests */}
                                    {user?.interests && user.interests.length > 0 && (
                                        <div className="w-full mb-6">
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Interests</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {user.interests.map((interest, index) => (
                                                    <span key={index} className="text-xs bg-green-50 text-green-600 px-2.5 py-1 rounded-md font-medium">
                                                        {interest}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="w-full border-t border-gray-100 my-6"></div>
                                        <div className="bg-blue-50 p-4 rounded-2xl text-center">
                                            <span className="block text-2xl font-bold text-blue-600">{myTrips.length}</span>
                                            <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">Trips</span>
                                    </div>

                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="w-full mt-6 py-3 flex items-center justify-center text-travelo-dark font-bold bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors mb-3"
                                    >
                                        <Edit3 className="w-4 h-4 mr-2" />
                                        Edit Profile
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full py-3 flex items-center justify-center text-red-500 font-bold bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - MY TRIPS */}
                    <div className="lg:col-span-8 xl:col-span-9 space-y-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">My Trips</h2>
                                <p className="text-gray-500 mt-1">Manage and view the trips you have created.</p>
                            </div>
                            <Link to="/create-trip" className="hidden sm:flex bg-travelo-dark text-white px-6 py-3 rounded-full font-bold items-center hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                <Calendar className="w-4 h-4 mr-2" />
                                Create New Trip
                            </Link>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center h-64 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-travelo-dark"></div>
                            </div>
                        ) : myTrips.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {myTrips.map(trip => (
                                    <div key={trip._id} onClick={() => setSelectedTrip(trip)} className="transform hover:-translate-y-1 transition-transform duration-300">
                                        <TripCard trip={trip} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                                    ✈️
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No trips created yet</h3>
                                <p className="text-gray-500 mb-6 max-w-sm mx-auto">It looks like you haven't planned any trips yet. Start your journey today!</p>
                                <Link to="/create-trip" className="inline-flex items-center text-white bg-travelo-navy px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all">
                                    Create your first trip &rarr;
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200 relative">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>

                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travelo-dark focus:border-transparent outline-none"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travelo-dark focus:border-transparent outline-none"
                                        value={editForm.age}
                                        onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travelo-dark focus:border-transparent outline-none"
                                        value={editForm.country}
                                        onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Travel Style *</label>
                                <select
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travelo-dark focus:border-transparent outline-none"
                                    value={editForm.travelStyle}
                                    onChange={(e) => setEditForm({ ...editForm, travelStyle: e.target.value })}
                                >
                                    <option value="Explorer">Explorer</option>
                                    <option value="Backpacker">Backpacker</option>
                                    <option value="Luxury">Luxury</option>
                                    <option value="Foodie">Foodie</option>
                                    <option value="Adventure">Adventure</option>
                                    <option value="Relaxed">Relaxed</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Languages * (comma separated)</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travelo-dark focus:border-transparent outline-none"
                                    value={editForm.languages}
                                    onChange={(e) => setEditForm({ ...editForm, languages: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Interests * (comma separated)</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travelo-dark focus:border-transparent outline-none"
                                    value={editForm.interests}
                                    onChange={(e) => setEditForm({ ...editForm, interests: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travelo-dark focus:border-transparent outline-none"
                                    rows="3"
                                    maxLength="200"
                                    value={editForm.bio}
                                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travelo-dark focus:border-transparent outline-none"
                                    value={editForm.avatar}
                                    onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-travelo-dark text-white rounded-lg hover:bg-gray-800 transition-colors font-bold shadow-lg"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <TripDetailsModal
                trip={selectedTrip}
                onClose={() => setSelectedTrip(null)}
                onChat={handleChat}
            />
        </div>
    );
};

export default Profile;
