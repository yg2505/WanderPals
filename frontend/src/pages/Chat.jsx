import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import ChatWindow from "../components/ChatWindow";
import { MessageSquare } from "lucide-react";

const Chat = () => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const { user } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                };
                const { data } = await axios.get("http://localhost:8080/api/chat", config);
                setChats(data);

                // If a chat was passed via navigation state, select it
                if (location.state && location.state.chat) {
                    const passedChat = location.state.chat;
                    // Check if chat already exists in list (it should, as we just fetched)
                    const existingChat = data.find(c => c._id === passedChat._id);
                    if (existingChat) {
                        setSelectedChat(existingChat);
                    } else {
                        // If for some reason it's not in the list (race condition?), add it and select
                        setChats(prev => [passedChat, ...prev]);
                        setSelectedChat(passedChat);
                    }
                    // Clean up state
                    window.history.replaceState({}, document.title);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (user) fetchChats();
    }, [user, location.state]);

    const getSender = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1] : users[0];
    };

    return (
        <div className="flex h-screen pt-20 overflow-hidden bg-gray-900">
            {/* Sidebar */}
            <div className={`w-full md:w-80 lg:w-96 bg-gray-800 border-r border-gray-700 ${selectedChat ? 'hidden md:flex' : 'flex'} flex-col`}>
                <div className="p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold text-white">Messages</h2>
                    <p className="text-sm text-gray-400 mt-1">Connect with fellow travelers</p>
                </div>
                <div className="overflow-y-auto flex-1 p-3 space-y-2">
                    {chats.map((chat) => (
                        <div
                            key={chat._id}
                            onClick={() => setSelectedChat(chat)}
                            className={`p-4 rounded-2xl cursor-pointer transition-all ${selectedChat?._id === chat._id
                                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50"
                                    : "hover:bg-gray-700 text-gray-300"
                                }`}
                        >
                            <div className="flex items-center">
                                <div className="relative">
                                    <img
                                        src={!chat.isGroupChat ? getSender(user, chat.users).avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png" : "https://cdn-icons-png.flaticon.com/512/166/166258.png"}
                                        alt="Avatar"
                                        className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-600 shadow-sm"
                                    />
                                    <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className={`text-sm font-bold truncate ${selectedChat?._id === chat._id ? "text-white" : "text-white"}`}>
                                        {!chat.isGroupChat ? getSender(user, chat.users).name : chat.chatName}
                                    </h3>
                                    {chat.latestMessage && (
                                        <p className={`text-xs truncate mt-1 ${selectedChat?._id === chat._id ? "text-gray-100" : "text-gray-500"}`}>
                                            <span className="font-semibold">{chat.latestMessage.sender.name.split(' ')[0]}: </span>
                                            {chat.latestMessage.content}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {chats.length === 0 && (
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageSquare className="w-8 h-8 text-gray-500" />
                            </div>
                            <p className="text-gray-500 text-sm">No chats yet.</p>
                            <p className="text-gray-600 text-xs mt-2">Start exploring trips to connect!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`w-full md:flex-1 ${!selectedChat ? 'hidden md:flex md:items-center md:justify-center' : 'flex'} flex-col bg-gray-900`}>
                {selectedChat ? (
                    <div className="h-full flex flex-col">
                        <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center shadow-lg z-10">
                            <button className="md:hidden mr-4 text-gray-400 hover:text-cyan-400 transition-colors" onClick={() => setSelectedChat(null)}>
                                &larr; Back
                            </button>
                            <div className="flex items-center">
                                <img
                                    src={!selectedChat.isGroupChat ? getSender(user, selectedChat.users).avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png" : "https://cdn-icons-png.flaticon.com/512/166/166258.png"}
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-gray-600"
                                />
                                <div>
                                    <h2 className="text-lg font-bold text-white">
                                        {!selectedChat.isGroupChat ? getSender(user, selectedChat.users).name : selectedChat.chatName}
                                    </h2>
                                    <span className="text-xs text-green-400 flex items-center font-medium">● Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden relative">
                            <ChatWindow selectedChat={selectedChat} />
                        </div>
                    </div>
                ) : (
                    <div className="text-center p-8">
                        <div className="bg-gray-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border border-gray-700">
                            <span className="text-4xl">💬</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Select a Conversation</h2>
                        <p className="text-gray-500">Choose a chat from the sidebar to start messaging.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
