require("dotenv").config();
import db from "../Models/index.js";
import bcrypt from "bcryptjs";
import { getGroupWithRoles } from "../Services/JWTService.js";
import { createJWT } from "../Middleware/JWTActions.js";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};

const checkEmailExist = async (userEmail) => {
  try {
    let user = await db.accounts.findOne({ email: userEmail }).exec();
    return user ? true : false; // Return true if user exists, otherwise false
  } catch (error) {
    console.log("Error checking email: ", error);
    return false; // In case of an error, return false
  }
};

const checkPhoneExist = async (userPhone) => {
  try {
    let user = await db.accounts.findOne({ phone: userPhone }).exec();
    return user ? true : false; // Return true if user exists, otherwise false
  } catch (error) {
    console.log("Error checking phone: ", error);
    return false; // In case of an error, return false
  }
};

const checkUsernameExist = async (userName) => {
  try {
    let user = await db.accounts.findOne({ username: userName }).exec();
    return user ? true : false; // Return true if user exists, otherwise false
  } catch (error) {
    console.log("Error checking userName: ", error);
    return false; // In case of an error, return false
  }
};

const registerNewUser = async (rawUserData) => {
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
    // get id group Guest
    let group = await db.groups.findOne({
      name: "user",
    });

    // create new user
    await db.accounts.create({
      firstName: rawUserData.firstName,
      lastName: rawUserData.lastName,
      email: rawUserData.email,
      password: hashPassword,
      username: rawUserData.username,
      gender: rawUserData.gender,
      phone: rawUserData.phone,
      groupId: group._id,
      avatar: "",
      address: "",
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

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword); //true or false
};

const handleUserLogin = async (rawData) => {
  try {
    let user = await db.accounts.findOne({
      $or: [{ email: rawData.valueLogin }, { username: rawData.valueLogin }],
    });

    if (user) {
      let isCorrectPassword = await checkPassword(
        rawData.password,
        user.password
      );

      if (isCorrectPassword === true) {
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
          EM: "ok!",
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
      }
    }

    return {
      EM: "Your email/phone or password is incorrect",
      EC: 1,
      DT: "",
    };
  } catch (error) {
    console.log(">> check error: ", error);
    return {
      EM: "Something wrongs in service....",
      EC: -2,
    };
  }
};

module.exports = {
  registerNewUser,
  handleUserLogin,
  hashUserPassword,
  checkEmailExist,
  checkPhoneExist,
};
