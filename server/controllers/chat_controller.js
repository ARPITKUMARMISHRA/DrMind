const User = require('../models/user');
const Room = require('../models/room');
const Message = require('../models/message');

// Send all users to client
module.exports.getUsers = async (req, res) => {
    try {
        const data = await User.find({}).select('_id name');
        return res.status(200).json(data);
    } catch (err) {
        console.log('Error while sending all Users', err);
        return res.status(500).json({});
    }
}

// Function to send the chats in a room
module.exports.getChatRoom = async (req, res) => {
    const { otheruser } = req.body;
    const currentUser = req.user.id;

    User.findById(currentUser)
        .then(async user => {
            let room = await user.rooms.find((value, index) => {
                return value.other.toString() === otheruser;
            });
            room = await Room.findById(room.roomid);
            if (room) {
                // Searching all messages of a pre-existing room
                try {
                    let messagePromise = room.messages.map((messageId) => {
                        return Message.findById(messageId);
                    });
                    let messages = await Promise.all(messagePromise);
                    messages = await messages.map(async (message) => {
                        return {
                            msg: message.msg,
                            sender: message.sender,
                            time: message.time
                        }
                    });
                    // Sending all messages of a room
                    return res.status(200).json(messages);
                } catch (err) {
                    console.log('Error while searching for messages');
                    return res.status(500).json({});
                }
            } else {
                // Creating new empty room
                let newRoom = new Room({
                    users: [currentUser, otheruser],
                    messages: []
                });
                let roomSavePromise = newRoom.save();
                user.rooms.push({ other: otheruser, roomid: newRoom._id });
                let userSavePromise1 = user.save();
                User.findById(otheruser)
                    .then(async otheruser => {
                        otheruser.rooms.push({ other: currentUser, roomid: newRoom._id });
                        let userSavePromise2 = otheruser.save();
                        try {
                            await Promise.all([roomSavePromise, userSavePromise1, userSavePromise2]);
                            console.log(newRoom);
                            // Sending empty room's messages
                            return res.status(200).json(newRoom.messages);
                        } catch (err) {
                            console.log('Error while inserting new rooms into users', err);
                            return res.status(500).json({});
                        }
                    })
                    .catch(err => {
                        console.log('Error while finding clicked user', err);
                        return res.status(500).json({});
                    });
            }
        })
        .catch(err => {
            console.log('Error while finding user', err);
            return res.status(500).json({});
        });
}


// When the user has seen the chats of a room
module.exports.messageSeen = async (req, res) => {
    const { roomid } = req.body;
    res.json({});
}