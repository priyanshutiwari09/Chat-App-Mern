const express = require("express");
const { secureRoute } = require("../middleware/secureRoute");
const router = express.Router();
const { sendMessage, getMessages } = require("../controller/messageController");

router.post("/send/:id", secureRoute, sendMessage);
router.get("/getMessage/:id", secureRoute, getMessages);

module.exports = router;