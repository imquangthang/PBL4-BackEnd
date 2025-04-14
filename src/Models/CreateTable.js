import mongoose from "mongoose";
import Accounts from "./Accounts.js";
import Groups from "./Groups.js";
import Roles from "./Roles.js";
import Group_Role from "./Group_Role.js";
import HealthRecord from "./HealthRecord.js";
import Faculty from "./Faculty.js";
import Appointment from "./Appointment.js";
import MedicalRecord from "./MedicalRecord.js";

const createTableAccounts = async () => {
  await Accounts.createCollection()
    .then(() => {
      console.log('Collection "accounts" đã được tạo trong MongoDB');
      mongoose.disconnect(); // Ngắt kết nối sau khi hoàn tất
    })
    .catch((err) => {
      console.error("Lỗi khi tạo collection:", err);
      mongoose.disconnect(); // Ngắt kết nối nếu có lỗi
    });
};

const createTableGroups = async () => {
  await Groups.createCollection()
    .then(() => {
      console.log('Collection "Groups" đã được tạo trong MongoDB');
      mongoose.disconnect(); // Ngắt kết nối sau khi hoàn tất
    })
    .catch((err) => {
      console.error("Lỗi khi tạo collection:", err);
      mongoose.disconnect(); // Ngắt kết nối nếu có lỗi
    });
};

const createTableRoles = async () => {
  await Roles.createCollection()
    .then(() => {
      console.log('Collection "Roles" đã được tạo trong MongoDB');
      mongoose.disconnect(); // Ngắt kết nối sau khi hoàn tất
    })
    .catch((err) => {
      console.error("Lỗi khi tạo collection:", err);
      mongoose.disconnect(); // Ngắt kết nối nếu có lỗi
    });
};

const createTableGroup_Role = async () => {
  await Group_Role.createCollection()
    .then(() => {
      console.log('Collection "Group_Role" đã được tạo trong MongoDB');
      mongoose.disconnect(); // Ngắt kết nối sau khi hoàn tất
    })
    .catch((err) => {
      console.error("Lỗi khi tạo collection:", err);
      mongoose.disconnect(); // Ngắt kết nối nếu có lỗi
    });
};

const createTableHealthRecord = async () => {
  await HealthRecord.createCollection()
    .then(() => {
      console.log('Collection "HealthRecord" đã được tạo trong MongoDB');
      mongoose.disconnect(); // Ngắt kết nối sau khi hoàn tất
    })
    .catch((err) => {
      console.error("Lỗi khi tạo collection:", err);
      mongoose.disconnect(); // Ngắt kết nối nếu có lỗi
    });
};

const createTableFaculty = async () => {
  await Faculty.createCollection()
    .then(() => {
      console.log('Collection "Faculty" đã được tạo trong MongoDB');
      mongoose.disconnect(); // Ngắt kết nối sau khi hoàn tất
    })
    .catch((err) => {
      console.error("Lỗi khi tạo collection:", err);
      mongoose.disconnect(); // Ngắt kết nối nếu có lỗi
    });
};

const createTableAppointment = async () => {
  await Faculty.createCollection()
    .then(() => {
      console.log('Collection "Appointment" đã được tạo trong MongoDB');
      mongoose.disconnect(); // Ngắt kết nối sau khi hoàn tất
    })
    .catch((err) => {
      console.error("Lỗi khi tạo collection:", err);
      mongoose.disconnect(); // Ngắt kết nối nếu có lỗi
    });
};

const createTableMedicalRecord = async () => {
  await Faculty.createCollection()
    .then(() => {
      console.log('Collection "MedicalRecord" đã được tạo trong MongoDB');
      mongoose.disconnect(); // Ngắt kết nối sau khi hoàn tất
    })
    .catch((err) => {
      console.error("Lỗi khi tạo collection:", err);
      mongoose.disconnect(); // Ngắt kết nối nếu có lỗi
    });
};

export {
  createTableAccounts,
  createTableGroups,
  createTableRoles,
  createTableGroup_Role,
  createTableHealthRecord,
  createTableFaculty,
  createTableAppointment,
  createTableMedicalRecord,
};
