import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import DestinationModal from "../components/DestinationModal";

const Dashboard = () => {
    const [destinations, setDestinations] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const { data } = await axios.get("http://localhost:8080/api/destinations");
                setDestinations(data);
            } catch (error) {
                console.error("Error fetching destinations", error);
            }
        };

        fetchDestinations();
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 4 >= destinations.length ? 0 : prevIndex + 4
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex - 4 < 0 ? Math.max(0, destinations.length - 4) : prevIndex - 4
        );
    };

    const visibleDestinations = destinations.slice(currentIndex, currentIndex + 4);

    return (
        <div className="min-h-screen bg-white">
            {/* HERO SECTION */}
            <div className="bg-travelo-dark text-white pt-32 pb-20 rounded-b-[3rem] relative overflow-hidden">
                {/* Decorative Circle */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

                <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="z-10">

                        <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-6">
                            Make your travel <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">memorable</span>
                        </h1>

                        <p className="text-gray-400 max-w-md text-lg leading-relaxed mb-10">
                            Apparently the he and with has, into. Into welcoming her pros that hazardous the project recently of from unable of.
                        </p>

                        <Link to="/explore" className="bg-white text-travelo-dark px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all inline-flex items-center group">
                            Explore
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Hero Images Grid */}
                    <div className="grid grid-cols-2 gap-4 relative z-10">
                        <div className="space-y-4 mt-12">
                            <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400" className="rounded-2xl w-full h-48 object-cover shadow-2xl" alt="Paris" />
                            <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=400" className="rounded-2xl w-full h-64 object-cover shadow-2xl" alt="Taj Mahal" />
                        </div>
                        <div className="space-y-4">
                            <img src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=400" className="rounded-2xl w-full h-64 object-cover shadow-2xl" alt="Venice" />
                            <img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=400" className="rounded-2xl w-full h-48 object-cover shadow-2xl" alt="Cinque Terre" />
                        </div>
                    </div>
                </div>
            </div>

            {/* DESTINATION GALLERY */}
            <div className="container-custom py-24">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-base text-gray-500 font-semibold uppercase tracking-wider mb-2">Destination Gallery</h2>
                        <h3 className="text-4xl font-bold text-gray-900">Popular Destinations</h3>
                    </div>
                    <div className="flex space-x-4">
                        <button onClick={prevSlide} className="p-3 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
                        <button onClick={nextSlide} className="p-3 rounded-full bg-travelo-dark text-white hover:bg-gray-800 transition-colors"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                </div>

                {visibleDestinations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {visibleDestinations.map((destination) => (
                            <div
                                key={destination.id}
                                onClick={() => setSelectedDestination(destination)}
                                className="group relative h-[400px] w-full overflow-hidden rounded-2xl cursor-pointer"
                            >
                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
                                <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                                    <div className="flex items-center space-x-2 text-yellow-400 mb-2">
                                        <MapPin className="w-4 h-4" />
                                        <span className="text-sm font-medium">{destination.location}</span>
                                    </div>
                                    <p className="text-sm text-gray-300 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        {destination.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl">
                        <p className="text-xl text-gray-500 mb-6">Loading popular destinations...</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            <DestinationModal
                destination={selectedDestination}
                onClose={() => setSelectedDestination(null)}
            />

            {/* Simple Footer */}
            <footer className="bg-travelo-navy text-white py-12">
                <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-2xl font-bold mb-4">WanderPals</h4>
                        <div className="flex space-x-4">
                            {/* Social Icons Placeholder */}
                            <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                            <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                        </div>
                    </div>
                    <div className="text-gray-400 text-sm space-y-2">
                        <h5 className="text-white font-bold mb-4">Support</h5>
                        <p>Terms & Conditions</p>
                        <p>Privacy Policy</p>
                    </div>
                    <div className="text-gray-400 text-sm space-y-2">
                        <h5 className="text-white font-bold mb-4">Contact Us</h5>
                        <p>contact@wanderpals.com</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
