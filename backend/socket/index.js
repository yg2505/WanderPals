module.exports = (io) => {
    let users = [];

    const addUser = (userId, socketId) => {
        !users.some((user) => user.userId === userId) &&
            users.push({ userId, socketId });
    };

    const removeUser = (socketId) => {
        users = users.filter((user) => user.socketId !== socketId);
    };

    const getUser = (userId) => {
        return users.find((user) => user.userId === userId);
    };

    io.on('connection', (socket) => {
        // take userId and socketId from user
        socket.on("addUser", (userId) => {
            addUser(userId, socket.id);
            io.emit("getUsers", users);
        });

        // send and get message
        socket.on("sendMessage", ({ senderId, receiverId, text, chatId }) => {
            const user = getUser(receiverId);
            if (user) {
                io.to(user.socketId).emit("getMessage", {
                    senderId,
                    text,
                    chatId
                });
            }
        });

        // join chat room
        socket.on("joinChat", (room) => {
            socket.join(room);
            console.log(`User Joined Room: ${room}`);
        });

        // typing
        socket.on("typing", (room) => {
            socket.in(room).emit("typing");
        });

        socket.on("stop typing", (room) => {
            socket.in(room).emit("stop typing");
        });

        // disconnect
        socket.on("disconnect", () => {
            console.log("a user disconnected!");
            removeUser(socket.id);
            io.emit("getUsers", users);
        });
    });
};
