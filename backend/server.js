import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import gigRoutes from "./routes/gigRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import chatRoutes from "./routes/chatRoutes.js"; // ✅ Chat route

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);

// Test route
app.get("/", (req, res) => res.send("API is running..."));

// Create HTTP server (for Express + Socket.IO)
const server = http.createServer(app);

// ✅ Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Track active users (optional improvement)
const onlineUsers = new Map();

// Socket.IO events
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // Join personal room
  socket.on("join", (userId) => {
    socket.join(userId);
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} joined room ${socket.id}`);
  });

  // Send private message
  socket.on("sendMessage", ({ senderId, receiverId, content }) => {
    console.log(`Message from ${senderId} to ${receiverId}: ${content}`);
    io.to(receiverId).emit("receiveMessage", { senderId, content });
  });

  // Disconnect
  socket.on("disconnect", () => {
    for (const [userId, id] of onlineUsers.entries()) {
      if (id === socket.id) onlineUsers.delete(userId);
    }
    console.log("🔴 User disconnected:", socket.id);
  });
});

console.log("🟢 Socket.IO server initialized"); // ✅ Add this here

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


