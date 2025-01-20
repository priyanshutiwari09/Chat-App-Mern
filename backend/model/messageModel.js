const mongoose = require("mongoose");
const User = require("./userModel");

const messageSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    message: {
      type: String,
      required: true,
      maxLength: 1000,
      validate: {
        validator: function (v) {
          return v.trim().length > 0;
        },
        message: "Message cannot be empty"
      }
    },
    createAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

exports.Message = mongoose.model("Message", messageSchema);
