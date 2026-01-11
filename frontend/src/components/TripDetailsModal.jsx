import { X, Calendar, MapPin, User, MessageSquare } from "lucide-react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const TripDetailsModal = ({ trip, onClose, onChat }) => {
    const { user } = useContext(AuthContext);

    if (!trip) return null;

    const isOwnTrip = user && trip.userId._id === user._id;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image Header */}
                <div className="relative h-64 w-full">
                    {trip.image ? (
                        <img
                            src={trip.image}
                            alt={trip.destination}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className={`w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500`} />
                        // Note: We might need to pass the specific gradient class if we want to match the card exactly, 
                        // but a generic one or reusing logic is fine.
                    )}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                        <h2 className="text-4xl font-bold text-white mb-2">{trip.destination}</h2>
                        <div className="flex items-center text-white/90 space-x-4">
                            <span className="flex items-center text-sm font-medium">
                                <MapPin className="w-4 h-4 mr-1" />
                                From: {trip.startingLocation}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                    {/* User Info & Chat */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex items-center space-x-4">
                            <img
                                src={trip.userId.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                alt={trip.userId.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                            />
                            <div>
                                <h3 className="font-bold text-gray-900">{trip.userId.name}</h3>
                                <p className="text-xs text-gray-500">Trip Organizer</p>
                            </div>
                        </div>

                        {!isOwnTrip && (
                            <button
                                onClick={() => onChat(trip.userId)}
                                className="flex items-center space-x-2 bg-travelo-navy text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg active:scale-95"
                            >
                                <MessageSquare className="w-4 h-4" />
                                <span>Chat</span>
                            </button>
                        )}
                    </div>

                    {/* Trip Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Trip Details</h4>

                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
                                <div className="flex items-center text-gray-700">
                                    <Calendar className="w-5 h-5 mr-3 text-travelo-dark" />
                                    <div>
                                        <p className="text-xs text-gray-400">Dates</p>
                                        <p className="font-medium">
                                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <span className="w-5 h-5 mr-3 text-travelo-dark font-bold flex items-center justify-center">₹</span>
                                    <div>
                                        <p className="text-xs text-gray-400">Estimated Budget</p>
                                        <p className="font-medium">₹{trip.budget ? trip.budget.toLocaleString() : "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">About this Trip</h4>
                            <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                                {trip.description || "No description provided."}
                            </p>
                        </div>
                    </div>

                    {/* Bio Section */}
                    {trip.bio && (
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Organizer's Bio</h4>
                            <p className="text-gray-600 italic border-l-4 border-travelo-dark pl-4 py-1">
                                "{trip.bio}"
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default TripDetailsModal;
