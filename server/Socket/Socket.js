const express = require("express");
const cors = require("cors");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();


const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

const getReceiverSocketId = (receiverId)=>{
  return userSocketMap[receiverId];
}

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user is connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  });
});

module.exports = {server, io, app, getReceiverSocketId }