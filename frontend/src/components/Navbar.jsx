import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Landing page typically has a hero section, so start transparent
    const isLanding = location.pathname === "/" || location.pathname === "/dashboard";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navClass = `fixed w-full z-50 transition-all duration-300 ${isScrolled || !isLanding ? "bg-travelo-dark/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        }`;

    const linkClass = "text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer";

    return (
        <nav className={navClass}>
            <div className="container-custom flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-white tracking-tight">
                    WanderPals
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to={user ? "/dashboard" : "/"} className={linkClass}>Home</Link>
                    <Link to="/explore" className={linkClass}>Explore</Link>
                    <Link to="/chat" className={linkClass}>Chat</Link>
                </div>

                {/* Right Action */}
                <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                        <>
                            <Link to="/create-trip" className={linkClass}>Create Trip</Link>
                            <Link to="/profile" className={linkClass}>Profile</Link>
                            <button onClick={handleLogout} className="btn-primary text-sm font-bold">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="btn-primary text-sm font-bold">
                            Sign In
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-travelo-dark border-t border-gray-800 p-4 flex flex-col space-y-4 shadow-xl">
                    <Link to={user ? "/dashboard" : "/"} className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link to="/" className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                    {user && (
                        <>
                            <Link to="/create-trip" className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>Create Trip</Link>
                            <Link to="/chat" className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>Chats</Link>
                            <Link to="/profile" className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
                            <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-left text-sm font-medium text-red-400">Logout</button>
                        </>
                    )}
                    {!user && (
                        <Link to="/login" className="btn-primary text-center" onClick={() => setIsMobileMenuOpen(false)}>
                            Sign In
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
