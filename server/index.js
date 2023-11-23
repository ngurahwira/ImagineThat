const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
let users = [];
let drawingUser = null;
let guessingUser = null;
io.on("connection", (socket) => {
  users.push(socket.id);
  console.log("A user connected", socket.id);
  console.log(users);

  socket.on("disconnect", () => {
    users = users.filter((user) => user !== socket.id);
    console.log("User disconnected", socket.id);
  });

  socket.on("startGame", () => {
    drawingUser = selectRandomDrawer();
    guessingUser = selectRandomGuesser();

    if (drawingUser && guessingUser) {
      let wordToDraw = words[Math.floor(Math.random() * words.length)];
      io.to(drawingUser).emit("yourTurnToDraw", wordToDraw);
      io.to(guessingUser).emit("startGuessing");
    }
  });

  const selectRandomDrawer = () => {
    if (users.length > 0) {
      return users[Math.floor(Math.random() * users.length)];
    }
    return null;
  };

  const selectRandomGuesser = () => {
    const availableUsers = users.filter((user) => user !== drawingUser);
    if (availableUsers.length > 0) {
      return availableUsers[Math.floor(Math.random() * availableUsers.length)];
    }
    return null;
  };

  // ... (event listeners for chat, drawing, clearCanvas, etc.)

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
  ];
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("chat message", (data) => {
    console.log("Message:", data.message, "from:", data.name);
    io.emit("chat message", data);
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
  console.log("Listening on");
});
