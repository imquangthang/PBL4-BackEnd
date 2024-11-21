require("dotenv").config();
import db from "../Models/index";
import {
  hashUserPassword,
  checkEmailExist,
  checkPhoneExist,
} from "./loginRegisterService";

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
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["name", "description", "id"] },
      order: [["id", "DESC"]],
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };

    return {
      EM: "FETCH Ok!",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

const createNewUser = async (data) => {
  try {
    // check email/phone number
    let isEmailExist = await checkEmailExist(data.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is a already exist",
        EC: 1,
        DT: "email",
      };
    }
    let isPhoneExist = await checkPhoneExist(data.phone);
    if (isPhoneExist === true) {
      return {
        EM: "The phone number is a already exist",
        EC: 1,
        DT: "phone",
      };
    }
    // hash user password
    let hashPassword = hashUserPassword(data.password);

    // create new user
    await db.User.create({ ...data, password: hashPassword });
    return {
      EM: "CREATE Ok!",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
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
    let user = await db.User.findOne({
      where: { id: id },
    });
    // xóa user nếu là company
    let company = await db.Company.findOne({
      where: { idAccount: id },
    });
    if (company) {
      await company.destroy();
    }
    if (user) {
      await user.destroy();

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
      user.username = data.username;
      user.gender = data.gender;
      user.address = data.address;
      user.avatar = data.avatar;

      // Lưu lại thay đổi
      await user.save();

      return {
        EM: "Update User Success",
        EC: 0,
        DT: "",
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

module.exports = {
  getAllUsers,
  createNewUser,
  updateUsers,
  deleteUser,
  getUserWithPagination,
  getUserByEmail,
  updateUser,
};
