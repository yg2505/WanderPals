import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { Calendar, MapPin, DollarSign, Type, Image as ImageIcon } from "lucide-react";

const CreateTrip = () => {
    const [destination, setDestination] = useState("");
    const [startingLocation, setStartingLocation] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState("");
    const [image, setImage] = useState("");
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Effect to check for passed state
    useState(() => {
        if (location.state && location.state.destination) {
            setDestination(location.state.destination);
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.post(
                "http://localhost:8080/api/trips",
                { destination, startingLocation, startDate, endDate, description, budget, image },
                config
            );
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Failed to create trip");
        }
    };

    return (
        <div className="min-h-screen bg-white pt-32 pb-12">
            <div className="container-custom max-w-2xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-travelo-dark mb-4">Plan Your Next Adventure</h1>
                    <p className="text-gray-500">Share your travel plans and find the perfect companion.</p>
                </div>

                <div className="bg-gray-50 p-8 rounded-3xl shadow-sm border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Destination</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="input-pill w-full pl-12 bg-white border border-gray-200"
                                    placeholder="e.g. Kyoto, Japan"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Starting Location</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="input-pill w-full pl-12 bg-white border border-gray-200"
                                    placeholder="e.g. New York, USA"
                                    value={startingLocation}
                                    onChange={(e) => setStartingLocation(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Start Date</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Calendar className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        required
                                        className="input-pill w-full pl-12 bg-white border border-gray-200"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">End Date</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Calendar className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        required
                                        className="input-pill w-full pl-12 bg-white border border-gray-200"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Estimated Budget (₹)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-gray-400 font-bold text-lg">₹</span>
                                </div>
                                <input
                                    type="number"
                                    className="input-pill w-full pl-12 bg-white border border-gray-200"
                                    placeholder="1000"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Description</label>
                            <div className="relative">
                                <div className="absolute top-4 left-4 flex items-start pointer-events-none">
                                    <Type className="h-5 w-5 text-gray-400" />
                                </div>
                                <textarea
                                    rows={4}
                                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-travelo-navy transition-all"
                                    placeholder="What are you getting up to? Hiking, food tour, or just relaxing?"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Cover Image URL (Optional)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <ImageIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="url"
                                    className="input-pill w-full pl-12 bg-white border border-gray-200"
                                    placeholder="https://example.com/image.jpg"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end gap-4">
                            <button type="button" onClick={() => navigate('/dashboard')} className="px-6 py-3 text-gray-500 hover:text-gray-900 font-medium transition-colors">Cancel</button>
                            <button type="submit" className="btn-dark px-8 py-3 shadow-lg hover:shadow-xl">Create Trip</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTrip;
