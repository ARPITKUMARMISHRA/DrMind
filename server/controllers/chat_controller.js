const User = require('../models/user');
const Room = require('../models/room');
const Message = require('../models/message');

// Function for getting data of all contacts & profiles
module.exports.getRooms = (req, res) => {
    const currentUser = req.user.id;
    User.findById(currentUser)
        .then(async (user) => {
            // Get all rooms
            let rooms = user.rooms;
            let promises = rooms.map(async (room) => {
                const usersInRoom = (await Room.findById(room.roomid)).users;
                room = {
                    roomid: room.roomid,
                    time: room.time,
                    users: usersInRoom
                };
                return room;
            });
            rooms = await Promise.all(promises);
            console.log(rooms);
            let users = await User.find({}).select('_id name');
            return res.status(200).json({ rooms: rooms, users: users });
        })
        .catch(err => {
            console.log(`Error while fetching rooms`, err);
            return res.status(500).json({});
        });
}

// Function to get all chat in a room
module.exports.getChats = (req, res) => {
    const currentUser = req.user.id;
    function error() { return res.status(500).json({}); }

    Room.findById(req.body.roomid)
        .then(async room => {
            // Get chats in room
            let messages = room.messages;
            let getMessagesPromise = messages.map(msgid => {
                return Message.findById(msgid).select('msg sender time');
            });
            messages = await Promise.all([...getMessagesPromise]);
            return res.status(200).json(messages);
        })
        .catch(error);
}

// Function to delete a room
module.exports.deleteRoom = (req, res) => {
    const currentUser = req.user.id;
    function error() { return res.status(500).json({}); }

    User.findById(currentUser)
        .then(user => {
            user.rooms = user.rooms.filter((val, ind) => { val.id !== req.body.roomid });
            user.save()
                .then(async () => {
                    const room = await Room.findById(req.body.roomid);
                    const messages = room.messages;
                    let deleteRoomPromise = Room.findByIdAndDelete(req.body.roomid);
                    let deleteMessagePromise = messages.map(msgid => {
                        return Message.findByIdAndDelete(msgid);
                    })
                    await Promise.all([deleteRoomPromise, ...deleteMessagePromise]);
                    return res.status(200).json({});
                })
                .catch(error);
        })
        .catch(error);
}

// Function to send message in room
module.exports.sendMessage = (req, res) => {
    // console.log(req.body);
    const currentUser = req.user.id;
    const msg = new Message();
    msg.sender = currentUser;
    msg.msg = req.body.msg;
    msg.time = req.body.time;

    function error() { return res.status(500).json({}) };


    // Sending message whom you have already contacted before
    if (req.body.roomid) {
        msg.roomid = req.body.roomid;
        User.findById(currentUser)
            .then(async user => {
                let i = user.rooms.findIndex((val, ind) => val.roomid.toString() === req.body.roomid);
                if (i >= 0) {
                    msg.save()
                        .then(msg => {
                            user.rooms[i].time = req.body.time;
                            user.save()
                                .then(() => {
                                    Room.findById(req.body.roomid)
                                        .then(room => {
                                            room.messages.push(msg);
                                            room.save()
                                                .then(() => { return res.status(200).json({}); })
                                                .catch(error);
                                        })
                                        .catch(error);
                                })
                                .catch(error);
                        })
                        .catch(error);
                } else error();
            })
            .catch(error);
    }
    // First time message
    else if (req.body.to) {
        const room = new Room({
            users: [currentUser, req.body.to],
            messages: []
        });
        room.save()
            .then(() => {
                msg.roomid = room._id;
                msg.save()
                    .then(msg => {
                        User.findById(currentUser)
                            .then(async user => {
                                user.rooms.push({ roomid: room._id, time: req.body.time });
                                user.save()
                                    .then((user) => {
                                        Room.findById(room.id)
                                            .then(room => {
                                                room.messages.push(msg);
                                                room.save()
                                                    .then(() => { return res.status(200).json({}); })
                                                    .catch(error);
                                            })
                                            .catch(error);
                                    })
                                    .catch(error);
                            })
                            .catch(error);
                    })
                    .catch(error);
            })
            .catch(error);
    } else {
        error();
    }
}