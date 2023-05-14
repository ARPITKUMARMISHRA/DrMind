const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Message = require('../models/message');

// Get cookies from socket request from user
async function getCookies(socket, next) {
    let cookieArr = await socket.handshake.headers.cookie.split('; ');
    socket.cookies = {};
    await cookieArr.forEach(async element => {
        const [name, value] = await element.split('=');
        socket.cookies[name] = value;
    });
    await next();
}
// Fetch user details from the auth-token
async function fetchUser(socket, next) {
    const token = socket.cookies['auth-token'];
    if (!token) {
        socket.user = null;
        return console.log('auth-token not found');
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = data.user;
        let userdetails = await User.findById(socket.user.id);
        socket.user.name = userdetails.name;
        next();
    } catch (err) {
        socket.user = null;
        return console.log('Error while verifying user before socket connection.');
    }
}

const onlineUsers = new Map();
module.exports = (io) => {
    // Middlewares
    io.use(getCookies);
    io.use(fetchUser);

    // On Connection
    io.on('connection', async (socket) => {
        console.log(socket.id, socket.user);

        // Sending all online users when someone connects to server
        socket.on('get-online-users', async () => {
            const data = Array.from(onlineUsers, ([key, value]) => {
                return { _id: key, name: value.name };
            });
            socket.emit('receive-online-users', data);
        });

        // Sending a new user if he joins
        if (!onlineUsers.has(socket.user.id)) {
            socket.broadcast.emit('new-user', { _id: socket.user.id, name: socket.user.name });
            onlineUsers.set(socket.user.id, { name: socket.user.name, socketid: socket.id });
        }

        // Deleting a user if he disconnects
        socket.on('disconnect', async () => {
            onlineUsers.delete(socket.user.id);
            socket.broadcast.emit('user-left', socket.user.id);
        });

        // Receiving the sent message
        socket.on('send-msg', async ({ to, msg }) => {
            const from = socket.user.id;
            const newMessage = new Message({
                msg: msg,
                sender: from
            });
            socket.emit('get-sent-msg-id', newMessage._id);
            if (onlineUsers.has(from)) {
                // Sending message to destination
                const socketid = onlineUsers.get(to).socketid;
                console.log(socketid, newMessage._id);
                io.to(socketid).emit('receive-msg', { _id: newMessage._id, from, msg });
            }
        });
    });
}