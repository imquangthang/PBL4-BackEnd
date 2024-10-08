import express from "express";
const router = express.Router();
import homeControllor from "../Controllers/homeController";

const initWedRoutes = (app) => {
  router.get("/", homeControllor.handleHelloWorld);
  router.get("/user", homeControllor.handleUserPage);
  router.post("/users/create-user", homeControllor.handleCreateNewUser);
  router.post("/delete-user/:id", homeControllor.handleDeleteUser);
  router.get("/update-user/:id", homeControllor.getUpdateUserPage);
  router.post("/user/update-user", homeControllor.handleUpdateUser);

  // rest API
  // GET - R, POST - C, PUT - U, DELETE - D

  return app.use("/", router);
};

export default initWedRoutes;
