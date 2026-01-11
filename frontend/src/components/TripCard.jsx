import { MapPin, Calendar, Star, Plane } from "lucide-react";

const TripCard = ({ trip }) => {
    // Generate a random color for the plane icon background
    const getRandomPlaneColor = () => {
        const colors = [
            "bg-blue-100 text-blue-600",
            "bg-purple-100 text-purple-600",
            "bg-green-100 text-green-600",
            "bg-orange-100 text-orange-600",
            "bg-rose-100 text-rose-600",
            "bg-teal-100 text-teal-600",
            "bg-indigo-100 text-indigo-600"
        ];
        const index = trip._id ? trip._id.charCodeAt(trip._id.length - 1) % colors.length : Math.floor(Math.random() * colors.length);
        return colors[index];
    };

    const getRandomGradient = () => {
        const gradients = [
            "from-purple-300 to-indigo-300",
            "from-blue-300 to-cyan-300",
            "from-teal-300 to-emerald-300",
            "from-orange-300 to-pink-300",
            "from-red-300 to-rose-300",
            "from-yellow-300 to-orange-300"
        ];
        const index = trip._id ? trip._id.charCodeAt(trip._id.length - 1) % gradients.length : Math.floor(Math.random() * gradients.length);
        return gradients[index];
    };

    const planeColorClass = getRandomPlaneColor();
    const gradientClass = getRandomGradient();

    return (
        <div className="group relative bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-[420px]">
            {/* TOP PART: Image or Gradient */}
            <div className="h-48 relative overflow-hidden">
                {trip.image ? (
                    <img
                        src={trip.image}
                        alt={trip.destination}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className={`h-full w-full bg-gradient-to-br ${gradientClass} transition-transform duration-700 group-hover:scale-110`} />
                )}

                {/* Overlay Gradient for text readability if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Price Tag */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-900 shadow-sm">
                    ₹{trip.budget ? trip.budget.toLocaleString() : 'N/A'}
                </div>
            </div>

            {/* PLANE LOGO - Overlapping */}
            <div className="relative -mt-6 ml-6 z-10">
                <div className={`w-12 h-12 rounded-full ${planeColorClass} flex items-center justify-center shadow-md border-4 border-white`}>
                    <Plane className="w-5 h-5 fill-current" />
                </div>
            </div>

            {/* BOTTOM PART: Content */}
            <div className="p-6 pt-2 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-travelo-dark transition-colors">{trip.destination}</h3>

                    <div className="flex items-center text-xs text-gray-400 mb-4">
                        <MapPin className="w-3 h-3 mr-1" />
                        {trip.startingLocation || "Flexible Location"}
                    </div>

                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                        {trip.description}
                    </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                    <div className="flex items-center text-xs text-gray-500 font-medium">
                        <Calendar className="w-3 h-3 mr-1.5 text-gray-400" />
                        {new Date(trip.startDate).toLocaleDateString()}
                    </div>

                    <div className="flex items-center space-x-1 text-yellow-400">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-bold text-gray-700">4.8</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripCard;
