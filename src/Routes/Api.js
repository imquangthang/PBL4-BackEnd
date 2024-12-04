import express from "express";
const router = express.Router();
import apiController from "../Controllers/apiController";
import userController from "../Controllers/userController";
import roleController from "../Controllers/roleController";
import { checkUserJWT, checkUserPermission } from "../Middleware/JWTActions";

const initWedRoutes = (app) => {
  app.use(express.json());
  // router.all("*", checkUserJWT, checkUserPermission);
  router.all("*", checkUserJWT);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.post("/logout", apiController.handleLogout);
  // user routes
  router.get("/account", userController.getUserAccount);
  router.put("/user/update", userController.updateUser);
  router.get("/user/read", userController.readFunc);
  router.get("/group/read", userController.readGroupFunc);
  router.post("/user/create-healthRecord", userController.createHealthRecord);
  router.get(
    "/user/history-healthRecord",
    userController.getHealthRecordByUser
  );
  // roles routes
  router.get("/role/read", roleController.readFunc);
  router.get("/role/read-roles", roleController.readAllRoles);
  router.post("/role/create", roleController.createFunc);
  router.put("/role/update", roleController.updateFunc);
  router.delete("/role/delete", roleController.deleteFunc);
  router.get("/role/by-group/:groupId", roleController.getRoleByGroup);
  router.post("/role/assign-to-group", roleController.assignRoleToGroup);

  //   router.put("/change-pass", apiController.handleChangePass);
  // rest API
  // GET - R, POST - C, PUT - U, DELETE - D

  return app.use("/api/v1/", router);
};

export default initWedRoutes;
