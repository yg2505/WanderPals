import { Link } from "react-router-dom";
import { MapPin, Shield, MessageCircle, Users, Globe, Heart, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const About = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="bg-gray-800 text-white min-h-screen">

            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-gray-900/95 backdrop-blur-md shadow-lg" : "bg-transparent"
                }`}>
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold tracking-wider">
                        WANDERPALS
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link
                            to="/login"
                            className="text-gray-200 hover:text-cyan-400 transition-colors font-medium"
                        >
                            LOGIN
                        </Link>
                        <Link
                            to="/register"
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-cyan-500/50 hover:from-cyan-600 hover:to-blue-600 transition-all active:scale-95"
                        >
                            SIGN UP
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Mountain Lake"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
                        <span className="text-cyan-400">WANDER</span>
                        <span className="text-white">PALS</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                        Find people traveling to the same destination as you. Connect, chat, and plan your journey together
                        with like-minded travelers from around the world.
                    </p>
                    <Link
                        to="/register"
                        className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold px-10 py-4 rounded-full text-lg transition-all shadow-lg shadow-cyan-500/50 hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 active:scale-95"
                    >
                        GET STARTED
                    </Link>
                </div>

                {/* Feature Icons Row */}
                <div className="absolute bottom-20 left-0 right-0 z-10">
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-700/60 backdrop-blur-md p-6 rounded-lg border border-gray-600/50 hover:border-cyan-400/50 transition-all">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white mb-1">Destination Matching</h3>
                                    <p className="text-sm text-gray-400">Connect with travelers heading to your destination</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-700/60 backdrop-blur-md p-6 rounded-lg border border-gray-600/50 hover:border-cyan-400/50 transition-all">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-6 h-6 text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white mb-1">Safe Community</h3>
                                    <p className="text-sm text-gray-400">Verified profiles and secure messaging</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-700/60 backdrop-blur-md p-6 rounded-lg border border-gray-600/50 hover:border-cyan-400/50 transition-all">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <MessageCircle className="w-6 h-6 text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white mb-1">Plan Together</h3>
                                    <p className="text-sm text-gray-400">Chat and coordinate before you travel</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-32 px-6 bg-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-cyan-400/10 rounded-2xl blur-xl" />
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Travel buddies planning a trip"
                                className="relative rounded-2xl w-full object-cover shadow-2xl"
                            />
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-5xl md:text-6xl font-bold">
                                <span className="text-cyan-400">OUR</span> <span className="text-white">STORY</span>
                            </h2>
                            <div className="h-1 w-20 bg-cyan-500 rounded-full" />
                            <p className="text-gray-300 text-lg leading-relaxed">
                                WanderPals was created for travelers who want company on their journeys.
                                Many people travel to the same places at the same time but never get the chance to connect.
                            </p>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Our platform lets you discover travelers heading to the same destination, chat before your trip,
                                and decide how you want to explore together — whether it's sightseeing, food hopping,
                                or simply sharing experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-32 px-6 bg-gray-700/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-cyan-400">WHY CHOOSE</span> <span className="text-white">US?</span>
                        </h2>
                        <p className="text-gray-400 text-lg">There will be a small title here</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group relative overflow-hidden rounded-2xl h-80">
                            <img
                                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000&auto=format&fit=crop"
                                alt="Destination Matching"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
                                    <MapPin className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Destination Based Matching</h3>
                                <p className="text-gray-300 text-sm">Find travelers going to the same place and during the same time as you.</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group relative overflow-hidden rounded-2xl h-80">
                            <img
                                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop"
                                alt="Safe Community"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
                                    <Shield className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Safe & Trusted Community</h3>
                                <p className="text-gray-300 text-sm">Connect through profiles and chat before meeting, with safety as a priority.</p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group relative overflow-hidden rounded-2xl h-80">
                            <img
                                src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=1000&auto=format&fit=crop"
                                alt="Chat and Plan"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4">
                                    <MessageCircle className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Chat & Plan Together</h3>
                                <p className="text-gray-300 text-sm">Talk, plan itineraries, and get to know your travel buddies before the trip begins.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-28 px-6 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1519414442781-fbd745c5b497?q=80&w=2082&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Adventure"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-800/80 via-black/70 to-gray-900" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl md:text-8xl font-black mb-10 leading-tight text-white tracking-tighter">
                        READY TO START YOUR<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            NEXT ADVENTURE?
                        </span>
                    </h2>
                    <p className="text-gray-300 leading-relaxed text-xl mb-12 max-w-2xl mx-auto">
                        Join thousands of travelers who have already found their perfect companion.
                        Your next story starts here.
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-5 rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-cyan-500/30 group"
                    >
                        JOIN NOW
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div className="mt-16 flex items-center justify-center gap-4">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400"></div>
                        <p className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-xs">The world is better together</p>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400"></div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-8 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">© 2026 WanderPals. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" /><path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default About;
