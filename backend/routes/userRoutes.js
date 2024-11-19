const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();
//const userController = require("../controller/user")

router
    .post("/signup", userController.signup)
    .post("/login", userController.login)
    .post("/logout", userController.logout)

module.exports = router;