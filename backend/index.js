const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { app, server, io } = require("./SocketIO/server");

// const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
const PORT = process.env.PORT || 8080;
const URI = process.env.MONGODB_URI;

app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

try {
  mongoose.connect(URI);
  console.log("Database Connected...");
} catch (error) {
  console.log(error);
}

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
