import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema(
  {
    patient_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "accounts",
    },
    doctor_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "accounts",
    },
    hospital_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "accounts",
    },
    faculty_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "faculty",
    },
    // HealthRecord_id: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    //   ref: "HealthRecord",
    // },
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
    reason_reject: {
      type: String,
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
