const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Message = model('Message', messageSchema);
module.exports = Message;