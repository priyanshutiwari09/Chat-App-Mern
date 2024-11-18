const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();
//const userController = require("../controller/user")

router.post("/signup", userController.signup);

module.exports = router;