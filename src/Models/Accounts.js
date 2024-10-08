import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const Accounts = new Schema(
  {
    firstName: {
      type: String,
      required: true, // Ràng buộc giá trị bắt buộc
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Đảm bảo không trùng lặp email
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    address: String,
    gender: {
      type: Boolean,
      default: true, // Giả sử true là nam, false là nữ
    },
    phone: {
      type: String,
      required: true,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "groups", // Liên kết với bảng "groups" nếu có
    },
    avatar: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

Accounts.plugin(mongoosePaginate);

export default mongoose.model("accounts", Accounts);
