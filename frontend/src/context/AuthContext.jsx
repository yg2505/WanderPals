import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/auth/login`,
                { email, password },
                config
            );
            localStorage.setItem("userInfo", JSON.stringify(data));
            setUser(data);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/auth/register`, userData);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setUser(data);
            return data;
        } catch (error) {
            console.error("Registration error", error.response?.data);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("userInfo");
        setUser(null);
    };

    const updateUser = (userData) => {
        localStorage.setItem("userInfo", JSON.stringify(userData));
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, updateUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
