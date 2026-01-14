import { useState, useEffect } from "react";
import axios from "axios";
import TripCard from "../components/TripCard";
import Navbar from "../components/Navbar";
import TripDetailsModal from "../components/TripDetailsModal";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { Search, Filter, ArrowLeft, ArrowRight, X, ChevronDown } from "lucide-react";

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

                const { data } = await axios.get(`http://localhost:8080/api/trips/all?${params}`);
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
            alert("Error: Invalid trip owner data");
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

            console.log("Chat created/accessed:", data);
            navigate("/chat", { state: { chat: data } });
        } catch (error) {
            console.error("Error creating/accessing chat", error);
            alert("Failed to open chat. Please check console.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container-custom py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Travel Together
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Find trips, meet travelers, and explore together.
                    </p>
                </div>
                {/* Search and Filters Section */}
                <div className="mb-10 max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        {/* Search Bar */}
                        <div className="flex-1 relative group">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-travelo-dark transition-colors" />
                            <input
                                type="text"
                                name="destination"
                                placeholder="Search destinations..."
                                value={filters.destination}
                                onChange={handleFilterChange}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ring-1 ring-gray-100 focus:ring-2 focus:ring-travelo-dark transition-all duration-300 placeholder-gray-400 text-gray-800 font-medium"
                            />
                        </div>

                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden flex items-center justify-center gap-2 px-6 py-4 bg-white rounded-2xl shadow-sm font-bold text-gray-700 active:scale-95 transition-transform"
                        >
                            <Filter className="h-5 w-5" /> Filters
                        </button>

                        {/* Sort Dropdown - Desktop */}
                        <div className="hidden md:block relative group">
                            <select
                                name="sort"
                                value={filters.sort}
                                onChange={handleFilterChange}
                                className="appearance-none h-full bg-white px-6 py-4 pr-12 rounded-2xl border-0 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ring-1 ring-gray-100 focus:ring-2 focus:ring-travelo-dark cursor-pointer font-bold text-gray-700 min-w-[200px] outline-none transition-all duration-300"
                            >
                                <option value="newest">Newest First</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="date_asc">Date: Earliest</option>
                                <option value="date_desc">Date: Latest</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none group-hover:text-travelo-dark transition-colors" />
                        </div>
                    </div>

                    {/* Filter Panel */}
                    <div className={`bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] p-8 mb-8 transition-all duration-500 ease-in-out border border-gray-100 ${showFilters ? 'block opacity-100 translate-y-0' : 'hidden md:block opacity-0 md:opacity-100 md:translate-y-0 -translate-y-4'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-end">
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-gray-700 tracking-wide uppercase">Min Budget</label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-travelo-dark transition-colors font-medium">₹</span>
                                    <input
                                        type="number"
                                        name="minBudget"
                                        value={filters.minBudget}
                                        onChange={handleFilterChange}
                                        className="w-full pl-8 pr-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-travelo-dark focus:border-transparent transition-all font-medium"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-gray-700 tracking-wide uppercase">Max Budget</label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-travelo-dark transition-colors font-medium">₹</span>
                                    <input
                                        type="number"
                                        name="maxBudget"
                                        value={filters.maxBudget}
                                        onChange={handleFilterChange}
                                        className="w-full pl-8 pr-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-travelo-dark focus:border-transparent transition-all font-medium"
                                        placeholder="Any"
                                    />
                                </div>
                            </div>

                            {/* Mobile Sort - showed only in mobile filter panel */}
                            <div className="md:hidden space-y-3">
                                <label className="block text-sm font-bold text-gray-700 tracking-wide uppercase">Sort By</label>
                                <select
                                    name="sort"
                                    value={filters.sort}
                                    onChange={handleFilterChange}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-travelo-dark focus:border-transparent transition-all font-medium"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="date_asc">Date: Earliest</option>
                                    <option value="date_desc">Date: Latest</option>
                                </select>
                            </div>

                            <div>
                                <button
                                    onClick={clearFilters}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-all font-bold hover:shadow-md active:scale-95 duration-200"
                                >
                                    <X className="h-4 w-4" /> Clear Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-travelo-dark"></div>
                    </div>
                ) : trips.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {trips.map(trip => (
                            <div key={trip._id} onClick={() => setSelectedTrip(trip)}>
                                <TripCard trip={trip} />
                            </div>
                        ))}
                    </div>
                ) : (

                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm mx-auto max-w-2xl">
                        <div className="bg-gray-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No trips found</h3>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                            We couldn't find any trips matching your criteria. Try adjusting your filters.
                        </p>
                        <button onClick={clearFilters} className="btn-primary">
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {trips.length > 0 && totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-16">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-travelo-dark hover:text-travelo-dark disabled:opacity-50 disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all duration-300 shadow-sm"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>

                        <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl shadow-sm border border-gray-100">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-10 h-10 rounded-lg text-sm font-bold transition-all duration-300 ${page === p
                                        ? "bg-travelo-dark text-white shadow-md scale-105"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-travelo-dark"
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-travelo-dark hover:text-travelo-dark disabled:opacity-50 disabled:hover:bg-white disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all duration-300 shadow-sm"
                        >
                            <ArrowRight className="h-5 w-5" />
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
