import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="min-h-screen bg-white">

            {/* Navbar */}
            <nav className="top-0 left-0 w-full bg-travelo-dark/95 z-50 shadow-lg">
                <div className="container-custom flex items-center justify-between py-3.5">
                    <Link
                        to="/"
                        className="text-white text-2xl font-bold tracking-tight"
                    >
                        WanderPals
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/login"
                            className="text-white font-semibold px-5 py-2 rounded-full border border-white hover:bg-white hover:text-travelo-dark transition-all duration-300"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-white text-travelo-dark font-semibold px-5 py-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="pt-20 pb-20 container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold text-travelo-dark mb-6 tracking-tight">
                        WanderPals
                    </h1>
                    <p className="text-xl text-gray-500 leading-relaxed mb-10">
                        Find people traveling to the same destination as you. Connect, chat, and plan your journey together
                        with like-minded travelers from around the world.
                    </p>
                    <Link to="/login" className="inline-block bg-travelo-dark text-white text-lg font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                        Get Started
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="order-2 md:order-1">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Travel buddies planning a trip"
                            className="rounded-3xl shadow-2xl"
                        />
                    </div>
                    <div className="order-1 md:order-2 space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            WanderPals was created for travelers who want company on their journeys.
                            Many people travel to the same places at the same time but never get the chance to connect.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Our platform lets you discover travelers heading to the same destination, chat before your trip,
                            and decide how you want to explore together — whether it’s sightseeing, food hopping,
                            or simply sharing experiences.
                        </p>
                    </div>
                </div>

                <div className="bg-gray-100 rounded-3xl p-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-2xl shadow-sm">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">🌍</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Destination Based Matching</h3>
                            <p className="text-gray-500">
                                Find travelers going to the same place and during the same time as you.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-sm">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">🛡️</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Safe & Trusted Community</h3>
                            <p className="text-gray-500">
                                Connect through profiles and chat before meeting, with safety as a priority.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-sm">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-3xl">💬</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Chat & Plan Together</h3>
                            <p className="text-gray-500">
                                Talk, plan itineraries, and get to know your travel buddies before the trip begins.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
