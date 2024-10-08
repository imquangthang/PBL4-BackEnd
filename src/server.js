import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import configViewEngine from "./Config/viewEngine.js";
import configCORS from "./Middleware/CORS.js";
import cookieParser from "cookie-parser";
import webRouter from "./Routes/Web.js";
import connectDB from "./Models/ConnectDB.js";
import initWedRoutes from "./Routes/Web.js";

const app = express();
const port = process.env.PORT || 3001;

// config template engine
configViewEngine(app);

// config CORS
configCORS(app);

// config CORS
app.use(cookieParser());

// Connect DB
// connectDB();

// init wed routes
initWedRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
