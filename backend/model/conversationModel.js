const mongoose = require('mongoose');
const User = require('./userModel');
const Message = require('./messageModel');

const conversationSchema = mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],

    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            required: true,
            default: [],
        }
    ]
},

{
    timestamps: true
});

exports.Conversation = mongoose.model("Conversation", conversationSchema);