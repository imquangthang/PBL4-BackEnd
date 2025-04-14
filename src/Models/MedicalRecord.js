import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const MedicalRecordSchema = new Schema(
  {
    doctor_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "accounts", // Đảm bảo không trùng lặp email
    },
    patient_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "accounts", // Đảm bảo không trùng lặp email
    },
    diagnosis: {
      type: String,
      required: true,
    },
    notes: {
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

MedicalRecordSchema.plugin(mongoosePaginate);

const MedicalRecord = mongoose.model("MedicalRecord", MedicalRecordSchema);
module.exports = MedicalRecord;
