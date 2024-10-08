import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const Group_Role = new Schema(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "groups", // Liên kết với bảng "groups"
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "roles", // Liên kết với bảng "roles"
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

Group_Role.plugin(mongoosePaginate);

export default mongoose.model("group_role", Group_Role);
