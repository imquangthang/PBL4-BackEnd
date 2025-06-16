"use strict";
import dotenv from "dotenv";
dotenv.config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const basename = path.basename(__filename);
const db = {};

// Kết nối với MongoDB
let HOST = process.env.MONGODB_HOST;
let PORT = process.env.MONGODB_PORT;
let DB = process.env.MONGODB_DATABASE;
let url = process.env.MONGODB_ATLAS;
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      const conn = await mongoose.connect(url || `mongodb://${HOST}:${PORT}/${DB}`);

      console.log(
        `✅ MongoDB connected: ${url ? "MongoDB Atlas" : "Local"} at ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`
      );

      db.mongoose = mongoose;
      db.connection = conn.connection;
    } else {
      console.log("⚠️ MongoDB already connected.");
    }
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

connectDB();


// Load tất cả các model từ thư mục hiện tại
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.modelName] = model;
  });

module.exports = db;
