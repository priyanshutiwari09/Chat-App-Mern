const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4001",
    methods: ["GET", "POST"]
  }
});

exports.getReceiverId = (receiverId) => users[receiverId];

//translate

const users = {};

io.on("connection", (socket) => {
  console.log("New Client Connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("LogUsers", users);
  }

  io.emit("getOnline", Object.keys(users));
  console.log("online", users);

  socket.on("disconnect", () => {
    console.log("Client Disconnected", socket.id);
    delete users[userId];
    io.emit("getOnline", Object.keys(users));
  });
});

exports.app = app;
exports.server = server;
exports.io = io;
