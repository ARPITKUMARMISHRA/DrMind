const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const messageSchema = new mongoose.Schema({
    //Login fields
    roomid: { type: mongoose.Schema.Types.ObjectId, ref: 'rooms' },
    msg: { type: String },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
}, {
    timestamps: true
});


const Message = mongoose.model('messages', messageSchema);
module.exports = Message;