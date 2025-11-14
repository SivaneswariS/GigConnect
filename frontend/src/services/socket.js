import { io } from "socket.io-client";

const socket = io("https://gigconnect-auzq.onrender.com", {
  transports: ["websocket", "polling"], // support both
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 5,
  timeout: 30000, 
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket.IO connect_error:", err.message);
});

export default socket;


