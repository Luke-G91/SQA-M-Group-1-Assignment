const express = require("express");
const sequelize = require("./config/database.js");
const passport = require("passport");

const setupViewEngine = require("./setup/setupViewEngine.js");
const setupMiddleware = require("./setup/setupMiddleware.js");
const setupRoutes = require("./setup/setupRoutes.js");
const syncDatabase = require("./setup/syncDatabase.js");
const startServer = require("./setup/startServer.js");
const setupAuth = require("./setup/setupAuth.js");
const setupFlash = require("./setup/setupFlash.js");

const indexRouter = require("./routers/indexRouter.js");
const blogRouter = require("./routers/blogRouter.js");
const authRouter = require("./routers/authRouter.js");

async function initializeServer(app, port, passport, session) {
  setupViewEngine(app);
  setupMiddleware(app);
  setupAuth(app, session, passport);
  setupFlash(app);
  setupRoutes(app, [
    { basePath: "/", router: indexRouter },
    { basePath: "/", router: authRouter },
    { basePath: "/blog", router: blogRouter },
  ]);

  await syncDatabase(sequelize);
  startServer(app, port);
}

const app = express();
const port = process.env.PORT || 3000;
const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false,
};

initializeServer(app, port, passport, session);
