import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const FacultySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hospital_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "accounts", // Đảm bảo không trùng lặp email
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

FacultySchema.plugin(mongoosePaginate);

const Faculty = mongoose.model("faculty", FacultySchema);
module.exports = Faculty;
