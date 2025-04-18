import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const MedicalRecordSchema = new Schema(
  {
    doctor_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "accounts",
    },
    patient_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "accounts",
    },
    hospital_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "accounts",
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

const MedicalRecord = mongoose.model("MedicalRecords", MedicalRecordSchema);
module.exports = MedicalRecord;
