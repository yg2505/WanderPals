import { X, MapPin, Star, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DestinationModal = ({ destination, onClose }) => {
    const navigate = useNavigate();

    if (!destination) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-100">
                        <img
                            src={destination.image}
                            alt={destination.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6 pt-20">
                            <div className="flex items-center space-x-2 text-white">
                                <MapPin className="w-4 h-4" />
                                <span className="font-medium">{destination.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="w-full md:w-1/2 p-8 flex flex-col">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">{destination.name}</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {destination.description}
                            </p>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl mb-6">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Best Time</p>
                                    <div className="flex items-center text-gray-900 font-medium">
                                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                                        {destination.bestTimeToVisit}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto grid grid-cols-2 gap-4">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => navigate('/create-trip', { state: { destination: destination.name } })}
                                className="px-6 py-3 bg-travelo-dark text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-travelo-dark/20">
                                Create Trip
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationModal;
