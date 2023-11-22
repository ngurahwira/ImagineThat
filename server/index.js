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

const words = [
  "apple",
  "banana",
  "cherry",
  "orange",
  "crocodile",
  "camel",
  "shark",
  "ambulance",
  "computer",
  "lego-batman",
];
let currentWordIndex = -1;
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  function wordForTheDrawer() {
    currentWordIndex = Math.floor(Math.random() * words.length);
    const wordToDraw = words[currentWordIndex];
    socket.emit("wordToDraw", wordToDraw);
  }
  socket.on("guessWord", (guessedWord) => {
    if (currentWordIndex !== -1) {
      const actualWord = words[currentWordIndex];
      if (guessedWord === actualWord) {
        io.emit("guessResult", { status: true });
        sendWordToDrawer();
      } else {
        socket.emit("guessResult", { status: false });
      }
    }
  });
  wordForTheDrawer();
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
