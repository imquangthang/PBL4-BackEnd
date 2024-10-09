import express from "express";
const router = express.Router();
import apiController from "../Controllers/apiController";

const initWedRoutes = (app) => {
  app.use(express.json());
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.post("/logout", apiController.handleLogout);
  //   router.put("/change-pass", apiController.handleChangePass);
  // rest API
  // GET - R, POST - C, PUT - U, DELETE - D

  return app.use("/api/v1/", router);
};

export default initWedRoutes;
