const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const roomSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'messages' }]
}, {
    timestamps: true
});


const Room = mongoose.model('rooms', roomSchema);
module.exports = Room;