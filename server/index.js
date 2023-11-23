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
