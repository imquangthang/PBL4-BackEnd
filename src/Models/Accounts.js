import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const AccountsSchema = new Schema(
  {
    firstName: {
      type: String,
      required: false, // Ràng buộc giá trị bắt buộc
    },
    lastName: {
      type: String,
      required: false,
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
    address: {
      type: String,
    },
    gender: {
      type: String,
      default: true, // Giả sử true/1 là nam, false/0 là nữ
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "groups", // Liên kết với bảng "groups" nếu có
    },
    avatar: {
      type: String,
    },
    hospital_id: {
      type: Schema.Types.ObjectId,
      ref: "accounts",
    },
    faculty_id: {
      type: Schema.Types.ObjectId,
      ref: "faculty", // Liên kết với bảng "faculty" nếu có
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

AccountsSchema.plugin(mongoosePaginate);

const Accounts = mongoose.model("accounts", AccountsSchema);
module.exports = Accounts;
