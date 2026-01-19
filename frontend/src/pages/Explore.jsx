import { useState, useEffect } from "react";
import axios from "axios";
import TripCard from "../components/TripCard";
import Navbar from "../components/Navbar";
import TripDetailsModal from "../components/TripDetailsModal";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { Search, Filter, ArrowLeft, ArrowRight, X, ChevronDown, Sparkles, MapPin, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

const Explore = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        destination: "",
        minBudget: "",
        maxBudget: "",
        sort: "newest"
    });
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchTrips = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams({
                    page,
                    limit: 12,
                    sort: filters.sort,
                    destination: filters.destination,
                });
                if (filters.minBudget) params.append("minBudget", filters.minBudget);
                if (filters.maxBudget) params.append("maxBudget", filters.maxBudget);

                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/trips/all?${params}`);
                setTrips(data.trips);
                setTotalPages(data.pages);
            } catch (error) {
                console.error("Error fetching trips", error);
            } finally {
                setLoading(false);
            }
        };

        const timeout = setTimeout(() => {
            fetchTrips();
        }, 500); // Debounce for search

        return () => clearTimeout(timeout);
    }, [page, filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setPage(1); // Reset to page 1 on filter change
    };

    const clearFilters = () => {
        setFilters({
            destination: "",
            minBudget: "",
            maxBudget: "",
            sort: "newest"
        });
        setPage(1);
    };

    const handleChat = async (tripOwner) => {
        if (!user) {
            navigate("/login");
            return;
        }

        console.log("Starting chat with:", tripOwner);
        if (!tripOwner || !tripOwner._id) {
            toast.error("Error: Invalid trip owner data");
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
                `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/chat`,
                { userId: tripOwner._id },
                config
            );

            console.log("Chat created/accessed:", data);
            navigate("/chat", { state: { chat: data } });
        } catch (error) {
            console.error("Error creating/accessing chat", error);
            toast.error("Failed to open chat. Please try again.");
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        scrollToTop();
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-20">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="container-custom relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-2 mb-6">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm font-semibold text-cyan-400">Discover Your Next Adventure</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Amazing</span>
                            <br />Travel Experiences
                        </h1>

                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                            Connect with fellow travelers, discover new destinations, and create unforgettable memories together.
                        </p>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap justify-center gap-8 mt-12">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-400 mb-1">{trips.length}+</div>
                                <div className="text-sm text-gray-500">Active Trips</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-400 mb-1">50+</div>
                                <div className="text-sm text-gray-500">Destinations</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-cyan-400 mb-1">1000+</div>
                                <div className="text-sm text-gray-500">Travelers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom py-16">
                {/* Search and Filters Section */}
                <div className="mb-12 max-w-6xl mx-auto">
                    {/* Main Search Bar */}
                    <div className="bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-700 mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search Input */}
                            <div className="flex-1 relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative">
                                    <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5 group-focus-within:text-cyan-400 transition-colors z-10" />
                                    <input
                                        type="text"
                                        name="destination"
                                        placeholder="Where do you want to go?"
                                        value={filters.destination}
                                        onChange={handleFilterChange}
                                        className="w-full pl-14 pr-6 py-4 rounded-2xl border-0 bg-gray-700/50 backdrop-blur-sm ring-1 ring-gray-600 focus:ring-2 focus:ring-cyan-500 transition-all duration-300 placeholder-gray-500 text-white font-medium text-lg relative z-0"
                                    />
                                </div>
                            </div>

                            {/* Sort Dropdown - Desktop */}
                            <div className="hidden md:block relative group min-w-[220px]">
                                <select
                                    name="sort"
                                    value={filters.sort}
                                    onChange={handleFilterChange}
                                    className="appearance-none w-full bg-gray-700/50 backdrop-blur-sm px-6 py-4 pr-12 rounded-2xl border-0 ring-1 ring-gray-600 focus:ring-2 focus:ring-cyan-500 cursor-pointer font-semibold text-white outline-none transition-all duration-300"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="date_asc">Date: Earliest</option>
                                    <option value="date_desc">Date: Latest</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5 pointer-events-none group-hover:text-cyan-400 transition-colors" />
                            </div>

                            {/* Filter Toggle Button */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${showFilters
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                                    : 'bg-gray-700/50 text-white ring-1 ring-gray-600 hover:ring-cyan-500'
                                    }`}
                            >
                                <Filter className="h-5 w-5" />
                                <span className="hidden sm:inline">Filters</span>
                            </button>
                        </div>
                    </div>

                    {/* Advanced Filters Panel */}
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showFilters ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
                        }`}>
                        <div className="bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-700">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                                {/* Min Budget */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-bold text-gray-400 tracking-wide uppercase">Min Budget</label>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 group-focus-within:text-cyan-300 transition-colors font-bold">₹</span>
                                        <input
                                            type="number"
                                            name="minBudget"
                                            value={filters.minBudget}
                                            onChange={handleFilterChange}
                                            className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-gray-700 border-transparent text-white focus:bg-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-medium"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                {/* Max Budget */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-bold text-gray-400 tracking-wide uppercase">Max Budget</label>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 group-focus-within:text-cyan-300 transition-colors font-bold">₹</span>
                                        <input
                                            type="number"
                                            name="maxBudget"
                                            value={filters.maxBudget}
                                            onChange={handleFilterChange}
                                            className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-gray-700 border-transparent text-white focus:bg-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-medium"
                                            placeholder="Any"
                                        />
                                    </div>
                                </div>

                                {/* Mobile Sort */}
                                <div className="md:hidden space-y-3">
                                    <label className="block text-sm font-bold text-gray-400 tracking-wide uppercase">Sort By</label>
                                    <select
                                        name="sort"
                                        value={filters.sort}
                                        onChange={handleFilterChange}
                                        className="w-full px-4 py-3.5 rounded-xl bg-gray-700 border-transparent text-white focus:bg-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-medium"
                                    >
                                        <option value="newest">Newest First</option>
                                        <option value="price_asc">Price: Low to High</option>
                                        <option value="price_desc">Price: High to Low</option>
                                        <option value="date_asc">Date: Earliest</option>
                                        <option value="date_desc">Date: Latest</option>
                                    </select>
                                </div>

                                {/* Clear Button */}
                                <div>
                                    <button
                                        onClick={clearFilters}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-white bg-gray-700 hover:bg-red-500/20 hover:text-red-400 hover:ring-2 hover:ring-red-500/50 rounded-xl transition-all font-bold active:scale-95 duration-200"
                                    >
                                        <X className="h-4 w-4" /> Clear All
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    {(filters.destination || filters.minBudget || filters.maxBudget) && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="text-sm text-gray-500 font-medium">Active filters:</span>
                            {filters.destination && (
                                <span className="inline-flex items-center gap-1 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium">
                                    <MapPin className="w-3 h-3" />
                                    {filters.destination}
                                </span>
                            )}
                            {filters.minBudget && (
                                <span className="inline-flex items-center gap-1 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium">
                                    Min: ₹{filters.minBudget}
                                </span>
                            )}
                            {filters.maxBudget && (
                                <span className="inline-flex items-center gap-1 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium">
                                    Max: ₹{filters.maxBudget}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Results Section */}
                {loading ? (
                    <div className="flex flex-col justify-center items-center h-96">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-cyan-400"></div>
                            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl"></div>
                        </div>
                        <p className="text-gray-500 mt-6 font-medium">Discovering amazing trips...</p>
                    </div>
                ) : trips.length > 0 ? (
                    <>
                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">Available Trips</h2>
                                <p className="text-gray-500">Found {trips.length} trip{trips.length !== 1 ? 's' : ''} for you</p>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                                <TrendingUp className="w-4 h-4" />
                                Page {page} of {totalPages}
                            </div>
                        </div>

                        {/* Trip Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                            {trips.map((trip, index) => (
                                <div
                                    key={trip._id}
                                    onClick={() => setSelectedTrip(trip)}
                                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <TripCard trip={trip} />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700 shadow-xl mx-auto max-w-2xl">
                        <div className="relative inline-block mb-6">
                            <div className="bg-gray-700 h-24 w-24 rounded-full flex items-center justify-center mx-auto">
                                <Search className="h-10 w-10 text-gray-500" />
                            </div>
                            <div className="absolute -top-2 -right-2 bg-cyan-400 rounded-full p-2">
                                <X className="h-4 w-4 text-gray-900" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">No Trips Found</h3>
                        <p className="text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
                            We couldn't find any trips matching your criteria. Try adjusting your filters or search terms.
                        </p>
                        <button
                            onClick={clearFilters}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-full font-bold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 active:scale-95"
                        >
                            <X className="w-4 h-4" />
                            Clear All Filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {trips.length > 0 && totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-16">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="group w-12 h-12 flex items-center justify-center rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700 hover:border-cyan-500 hover:text-cyan-400 disabled:opacity-30 disabled:hover:bg-gray-800 disabled:hover:border-gray-700 disabled:hover:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
                        >
                            <ArrowLeft className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        </button>

                        <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-xl shadow-lg border border-gray-700">
                            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 7) {
                                    pageNum = i + 1;
                                } else if (page <= 4) {
                                    pageNum = i + 1;
                                } else if (page >= totalPages - 3) {
                                    pageNum = totalPages - 6 + i;
                                } else {
                                    pageNum = page - 3 + i;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`w-10 h-10 rounded-lg text-sm font-bold transition-all duration-300 ${page === pageNum
                                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50 scale-110"
                                            : "text-gray-400 hover:bg-gray-700 hover:text-cyan-400"
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            className="group w-12 h-12 flex items-center justify-center rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700 hover:border-cyan-500 hover:text-cyan-400 disabled:opacity-30 disabled:hover:bg-gray-800 disabled:hover:border-gray-700 disabled:hover:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
                        >
                            <ArrowRight className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                )}
            </div>

            <TripDetailsModal
                trip={selectedTrip}
                onClose={() => setSelectedTrip(null)}
                onChat={handleChat}
            />
        </div >
    );
};

export default Explore;
