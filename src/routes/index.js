const { Router } = require("express");

const usersRouter = require("./users.routes");
const notesRouter = require("./notes.routes");
const tagsRouter = require("./tags.routes");
const sessionRouter = require("./sesssion.routes");

const routes = Router();

routes.use("/tags", tagsRouter);
routes.use("/users", usersRouter);
routes.use("/session", sessionRouter);
routes.use("/notes", notesRouter);

module.exports = routes;
