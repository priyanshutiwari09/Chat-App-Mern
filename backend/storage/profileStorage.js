const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this is the correct path to the uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
  }
});

const upload = multer({ storage: storage });

module.exports = { upload };
