import { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../context/AuthContext";
import SocketContext from "../context/SocketContext";
import axios from "axios";
import { Send } from "lucide-react";

const ChatWindow = ({ selectedChat }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const { user } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const scrollRef = useRef();

    useEffect(() => {
        if (!selectedChat) return;

        const fetchMessages = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                };
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/messages/${selectedChat._id}`,
                    config
                );
                setMessages(data);
                socket.emit("joinChat", selectedChat._id);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMessages();
        setMessages([]);
    }, [selectedChat, user.token]);

    useEffect(() => {
        if (!socket) return;

        socket.on("getMessage", (data) => {
            if (selectedChat && selectedChat._id === data.chatId) {
                setMessages((prev) => [...prev, { content: data.text, sender: { _id: data.senderId }, chat: { _id: data.chatId } }]);
            }
        });

        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));

        return () => {
            socket.off("getMessage");
            socket.off("typing");
            socket.off("stop typing");
        }
    }, [socket, selectedChat]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage) return;

        socket.emit("stop typing", selectedChat._id);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/messages`,
                { content: newMessage, chatId: selectedChat._id },
                config
            );

            const receiverId = selectedChat.users.find(u => u._id !== user._id)._id;

            socket.emit("sendMessage", {
                senderId: user._id,
                receiverId,
                text: newMessage,
                chatId: selectedChat._id
            });

            setMessages([...messages, data]);
            setNewMessage("");
        } catch (error) {
            console.error(error);
        }
    };

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!socket) return;
        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    if (!selectedChat) return null;

    return (
        <div className="flex flex-col h-full bg-gray-900">
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        ref={scrollRef}
                        className={`flex ${m.sender._id === user._id ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[75%] px-5 py-3 rounded-2xl ${m.sender._id === user._id
                                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-none shadow-lg"
                                : "bg-gray-800 text-gray-100 shadow-md rounded-bl-none border border-gray-700"
                                }`}
                        >
                            <p className="text-sm md:text-base leading-relaxed">{m.content}</p>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex items-center space-x-2 ml-4">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                )}
            </div>
            <div className="p-4 bg-gray-800 border-t border-gray-700">
                <form onSubmit={sendMessage} className="flex space-x-3 max-w-4xl mx-auto">
                    <input
                        type="text"
                        className="flex-1 bg-gray-700 border-none rounded-full px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={typingHandler}
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-full hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/50 transition-all transform active:scale-95"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatWindow;
