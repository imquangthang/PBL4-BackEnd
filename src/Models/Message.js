import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "accounts",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "accounts",
      required: true,
    },
    message: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

MessageSchema.plugin(mongoosePaginate);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
