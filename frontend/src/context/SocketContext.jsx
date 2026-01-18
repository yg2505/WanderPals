import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import AuthContext from "./AuthContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            const newSocket = io(import.meta.env.VITE_API_URL || "http://localhost:8080");
            setSocket(newSocket);
            newSocket.emit("addUser", user._id); // Assuming backend expects _id, mapped to userId in memory

            return () => newSocket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;
