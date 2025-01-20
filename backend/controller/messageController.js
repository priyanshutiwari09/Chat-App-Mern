const { Message } = require("../model/messageModel");
const { Conversation } = require("../model/conversationModel");
const mongoose = require("mongoose");

exports.sendMessage = async (req, res) => {
//   console.log("sendMessage", req.params.id, req.body.message);
  try {
    const senderId = req.user._id;
    //console.log("sender", senderId);
    const receiverId = req.params.id;
    const message = req.body.message;

    // console.log("receiver", receiverId);
    // console.log("sender", senderId);

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }  
    });

    // console.log("conversation", conversation);

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      });
    }

    const newMessage = await new Message({
      senderId,
      receiverId,
      message
    });

    if (newMessage) {
      conversation.messages.push(newMessage);
    }

    await Promise.all([newMessage.save(), conversation.save()]);
    res.status(200).json({ message: "Message sent successfully", newMessage });

  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getMessages = async (req, res) => {
    try{
        const senderId = req.user._id;
        const receiverId = req.params.id

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        if(!conversation){
            return res.status(400).json({message: "No messages found"})
        }

        res.status(200).json(conversation.messages)
    }
    catch(error){
        res.status(500).json({message: "Server error"})
    }
};