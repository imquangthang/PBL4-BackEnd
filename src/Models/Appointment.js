import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema(
  {
    patient_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "accounts", // Đảm bảo không trùng lặp email
    },
    doctor_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "accounts", // Đảm bảo không trùng lặp email
    },
    hospital_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "accounts", // Đảm bảo không trùng lặp email
    },
    faculty_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "faculty", // Đảm bảo không trùng lặp email
    },
    date: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

AppointmentSchema.plugin(mongoosePaginate);

const Appointment = mongoose.model("appointment", AppointmentSchema);
module.exports = Appointment;
