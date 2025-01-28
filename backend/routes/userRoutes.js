const express = require("express");
const userController = require("../controller/userController");
const { secureRoute } = require("../middleware/secureRoute");
const { upload } = require("../storage/profileStorage");
const router = express.Router();

//const userController = require("../controller/user")

router
  .post("/signup", upload.single("profileImage"), userController.signup)
  .post("/login", userController.login)
  .post("/logout", userController.logout);

router.get("/getUserProfile", secureRoute, userController.getUserProfile);

module.exports = router;
