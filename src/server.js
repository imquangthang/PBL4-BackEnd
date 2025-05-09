import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import { Server } from "socket.io";
import configViewEngine from "./Config/viewEngine.js";
import configCORS from "./Middleware/CORS.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import connectDB from "./Models/ConnectDB.js";
import initApiRoutes from "./Routes/Api.js";
import initSocket from "./socket.js"; // 👈 import socket handler

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React frontend
    methods: ["GET", "POST"],
  },
});

configViewEngine(app);
configCORS(app);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();
initApiRoutes(app);

// 👉 Tách socket xử lý vào file riêng
initSocket(io);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
