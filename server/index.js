const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = 3000;
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let users = [];
io.on("connection", (socket) => {
  users.push(socket.id); // Tambahkan pengguna yang baru terhubung
  console.log("A user connected", socket.id);
  // console.log(users);
  socket.on("disconnect", () => {
    users = users.filter((user) => user !== socket.id); // Hapus pengguna yang terputus
    console.log("User disconnected", socket.id);
  });

  // Fungsi untuk memilih pengguna penggambar secara acak
  const selectRandomDrawer = () => {
    if (users.length > 0) {
      return users[Math.floor(Math.random() * users.length)];
    }
    return null;
  };

  // Event untuk memulai permainan
  socket.on("startGame", () => {
    let drawer = selectRandomDrawer();
    if (drawer) {
      let wordToDraw = words[Math.floor(Math.random() * words.length)]; // Kata acak
      io.to(drawer).emit("yourTurnToDraw", wordToDraw);
    }
  });

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

  socket.on("chat message", (data) => {
    console.log("Message:", data.message, "from:", data.name);
    io.emit("chat message", data);
  });

  socket.on("drawing", (data) => {
    socket.broadcast.emit("drawing", data);
  });

  socket.on("clearCanvas", () => {
    io.emit("clearCanvas");
  });
});

server.listen(port, () => {
  console.log("Listening on", port);
});
