import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Users, Calendar } from "lucide-react";
import DestinationModal from "../components/DestinationModal";

const Dashboard = () => {
    const [destinations, setDestinations] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/destinations`);
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
        <div className="min-h-screen bg-gray-800">
            {/* HERO SECTION */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1638109391953-d711a2eaac6a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGJsdWUlMjBhZXN0aGV0aWN8ZW58MHx8MHx8fDA%3D"
                        alt="Mountain landscape"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="relative z-10 container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-0 pb-20">
                    {/* Left: Text Content */}
                    <div className="text-white">
                        <h1 className="text-6xl lg:text-8xl font-black leading-tight mb-8 tracking-tight">
                            EXPERIENCE<br />TRAVEL<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">TOGETHER</span>
                        </h1>

                        <p className="text-gray-300 max-w-md text-lg leading-relaxed mb-10">
                            Connect with like-minded travelers, plan your journey together,
                            and experience destinations in a more meaningful way.
                        </p>

                        <Link to="/explore" className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-10 py-4 rounded-full font-bold hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/50 group">
                            Explore Trips
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Right: Hero Images Grid */}
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

            {/* FEATURE CARDS */}
            <div className="container-custom -mt-26 relative z-20 pb-16 ">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-700/80 backdrop-blur-md p-5 rounded-xl border border-gray-600 hover:border-cyan-400 transition-all group">
                        <div className="flex items-center gap-4 mb-6 ">
                            <div className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg mb-2">Find Your Destination</h3>
                                <p className="text-gray-400 text-sm">Discover travelers heading to your dream location</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-700/80 backdrop-blur-md p-5 rounded-xl border border-gray-600 hover:border-cyan-400 transition-all group">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <Users className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg mb-2">Connect with Travelers</h3>
                                <p className="text-gray-400 text-sm">Meet like-minded people for your journey</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-700/80 backdrop-blur-md p-5 rounded-xl border border-gray-600 hover:border-cyan-400 transition-all group">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg mb-2">Plan Together</h3>
                                <p className="text-gray-400 text-sm">Coordinate schedules and create memories</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* POPULAR DESTINATIONS */}
            <div className="container-custom py-24">
                <div className="text-center mb-16">
                    <h2 className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-4">POPULAR TOURS</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">Explore Top Destinations</h3>
                </div>

                <div className="flex justify-end mb-8 gap-4">
                    <button onClick={prevSlide} className="p-3 rounded-full border border-gray-600 hover:bg-gray-700 transition-colors">
                        <ChevronLeft className="w-5 h-5 text-gray-400" />
                    </button>
                    <button onClick={nextSlide} className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50 hover:from-cyan-600 hover:to-blue-600 transition-all active:scale-95">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {visibleDestinations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
                                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                                    <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                                    <div className="flex items-center space-x-2 text-white">
                                        <MapPin className="w-4 h-4" />
                                        <span className="font-medium">{destination.location}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-700 rounded-3xl">
                        <p className="text-xl text-gray-400 mb-6">Loading destinations...</p>
                    </div>
                )}
            </div>

            {/* DISCOVER SECTION */}
            <div className="relative py-20 md:py-28 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2070&auto=format&fit=crop"
                        alt="Atmospheric Travel"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-800/80 via-black/70 to-gray-900" />
                </div>

                <div className="relative z-10 container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-5xl md:text-8xl font-black mb-10 leading-tight text-white tracking-tighter">
                            FIND YOUR<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                PERFECT COMPANION
                            </span>
                        </h2>

                        <p className="text-gray-300 leading-relaxed text-xl mb-12 max-w-2xl mx-auto">
                            WanderPals is built on the belief that the best journeys are the ones we share.
                            Connect with explorers who match your vibe and create stories that last a lifetime.
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <Link to="/explore" className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-cyan-500/30 group">
                                <Users className="w-6 h-6" />
                                Start Your Journey
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="mt-16 flex items-center justify-center gap-4">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400"></div>
                            <p className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-xs">The world is better together</p>
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <DestinationModal
                destination={selectedDestination}
                onClose={() => setSelectedDestination(null)}
            />

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container-custom">
                    <div className="flex justify-center gap-8 mb-8">
                        <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" /><path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                        </a>
                    </div>
                    <p className="text-center text-gray-500 text-sm">© 2026 WanderPals. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
