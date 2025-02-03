const mongoose = require("mongoose");
const model = require("../model/userModel");
const bcrypt = require("bcrypt");
const { Message } = require("../model/messageModel");
const { createTokenAndSaveCookie } = require("../jwt/generateToken");

const User = model.User;

exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, preferredLanguage } =
      req.body;
    // console.log(req.file);
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;
    // console.log(profileImage);
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      profileImage,
      preferredLanguage
    });

    await newUser.save();
    createTokenAndSaveCookie(newUser._id, res);
    res.status(200).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profileImage: newUser.profileImage
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!user || !isMatch) {
      return res.status(401).json({ message: "Invalid User or Password" });
    }
    createTokenAndSaveCookie(user._id, res);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserProfile = async (req, res) => {
  const loggedInUser = req.user._id;
  // console.log(loggedInUser)

  try {
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser }
    }).select("-password");
    // console.log(filteredUsers);
    // Create an array of users with their latest messages
    const usersWithLatestMessages = await Promise.all(
      filteredUsers.map(async (user) => {
        // Fetch the most recent message in the conversation between the logged-in user and this user
        const latestMessage = await Message.findOne({
          $or: [
            { senderId: loggedInUser, receiverId: user._id },
            { senderId: user._id, receiverId: loggedInUser }
          ]
        })
          .sort({ createdAt: -1 }) // Sort by the latest message
          .limit(1); // Get only the most recent message

        // If a message exists, return the message, otherwise "No messages found"
        const latestMessageText = latestMessage
          ? latestMessage.message
          : "No messages found";

        const latestMessageTime = latestMessage
          ? latestMessage.createdAt
          : null;

        // Return the user with their latest message
        return {
          ...user.toObject(), // Convert the user to plain JavaScript object
          latestMessage: latestMessageText,
          latestMessageTime
        };
      })
    );

    // Send the response with filtered users and their latest messages
    res.status(200).json({ users: usersWithLatestMessages });
  } catch (error) {
    console.log("Error in allUsers Controller" + error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateLanguage = async (req, res) => {
  try {
    const { language } = req.body;
    const userId = req.params.userId;

    const user = await User.findByIdAndUpdate(
      userId,
      { preferredLanguage: language },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    // console.log("done");
    res.json({ message: "Language Updated", user });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
