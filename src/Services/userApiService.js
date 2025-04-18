require("dotenv").config();
import db from "../Models/index.js";
import {
  hashUserPassword,
  checkEmailExist,
  checkPhoneExist,
  checkUsernameExist,
} from "./loginRegisterService.js";
import { getGroupWithRoles } from "../Services/JWTService.js";
import { createJWT } from "../Middleware/JWTActions.js";
import mongoose from "mongoose";

const getGroups = async () => {
  try {
    // Sử dụng model `Group` để truy vấn và sắp xếp theo `name` tăng dần
    const data = await db.groups.find({}).sort({ name: 1 });

    return {
      EM: "Get group success", // Thông báo thành công
      EC: 0, // Error code = 0 (không lỗi)
      DT: data, // Trả về dữ liệu nhóm
    };
  } catch (error) {
    console.error("Error in getGroups service:", error);

    return {
      EM: "Error from service", // Thông báo lỗi
      EC: 1, // Error code = 1 (có lỗi)
      DT: [], // Không có dữ liệu
    };
  }
};

const getAllUsers = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });
    if (users) {
      return {
        EM: "get data success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "get data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

const getUserWithPagination = async (page, limit) => {
  try {
    const offset = (page - 1) * limit;

    // Tìm user với phân trang và bao gồm thông tin từ Group
    const [users, count] = await Promise.all([
      db.accounts
        .find({})
        // .select("id username email phone sex address")
        .populate({
          path: "groupId", // Trường tham chiếu đến Group trong schema
          select: "_id name description", // Chỉ lấy các trường cần thiết của Group
        })
        .skip(offset)
        .limit(limit)
        .sort({ id: -1 }), // Sắp xếp giảm dần theo id
      db.accounts.countDocuments(), // Đếm tổng số user
    ]);

    const totalPages = Math.ceil(count / limit);

    const data = {
      totalRows: count,
      totalPages: totalPages,
      users: users,
    };

    return {
      EM: "FETCH Ok!",
      EC: 0,
      DT: data,
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

const getAllHospital = async () => {
  try {
    let role = await db.groups.findOne({
      attributes: ["id"],
      where: { name: "hospital" },
    });

    let users = await db.User.findAll({
      where: { groupId: role.id },
    });
    if (users) {
      return {
        EM: "get data success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "get data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

const getHospitalWithPagination = async (page, limit) => {
  try {
    const offset = (page - 1) * limit;

    let role = await db.groups.findOne({ name: "hospital" }).select("_id");
    // Nếu không tìm thấy role, trả về thông báo lỗi
    if (!role) {
      return {
        EM: "not find groups id!",
        EC: 0,
        DT: [],
      };
    }

    // Tìm user với phân trang và bao gồm thông tin từ Group
    const [users, count] = await Promise.all([
      db.accounts
        .find({ groupId: role._id })
        .populate({
          path: "groupId",
          select: "_id name description",
        })
        .skip(offset)
        .limit(limit)
        .sort({ _id: -1 }), // Dùng _id thay vì id
      db.accounts.countDocuments({ groupId: role._id }), // Đếm có điều kiện
    ]);

    const totalPages = Math.ceil(count / limit);

    const data = {
      totalRows: count,
      totalPages: totalPages,
      users: users,
    };

    return {
      EM: "FETCH Ok!",
      EC: 0,
      DT: data,
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

const createHospital = async (rawUserData) => {
  try {
    // check email/phonenumber are exist
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is a already exist",
        EC: 1,
      };
    }
    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist === true) {
      return {
        EM: "The phone number is a already exist",
        EC: 2,
      };
    }
    let isUsernameExits = await checkUsernameExist(rawUserData.username);
    if (isUsernameExits === true) {
      return {
        EM: "The Username is a already exist",
        EC: 3,
      };
    }
    // hash user password
    let hashPassword = hashUserPassword(rawUserData.password);

    // create new user
    await db.accounts.create({
      email: rawUserData.email,
      password: hashPassword,
      username: rawUserData.username,
      phone: rawUserData.phone,
      groupId: rawUserData.group,
      address: rawUserData.address,
    });

    return {
      EM: "A user is a created successfully!",
      EC: 0,
    };
  } catch (error) {
    console.log(">> check error: ", error);
    return {
      EM: "Something wrongs in service....",
      EC: -2,
    };
  }
};

const updateUsers = async (data) => {
  try {
    if (!data.groupId) {
      return {
        EM: "Error with empty GroupId",
        EC: 1,
        DT: "group",
      };
    }
    let user = await db.User.findOne({
      where: { id: data.id },
    });

    if (user) {
      // update
      await user.update({
        username: data.username,
        address: data.address,
        sex: data.sex,
        groupId: data.groupId,
      });
      return {
        EM: "Update User Success",
        EC: 0,
        DT: "",
      };
    } else {
      // not found user
      return {
        EM: "User not found",
        EC: 2,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

const deleteUser = async (id) => {
  try {
    let user = await db.accounts.findById(id);
    if (user) {
      await user.deleteOne();

      return {
        EM: "DELETE user success",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "user not exist",
        EC: 2,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "error from service",
      EC: 1,
      DT: [],
    };
  }
};

const getUserByEmail = async (email) => {
  try {
    let user = await db.User.findOne({
      attributes: [
        "firstName",
        "lastName",
        "email",
        "username",
        "address",
        "sex",
        "phone",
        "aboutMe",
        "skills",
        "education",
        "experience",
        "avatar",
      ],
      where: { email: email },
    });
    if (user) {
      return {
        EM: "get data user success",
        EC: 0,
        DT: user,
      };
    } else {
      return {
        EM: "get data user success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

const updateUser = async (data) => {
  try {
    // Tìm người dùng theo email
    let user = await db.accounts.findOne({ email: data.email }).exec();

    if (user) {
      // Cập nhật thông tin người dùng
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.gender = data.gender;
      user.address = data.address;
      user.avatar = data.avatar;
      user.groupId = data.group ? data.group : user.groupId; // Giữ nguyên groupId nếu không có giá trị mới
      user.faculty_id = data.faculty_id ? data.faculty_id : user.groupId; // Giữ nguyên groupId nếu không có giá trị mới

      // Lưu lại thay đổi
      await user.save();

      user = await db.accounts.findOne({ email: data.email }).exec();
      let groupWithRoles = await getGroupWithRoles(user);
      let payload = {
        id: user.id,
        groupWithRoles,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        phone: user.phone,
        gender: user.gender,
        avatar: user.avatar,
        address: user.address,
      };
      let token = createJWT(payload);
      return {
        EM: "Update User Success",
        EC: 0,
        DT: {
          access_token: token,
          groupWithRoles,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          phone: user.phone,
          gender: user.gender,
          avatar: user.avatar,
          address: user.address,
        },
      };
    } else {
      // Không tìm thấy người dùng
      return {
        EM: "User not found",
        EC: 2,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

const createHealthRecord = async (id, data) => {
  try {
    await db.HealthRecord.create({
      accountId: id,
      ecg_analysis: data.ecgData,
      ecg_type: data.ecgType,
    });
    return {
      EM: "Create Health Record succeeds",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

const getHealthRecord = async (id) => {
  try {
    const data = await db.HealthRecord.find({ accountId: id }).sort({
      created_at: -1,
    });

    return {
      EM: "Get group success", // Thông báo thành công
      EC: 0, // Error code = 0 (không lỗi)
      DT: data, // Trả về dữ liệu nhóm
    };
  } catch (error) {
    console.error("Error in getGroups service:", error);

    return {
      EM: "Error from service", // Thông báo lỗi
      EC: 1, // Error code = 1 (có lỗi)
      DT: [], // Không có dữ liệu
    };
  }
};

const getStatistic = async (id) => {
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    const data = await db.HealthRecord.aggregate([
      {
        $match: {
          accountId: objectId,
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
          value: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          value: 1,
        },
      },
    ]);

    return {
      EM: "Get statistic success", // Thông báo thành công
      EC: 0, // Error code = 0 (không lỗi)
      DT: data, // Trả về dữ liệu dạng [{ date, value }]
    };
  } catch (error) {
    console.error("Error in getStatistic service:", error);

    return {
      EM: "Error from service", // Thông báo lỗi
      EC: 1, // Error code = 1 (có lỗi)
      DT: [], // Không có dữ liệu
    };
  }
};

module.exports = {
  getGroups,
  getAllUsers,
  createHospital,
  updateUsers,
  deleteUser,
  getUserWithPagination,
  getUserByEmail,
  updateUser,
  createHealthRecord,
  getHealthRecord,
  getStatistic,
  getAllHospital,
  getHospitalWithPagination,
};
