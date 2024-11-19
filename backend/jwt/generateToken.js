const jwt = require("jsonwebtoken");


exports.createTokenAndSaveCookie = (userId, res) => {
    let token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
        expiresIn: "5d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });
};