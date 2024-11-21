import express from "express";
const router = express.Router();
import apiController from "../Controllers/apiController";
import userController from "../Controllers/userController";
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

  //   router.put("/change-pass", apiController.handleChangePass);
  // rest API
  // GET - R, POST - C, PUT - U, DELETE - D

  return app.use("/api/v1/", router);
};

export default initWedRoutes;
