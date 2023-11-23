import io from "socket.io-client";

const SOCKET_SERVER_URL = "https://server-game.fly.dev/";
const socket = io(SOCKET_SERVER_URL);

export default socket;
