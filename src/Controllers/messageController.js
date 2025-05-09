import messageService from "../Services/messageService.js";

const getAllMessage = async (req, res) => {
  try {
    let userAId = req.query.userA;
    let userBId = req.query.userB;
    console.log(userAId);
    console.log(userBId);

    let data = await messageService.getMessages(userAId, userBId);
    console.log(data);

    if (data) {
      return res.status(200).json({
        EM: data.EM, // thông điệp lỗi
        EC: data.EC, // mã lỗi
        DT: data.DT, // dữ liệu
      });
    } else {
      return res.status(200).json({
        EM: "",
        EC: "-1", // mã lỗi
        DT: [], // dữ liệu
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", // thông báo lỗi
      EC: "-1", // mã lỗi
      DT: "", // không có dữ liệu
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    if (!sender || !receiver || !message)
      return res.status(400).json({ message: "Missing data" });
    const data = messageService.sendMessage(sender, receiver, message);
    if (data) {
      return res.status(200).json({
        EM: data.EM, // thông điệp lỗi
        EC: data.EC, // mã lỗi
        DT: data.DT, // dữ liệu
      });
    } else {
      return res.status(200).json({
        EM: "",
        EC: "-1", // mã lỗi
        DT: [], // dữ liệu
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", // thông báo lỗi
      EC: "-1", // mã lỗi
      DT: "", // không có dữ liệu
    });
  }
};

const fetchAllUsersChatting = async (req, res) => {
  try {
    let userId = req.query.userId;

    let data = await messageService.fetchAllUsersChatting(userId);
    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, // error code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", // error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

module.exports = {
  getAllMessage,
  sendMessage,
  fetchAllUsersChatting,
};
