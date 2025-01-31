const { Message } = require("../model/messageModel");
const { Conversation } = require("../model/conversationModel");
const mongoose = require("mongoose");
const { getReceiverId } = require("../SocketIO/server");
const { Socket } = require("socket.io");
const { app, server, io } = require("../SocketIO/server");
const { User } = require("../model/userModel");
const translateMessage = require("../LanguageTranslate/libreTranslate");

exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    const message = req.body.message;

    // console.log("Sending message from:", senderId);
    // console.log("To receiver:", receiverId);
    // console.log("Message content:", message);

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      // console.log("No conversation found. Creating new conversation...");
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      });
    }

    const receiverUser = await User.findById(receiverId);
    console.log("receiverUser", receiverUser.preferredLanguage);
    const translatedMessage = await translateMessage(
      message,
      receiverUser.preferredLanguage
    );
    if (!translatedMessage) {
      return res.status(400).json({ error: "Translation failed" });
    }
    console.log("translatedMessage", translatedMessage);

    const newMessage = await new Message({
      senderId,
      receiverId,
      message,
      translatedMessage
    });

    // console.log("New message object:", newMessage);

    if (newMessage) {
      conversation.messages.push(newMessage);
    }

    await Promise.all([newMessage.save(), conversation.save()]);

    // console.log("Message saved, notifying receiver...");

    const receiverSocketId = getReceiverId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log("Message sent to receiver via socket.");
    }
    console.log("newMessage", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error); // Add this for better error details
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    }).populate("messages");

    if (!conversation) {
      return res.status(400).json({ message: "No messages found" });
    }

    console.log("getmessages", conversation.messages);
    res.status(200).json(conversation.messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
