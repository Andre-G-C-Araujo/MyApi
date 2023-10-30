const { Router, response } = require("express");

const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UserControllers = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const upload = multer(uploadConfig.MULTER);
const usersRoutes = Router();

const userAvatarController = new UserAvatarController();
const userControllers = new UserControllers();

usersRoutes.post("/", userControllers.create);
usersRoutes.put("/", ensureAuthenticated, userControllers.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

module.exports = usersRoutes;
