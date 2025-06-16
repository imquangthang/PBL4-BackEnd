import dotenv from "dotenv";
dotenv.config();
import {
  createTableAccounts,
  createTableGroup_Role,
  createTableRoles,
  createTableGroups,
  createTableHealthRecord,
  createTableFaculty,
  createTableAppointment,
  createTableMedicalRecord,
} from "./CreateTable.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let HOST = process.env.MONGODB_HOST;
    let PORT = process.env.MONGODB_PORT;
    let DB = process.env.MONGODB_DATABASE;
    let url = process.env.MONGODB_ATLAS;
    if (mongoose.connection.readyState === 0) {
        const conn = await mongoose.connect(url || `mongodb://${HOST}:${PORT}/${DB}`);

        console.log(
          `✅ MongoDB connected: ${url ? "MongoDB Atlas" : "Local"} at ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`
        );
    }

    //create tables
    // createTableAccounts();
    // createTableGroups();
    // createTableRoles();
    // createTableGroup_Role();
    // createTableHealthRecord();
    // createTableFaculty();
    // createTableAppointment();
    // createTableMedicalRecord();
  } catch (error) {
    console.log(error.message);
  }
};
export default connectDB;
