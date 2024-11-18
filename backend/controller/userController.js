const mongoose = require("mongoose");
const model = require("../model/userModel");
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

    const newUser = await new User({
        name,
        email,
        password,
        confirmPassword
    });

    newUser.save().then(() => res.json("User registered successfully"));
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
} 