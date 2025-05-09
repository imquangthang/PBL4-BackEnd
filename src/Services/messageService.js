import db from "../Models/index.js";

const getAllMessage = async (roles) => {
  try {
    const messages = await db.Message.find().sort({ createdAt: 1 });

    return {
      EM: "get all message success",
      EC: 0,
      DT: res.json(messages),
    };
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

const getMessages = async (userAId, userBId) => {
  try {
    const messages = await db.Message.find({
      $or: [
        { sender: userAId, receiver: userBId },
        { sender: userBId, receiver: userAId },
      ],
    }).sort({ created_at: 1 }); // sắp xếp theo thời gian tăng dần

    return {
      EM: "get all message between user success",
      EC: 0,
      DT: messages,
    };
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

const sendMessage = async (sender, receiver, message) => {
  try {
    await db.Message.create({ sender, receiver, message });
    return {
      EM: "create new message successfully",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

const fetchAllUsersChatting = async (userId) => {
  try {
    // 1. Tìm tất cả các tin nhắn liên quan đến userId
    const messages = await db.Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).select("sender receiver");

    // 2. Tập hợp các userId khác
    const otherUserIdsSet = new Set();
    messages.forEach((msg) => {
      if (msg.sender.toString() !== userId.toString())
        otherUserIdsSet.add(msg.sender.toString());
      if (msg.receiver.toString() !== userId.toString())
        otherUserIdsSet.add(msg.receiver.toString());
    });

    const otherUserIds = Array.from(otherUserIdsSet);

    if (otherUserIds.length === 0) {
      return { EM: "no conversation", EC: 0, DT: [] };
    }

    // 3. Truy vấn thông tin người dùng đối tác
    const users = await db.accounts
      .find({
        _id: { $in: otherUserIds },
      })
      .populate("groupId", "_id name description"); // nếu có group được ref

    return {
      EM: "get data success",
      EC: 0,
      DT: users,
    };
  } catch (error) {
    console.error(error);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  getAllMessage,
  getMessages,
  sendMessage,
  fetchAllUsersChatting,
};
