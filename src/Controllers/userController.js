import userApiService from "../Services/userApiService";
import loginRegisterService from "../Services/loginRegisterService.js";
import { verifyToken } from "../Middleware/JWTActions";

const readGroupFunc = async (req, res) => {
  try {
    let data = await userApiService.getGroups();
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
const readFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;

      let data = await userApiService.getUserWithPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM, // error message
        EC: data.EC, // error code
        DT: data.DT, //data
      });
    } else {
      let data = await userApiService.getAllUsers();
      return res.status(200).json({
        EM: data.EM, // error message
        EC: data.EC, // error code
        DT: data.DT, //data
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", // error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

const readHospitalFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;

      let data = await userApiService.getHospitalWithPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM, // error message
        EC: data.EC, // error code
        DT: data.DT, //data
      });
    } else {
      let data = await userApiService.getAllHospital();
      return res.status(200).json({
        EM: data.EM, // error message
        EC: data.EC, // error code
        DT: data.DT, //data
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", // error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

const createHospital = async (req, res) => {
  try {
    // req.body: email,phone,username,password,
    if (!req.body.email || !req.body.username || !req.body.password) {
      return res.status(200).json({
        EM: "missing required parameters", // error message
        EC: "1", // error code
        DT: "", //data
      });
    }

    if (req.body.password && req.body.password.length < 4) {
      return res.status(200).json({
        EM: "Your password must have more than 3 letter", // error message
        EC: "1", // error code
        DT: "", //data
      });
    }

    // service: create user
    let data = await userApiService.createHospital(req.body);

    return res.status(200).json({
      EM: data.EM, // error message
      EC: data.EC, // error code
      DT: "", //data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error form server", // error message
      EC: "-1", // error code
      DT: "", //data
    });
  }
};

const updateFunc = async (req, res) => {
  try {
    let data = await userApiService.updateUsers(req.body);
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

const deleteFunc = async (req, res) => {
  try {
    let data = await userApiService.deleteUser(req.body.id);
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

const getUserAccount = async (req, res) => {
  if (req.token) {
    return res.status(200).json({
      EM: "ok", // error message
      EC: 0, // error code
      DT: {
        access_token: req.token,
        groupWithRoles: req.user.groupWithRoles,
        id: req.user.id,
        email: req.user.email,
        username: req.user.username,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        phone: req.user.phone,
        gender: req.user.gender,
        avatar: req.user.avatar,
        address: req.user.address,
      }, //data
    });
  }
  return res.status(200).json({
    EM: "not user", // error message
    EC: 1, // error code
    DT: [],
  });
};

const getUserByEmail = async (req, res) => {
  try {
    let data = await userApiService.getUserByEmail(req.query.email);
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

const updateUser = async (req, res) => {
  try {
    let data = await userApiService.updateUser(req.body);
    // set cookie
    if (data && data.DT && data.DT.access_token) {
      res.cookie("jwt", data.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }
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

const createHealthRecord = async (req, res) => {
  try {
    let decoded = verifyToken(req.token);

    let data = await userApiService.createHealthRecord(decoded.id, req.body);
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

const getHealthRecordByUser = async (req, res) => {
  try {
    let decoded = verifyToken(req.token);

    let data = await userApiService.getHealthRecord(decoded.id);
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

const getHealthRecordByAdmin = async (req, res) => {
  try {
    let id = req.params.id;

    let data = await userApiService.getHealthRecord(id);
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

const getStatisticWithId = async (req, res) => {
  try {
    let id = req.params.id;

    let data = await userApiService.getStatistic(id);
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
  readGroupFunc,
  readFunc,
  createHospital,
  updateFunc,
  deleteFunc,
  getUserAccount,
  getUserByEmail,
  updateUser,
  createHealthRecord,
  getHealthRecordByUser,
  getHealthRecordByAdmin,
  getStatisticWithId,
  readHospitalFunc,
};
