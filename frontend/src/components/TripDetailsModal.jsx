import { X, Calendar, MapPin, User, MessageSquare } from "lucide-react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const TripDetailsModal = ({ trip, onClose, onChat }) => {
    const { user } = useContext(AuthContext);

    if (!trip) return null;

    const isOwnTrip = user && trip && (
        (typeof trip.userId === 'object' && trip.userId._id === user._id) ||
        (typeof trip.userId === 'string' && trip.userId === user._id)
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-gray-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200 border-2 border-gray-700"
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
                        <div className={`w-full h-full bg-gradient-to-br from-cyan-600 to-blue-700`} />
                    )}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all hover:scale-110"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent">
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
                    {/* User Info & Chat - Only if NOT own trip */}
                    {!isOwnTrip && (
                        <div className="flex items-center shadow-lg justify-between p-4 bg-gray-700 rounded-2xl border border-gray-600">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={trip.userId.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                    alt={trip.userId.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-600 shadow-sm"
                                />
                                <div>
                                    <h3 className="font-bold text-white">{trip.userId.name}</h3>
                                    <p className="text-xs text-gray-400">Trip Organizer</p>
                                </div>
                            </div>

                            <button
                                onClick={() => onChat(trip.userId)}
                                className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-full font-bold hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/50 active:scale-95"
                            >
                                <MessageSquare className="w-4 h-4" />
                                <span>Chat</span>
                            </button>
                        </div>
                    )}

                    {/* Trip Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Trip Details</h4>

                            <div className="bg-gray-700 p-4 rounded-xl border border-gray-600 shadow-md space-y-3">
                                <div className="flex items-center text-white">
                                    <Calendar className="w-5 h-5 mr-3 text-cyan-400" />
                                    <div>
                                        <p className="text-xs text-gray-400">Dates</p>
                                        <p className="font-medium">
                                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center text-white">
                                    <span className="w-5 h-5 mr-3 text-cyan-400 font-bold flex items-center justify-center">₹</span>
                                    <div>
                                        <p className="text-xs text-gray-400">Estimated Budget</p>
                                        <p className="font-medium">₹{trip.budget ? trip.budget.toLocaleString() : "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">About this Trip</h4>
                            <p className="text-gray-300 leading-relaxed bg-gray-700 p-4 rounded-xl border border-gray-600">
                                {trip.description || "No description provided."}
                            </p>
                        </div>
                    </div>

                    {/* Bio Section - Only if NOT own trip */}
                    {!isOwnTrip && trip.bio && (
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Organizer's Bio</h4>
                            <p className="text-gray-300 italic border-l-4 border-cyan-400 pl-4 py-1">
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
