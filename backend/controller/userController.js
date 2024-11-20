const mongoose = require("mongoose");
const model = require("../model/userModel");
const bcrypt = require("bcrypt");
const { createTokenAndSaveCookie } = require("../jwt/generateToken");

const User = model.User;


exports.signup = async (req, res) => {
    try{
        const{ name, email, password, confirmPassword } = req.body;

    if(password !== confirmPassword){
        return res.status(400).json({ message: "Password do not match" });
    }

    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await new User({
        name,
        email,
        password: hashedPassword,
    });

    await newUser.save();
    createTokenAndSaveCookie(newUser._id, res);
    res.status(200).json({ message: "User registered successfully", user:{
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
    } });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
        const isMatch = bcrypt.compareSync(password, user.password);

        if(!user || !isMatch){
            return res.status(401).json({message: "Invalid User or Password"});
        }
        createTokenAndSaveCookie(user._id, res);

        res.status(200).json({message: "User logged in successfully", user:{
        _id: user._id,
        name: user.name,
        email: user.email,
    }});

    } catch(error){
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({message: "Logout Successfully"});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error"});
    }
}