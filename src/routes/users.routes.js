const { Router } = require("express");

const UserControllers = require("../controllers/UsersController");

const usersRoutes = Router();

const userControllers = new UserControllers();

usersRoutes.post("/", userControllers.create);
usersRoutes.put("/:id", userControllers.update);

module.exports = usersRoutes;
