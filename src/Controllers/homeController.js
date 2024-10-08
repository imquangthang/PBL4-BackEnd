import userService from "../Services/userService";

const handleHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = async (req, res) => {
  let userList = await userService.getUserList();
  return res.render("user.ejs", { userList });
};

const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  userService.createNewUser(email, password, username);

  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
};

const getUpdateUserPage = async (req, res) => {
  let id = req.params.id;
  let user = await userService.getUserById(id);
  let userData = {};
  userData = user;

  return res.render("user-update.ejs", { userData });
};

const handleUpdateUser = async (req, res) => {
  let id = req.body.id;
  let email = req.body.email;
  let username = req.body.username;
  await userService.updateUserInfor(email, username, id);
  return res.redirect("/user");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUser,
};
