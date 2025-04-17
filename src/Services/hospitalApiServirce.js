require("dotenv").config();
import db from "../Models/index.js";
import {
  hashUserPassword,
  checkEmailExist,
  checkPhoneExist,
  checkUsernameExist,
} from "./loginRegisterService.js";

const checkFacultyExist = async (hospitalId, facultyName) => {
  try {
    let faculty = await db.faculty.findOne({
      hospital_id: hospitalId,
      name: facultyName,
    });
    if (faculty) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(">> check error: ", error);
    return false;
  }
};

const createFaculty = async (rawUserData) => {
  try {
    // check email/phonenumber are exist
    let isEmailExist = await checkFacultyExist(
      rawUserData.hospital_id,
      rawUserData.name
    );
    if (isEmailExist === true) {
      return {
        EM: "The faculty is a already exist",
        EC: 1,
      };
    }

    // create new faculty
    await db.faculty.create({
      name: rawUserData.name,
      hospital_id: rawUserData.hospital_id,
    });

    return {
      EM: "A faculty is a created successfully!",
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

const getAllFaculty = async (hospital_id) => {
  try {
    let faculty = await db.faculty
      .find({ hospital_id: hospital_id })
      .select(["_id", "name"]);
    if (faculty) {
      return {
        EM: "get data success",
        EC: 0,
        DT: faculty,
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

const getFacultylWithPagination = async (hospital_id, page, limit) => {
  try {
    const offset = (page - 1) * limit;

    // Tìm user với phân trang và bao gồm thông tin từ Group
    const [faculty, count] = await Promise.all([
      db.faculty
        .find({ hospital_id: hospital_id })
        .skip(offset)
        .limit(limit)
        .sort({ _id: -1 }),
      db.faculty.countDocuments({ hospital_id: hospital_id }), // Đếm có điều kiện
    ]);

    const totalPages = Math.ceil(count / limit);

    const data = {
      totalRows: count,
      totalPages: totalPages,
      faculty: faculty,
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

const updateCurrentFaculty = async (data) => {
  try {
    let faculty = await db.faculty.findOne({ id: data.id });

    if (faculty) {
      // update
      await faculty.updateOne({
        name: data.name,
      });
      return {
        EM: "Update faculty successfully!",
        EC: 0,
        DT: "",
      };
    } else {
      // not found user
      return {
        EM: "Faculty not found",
        EC: 2,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

const createDoctor = async (rawUserData) => {
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

    // get id group Doctor
    let group = await db.groups.findOne({
      name: "doctor",
    });

    if (!group) {
      return {
        EM: "Group not found",
        EC: 4,
      };
    }

    // create new user
    await db.accounts.create({
      email: rawUserData.email,
      password: hashPassword,
      username: rawUserData.username,
      firstName: rawUserData.firstName,
      lastName: rawUserData.lastName,
      phone: rawUserData.phone,
      address: rawUserData.address,
      groupId: group._id,
      faculty_id: rawUserData.faculty_id,
      hospital_id: rawUserData.hospital_id,
    });

    return {
      EM: "A doctor is a created successfully!",
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

const getAllHospital = async (hospital_id) => {
  try {
    // get id group Doctor
    let group = await db.groups.findOne({
      name: "doctor",
    });

    if (!group) {
      return {
        EM: "Group not found",
        EC: 4,
      };
    }
    // get all hospital
    let account = await db.accounts.find({
      hospital_id: hospital_id,
      groupId: group._id,
    });

    if (account) {
      return {
        EM: "get data success",
        EC: 0,
        DT: account,
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

const getHospitalWithPagination = async (hospital_id, page, limit) => {
  try {
    // get id group Doctor
    let group = await db.groups.findOne({
      name: "doctor",
    });
    if (!group) {
      return {
        EM: "Group not found",
        EC: 4,
      };
    }

    const offset = (page - 1) * limit;

    // Tìm user với phân trang và bao gồm thông tin từ Group
    const [doctor, count] = await Promise.all([
      db.accounts
        .find({ hospital_id: hospital_id, groupId: group._id })
        .populate({
          path: "faculty_id", // Trường tham chiếu đến faculty_id trong schema
          select: "_id name", // Chỉ lấy các trường cần thiết của Group
        })
        .skip(offset)
        .limit(limit)
        .sort({ _id: -1 }),
      db.faculty.countDocuments({
        hospital_id: hospital_id,
      }), // Đếm có điều kiện
    ]);

    const totalPages = Math.ceil(count / limit);

    const data = {
      totalRows: count,
      totalPages: totalPages,
      doctor: doctor,
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

module.exports = {
  createFaculty,
  getAllFaculty,
  getFacultylWithPagination,
  updateCurrentFaculty,
  createDoctor,
  getHospitalWithPagination,
  getAllHospital,
};
