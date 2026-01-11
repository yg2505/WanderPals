import { useState, useEffect } from "react";
import axios from "axios";
import TripCard from "../components/TripCard";
import Navbar from "../components/Navbar";
import TripDetailsModal from "../components/TripDetailsModal";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const Trips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                // Fetch all trips from the public endpoint
                const { data } = await axios.get("http://localhost:8080/api/trips/all");
                setTrips(data);
            } catch (error) {
                console.error("Error fetching trips", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

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
                        Community Trips
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Explore amazing trip plans created by our community members and get inspired for your next adventure.
                    </p>
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
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500 mb-6">No trips found. Be the first to create one!</p>
                    </div>
                )}
            </div>

            <TripDetailsModal
                trip={selectedTrip}
                onClose={() => setSelectedTrip(null)}
                onChat={handleChat}
            />
        </div>
    );
};

export default Trips;
