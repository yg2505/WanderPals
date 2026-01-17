import { MapPin, Calendar, Star, Plane } from "lucide-react";

const TripCard = ({ trip }) => {
    // Generate a random color for the plane icon background
    const getRandomPlaneColor = () => {
        const colors = [
            "bg-cyan-500 text-cyan-100",
            "bg-cyan-600 text-cyan-100",
            "bg-teal-500 text-teal-100",
            "bg-teal-600 text-teal-100",
            "bg-blue-500 text-blue-100",
            "bg-blue-600 text-blue-100",
            "bg-sky-500 text-sky-100"
        ];
        const index = trip._id
            ? trip._id.charCodeAt(trip._id.length - 1) % colors.length
            : Math.floor(Math.random() * colors.length);
        return colors[index];
    };

    const getRandomGradient = () => {
        const gradients = [
            "from-cyan-600 to-blue-700",
            "from-teal-600 to-cyan-700",
            "from-blue-600 to-cyan-700",
            "from-sky-600 to-blue-700",
            "from-cyan-700 to-teal-800",
            "from-blue-700 to-cyan-800"
        ];
        const index = trip._id
            ? trip._id.charCodeAt(trip._id.length - 1) % gradients.length
            : Math.floor(Math.random() * gradients.length);
        return gradients[index];
    };

    const planeColorClass = getRandomPlaneColor();
    const gradientClass = getRandomGradient();

    return (
        <div className="group relative bg-gray-700 rounded-3xl shadow-lg border border-gray-600 overflow-hidden hover:shadow-2xl hover:border-cyan-400 hover:-translate-y-2 transition-all duration-300 flex flex-col h-[420px]">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Price Tag */}
                <div className="absolute bottom-4 right-4 bg-cyan-400 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-900 shadow-md">
                    ₹{trip.budget ? trip.budget.toLocaleString() : 'N/A'}
                </div>
            </div>

            {/* PLANE LOGO - Overlapping */}
            <div className="relative -mt-6 ml-6 z-10">
                <div className={`w-12 h-12 rounded-full ${planeColorClass} flex items-center justify-center shadow-md border-4 border-gray-700`}>
                    <Plane className="w-5 h-5 fill-current" />
                </div>
            </div>

            {/* BOTTOM PART: Content */}
            <div className="p-6 pt-2 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{trip.destination}</h3>

                    <div className="flex items-center text-xs text-gray-400 mb-4">
                        <MapPin className="w-3 h-3 mr-1" />
                        {trip.startingLocation || "Flexible Location"}
                    </div>

                    <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                        {trip.description}
                    </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-600 pt-4">
                    <div className="flex items-center text-xs text-gray-400 font-medium">
                        <Calendar className="w-3 h-3 mr-1.5 text-gray-500" />
                        {new Date(trip.startDate).toLocaleDateString()}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TripCard;
