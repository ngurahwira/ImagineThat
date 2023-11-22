const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

// Mengatur CORS pada Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
// console.log(generate, 17);
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  const words = [
    "apple",
    "banana",
    "orange",
    "pineapple",
    "pinus",
    "crocodile",
    "sugar",
    "coffee",
    "tree",
    "door",
  ]; // Kata-kata yang mungkin
  let currentWord = "";
  currentWord = words[Math.floor(Math.random() * words.length)];
  // console.log(currentWord, 25);
  socket.emit("wordToDraw", currentWord);

  socket.on("chat message", (msg) => {
    console.log("Message: " + msg);
    io.emit("chat message", msg);
  });

  socket.on("drawing", (data) => {
    // Meneruskan data gambar ke semua klien yang terhubung
    socket.broadcast.emit("drawing", data);
  });

  socket.on("clearCanvas", () => {
    // Mengirim pesan untuk membersihkan kanvas ke semua klien
    io.emit("clearCanvas");
  });
});

server.listen(3000, () => {
  console.log("Listening on :3000");
});
