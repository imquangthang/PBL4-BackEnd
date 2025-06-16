import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import configViewEngine from "./Config/viewEngine.js";
import configCORS from "./Middleware/CORS.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import connectDB from "./Models/ConnectDB.js";
import initApiRoutes from "./Routes/Api.js";

const app = express();
const server = http.createServer(app);

configViewEngine(app);
configCORS(app);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();
initApiRoutes(app);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
