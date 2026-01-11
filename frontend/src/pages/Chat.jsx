import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import ChatWindow from "../components/ChatWindow";

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
        <div className="flex h-screen pt-20 overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <div className={`w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 ${selectedChat ? 'hidden md:flex' : 'flex'} flex-col`}>
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-travelo-dark">Messages</h2>
                </div>
                <div className="overflow-y-auto flex-1 p-3 space-y-2">
                    {chats.map((chat) => (
                        <div
                            key={chat._id}
                            onClick={() => setSelectedChat(chat)}
                            className={`p-4 rounded-2xl cursor-pointer transition-all ${selectedChat?._id === chat._id ? "bg-travelo-navy text-white shadow-lg" : "hover:bg-gray-100 text-gray-900"}`}
                        >
                            <div className="flex items-center">
                                <div className="relative">
                                    <img
                                        src={!chat.isGroupChat ? getSender(user, chat.users).avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png" : "https://cdn-icons-png.flaticon.com/512/166/166258.png"}
                                        alt="Avatar"
                                        className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white shadow-sm"
                                    />
                                    <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className={`text-sm font-bold truncate ${selectedChat?._id === chat._id ? "text-white" : "text-gray-900"}`}>
                                        {!chat.isGroupChat ? getSender(user, chat.users).name : chat.chatName}
                                    </h3>
                                    {chat.latestMessage && (
                                        <p className={`text-xs truncate mt-1 ${selectedChat?._id === chat._id ? "text-gray-300" : "text-gray-500"}`}>
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
                            <p className="text-gray-400 text-sm">No chats yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`w-full md:flex-1 ${!selectedChat ? 'hidden md:flex md:items-center md:justify-center' : 'flex'} flex-col bg-gray-50`}>
                {selectedChat ? (
                    <div className="h-full flex flex-col">
                        <div className="p-4 bg-white border-b border-gray-200 flex items-center shadow-sm z-10">
                            <button className="md:hidden mr-4 text-gray-500 hover:text-travelo-dark" onClick={() => setSelectedChat(null)}>
                                &larr; Back
                            </button>
                            <div className="flex items-center">
                                <img
                                    src={!selectedChat.isGroupChat ? getSender(user, selectedChat.users).avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png" : "https://cdn-icons-png.flaticon.com/512/166/166258.png"}
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200"
                                />
                                <div>
                                    <h2 className="text-lg font-bold text-travelo-dark">
                                        {!selectedChat.isGroupChat ? getSender(user, selectedChat.users).name : selectedChat.chatName}
                                    </h2>
                                    <span className="text-xs text-green-500 flex items-center font-medium">● Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden relative">
                            <ChatWindow selectedChat={selectedChat} />
                        </div>
                    </div>
                ) : (
                    <div className="text-center p-8">
                        <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <span className="text-4xl">💬</span>
                        </div>
                        <h2 className="text-2xl font-bold text-travelo-dark mb-2">Select a Conversation</h2>
                        <p className="text-gray-500">Choose a chat from the sidebar to start messaging.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
