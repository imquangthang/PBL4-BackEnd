import express from "express";
const router = express.Router();
import apiController from "../Controllers/apiController.js";
import userController from "../Controllers/userController.js";
import roleController from "../Controllers/roleController.js";
import hospitalController from "../Controllers/hospitalController.js";
import doctorController from "../Controllers/doctorController.js";
import messageController from "../Controllers/messageController.js";
import { checkUserJWT, checkUserPermission } from "../Middleware/JWTActions.js";

const initWedRoutes = (app) => {
  app.use(express.json());
  // router.all("*", checkUserJWT, checkUserPermission);
  router.all("*", checkUserJWT);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.post("/logout", apiController.handleLogout);
  // user routes
  router.get("/account", userController.getUserAccount);
  router.post("/user/read-info-userIds", userController.getUserByIDs);
  router.post("/user/create", userController.createHospital);
  router.put("/user/update", userController.updateUser);
  router.delete("/user/delete", userController.deleteFunc);
  router.get("/user/read", userController.readFunc);
  router.get("/group/read", userController.readGroupFunc);
  router.get("/hospital/read", userController.readHospitalFunc);
  router.post("/user/create-healthRecord", userController.createHealthRecord);
  router.get(
    "/user/history-healthRecord",
    userController.getHealthRecordByUser
  );
  router.get(
    "/user/history-healthRecord/:id",
    userController.getHealthRecordByAdmin
  );
  router.post("/user/create-appointment", userController.createAppointment);
  router.get("/user/statistic/:id", userController.getStatisticWithId);
  // roles routes
  router.get("/role/read", roleController.readFunc);
  router.get("/role/read-roles", roleController.readAllRoles);
  router.post("/role/create", roleController.createFunc);
  router.put("/role/update", roleController.updateFunc);
  router.delete("/role/delete", roleController.deleteFunc);
  router.get("/role/by-group/:groupId", roleController.getRoleByGroup);
  router.post("/role/assign-to-group", roleController.assignRoleToGroup);

  // hospital routes
  router.post("/hospital/create-faculty", hospitalController.createFaculty);
  router.get("/hospital/read-faculty", hospitalController.readFacultyFunc);
  router.put(
    "/hospital/update-faculty",
    hospitalController.updateCurrentFaculty
  );
  router.get("/hospital/read-faculty", hospitalController.readFacultyFunc);
  router.post("/hospital/create-doctor", hospitalController.createDoctor);
  router.get("/hospital/read-doctor", hospitalController.readDoctor);
  router.post("/hospital/create-staff", hospitalController.createStaff);
  router.get("/hospital/read-staff", hospitalController.readStaff);
  router.get(
    "/hospital/read-medicalRecord",
    hospitalController.getMedicalRecord
  );

  //doctor routes
  router.get("/doctor/read-medicalRecord", doctorController.getMedicalRecord);
  router.get("/doctor/read-doctor", doctorController.readDoctor);
  router.get(
    "/doctor/read-appointment",
    doctorController.getAppointmentByDoctor
  );
  router.put("/doctor/update-appointment", doctorController.updateAppointment);
  router.post(
    "/doctor/create-medicalRecord",
    doctorController.createMedicalRecord
  );

  //message routes
  router.get("/messages", messageController.getAllMessage);
  router.get("/messages/read-user", messageController.fetchAllUsersChatting);
  router.post("/messages/send", messageController.sendMessage);

  // Staff API
  router.get("/staff/read-patient", userController.readFunc);


  //   router.put("/change-pass", apiController.handleChangePass);
  // rest API
  // GET - R, POST - C, PUT - U, DELETE - D

  return app.use("/api/v1/", router);
};

export default initWedRoutes;
