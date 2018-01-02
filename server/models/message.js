const mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    url: {
        type: String,
        required: true,
        minLength: 1
    },
    socketId: {
        type: String,
        required: true,
        minLength: 1
    }
});

var Message = mongoose.model('Message', MessageSchema);

module.exports = {Message};
