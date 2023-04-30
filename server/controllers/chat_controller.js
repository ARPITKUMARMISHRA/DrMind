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
            const promises = rooms.map(async (room) => {
                const usersInRoom = (await Room.findById(room.id)).users;
                room.users = usersInRoom;
                return room;
            });
            rooms = await Promise.all(promises);
            let users = await User.find({}).select('_id');
            return res.status(200).json({ rooms: rooms, users: users });
        })
        .catch(err => {
            console.log(`Error while fetching rooms`, err);
            return res.status(500).json({});
        });
}

// Function to send message in room
module.exports.sendMessage = (req, res) => {
    console.log(req.body);
    const currentUser = req.user.id;
    const msg = new Message();
    msg.sender = currentUser;
    msg.msg = req.body.msg;

    function error() { return res.status(500).json({}) };


    // Sending message whom you have already contacted before
    if (req.body.roomid) {
        msg.roomid = req.body.roomid;
        msg.save()
            .then(msg => {
                User.findById(currentUser)
                    .then(async user => {
                        let i = user.rooms.findIndex((val, ind) => val === req.body.roomid);
                        user[i].time = req.body.time;
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
            .then(room => {
                msg.roomid = room._id;
                msg.save()
                    .then(msg => {
                        User.findById(currentUser)
                            .then(async user => {
                                let i = user.rooms.findIndex((val, ind) => val === req.body.roomid);
                                user[i].time = req.body.time;
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
                    })
                    .catch(error);
            })
            .catch(error);
    } else {
        error();
    }
}


// Function to get all chat in a room
module.exports.getChats = (req, res) => {
    const currentUser = req.user.id;
    function error() { return res.status(500).json({}); }

    Room.findById(req.body.roomid)
        .then(room => {
            return res.status(200).json({ messages: room.messages });
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
                    let deleteMessagePromise = messages.map(val => {
                        return Message.findByIdAndDelete(val.id);
                    })
                    await Promise.all([deleteRoomPromise, ...deleteMessagePromise]);
                    return res.status(200).json({});
                })
                .catch(error);
        })
        .catch(error);
}