import { io } from "socket.io-client";

const socket = io("http://localhost:5050", {
  transports: ["websocket", "polling"], // support both
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 5,
  timeout: 10000, // 10 seconds
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket.IO connect_error:", err.message);
});

export default socket;


