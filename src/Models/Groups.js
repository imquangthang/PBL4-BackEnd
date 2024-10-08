import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const Groups = new Schema(
  {
    name: {
      type: String,
      required: true, // Ràng buộc giá trị bắt buộc
    },
    description: {
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

Groups.plugin(mongoosePaginate);

export default mongoose.model("groups", Groups);
