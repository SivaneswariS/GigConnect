import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import gigRoutes from "./routes/gigRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// ✅ FIXED — Import CommonJS export properly
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payments", paymentRoutes);

// ✅ Admin routes
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.send("API is running..."));

// ✅ Create HTTP + Socket.IO server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} joined room ${socket.id}`);
  });

  socket.on("sendMessage", ({ senderId, receiverId, content }) => {
    console.log(`Message from ${senderId} to ${receiverId}: ${content}`);
    io.to(receiverId).emit("receiveMessage", { senderId, receiverId, content });
  });

  socket.on("disconnect", () => {
    for (const [userId, id] of onlineUsers.entries()) {
      if (id === socket.id) onlineUsers.delete(userId);
    }
    console.log("🔴 User disconnected:", socket.id);
  });
});

console.log("🟢 Socket.IO server initialized");

const PORT = process.env.PORT || 5050;
server.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);

