const express = require("express");
const indexRouter = require("./routers/indexRouter.js");
const blogRouter = require("./routers/blogRouter.js");
const sequelize = require("./config/database.js");
const setupViewEngine = require("./setup/setupViewEngine.js");
const setupMiddleware = require("./setup/setupMiddleware.js");
const setupRoutes = require("./setup/setupRoutes.js");
const syncDatabase = require("./setup/syncDatabase.js");
const startServer = require("./setup/startServer.js");

async function initializeServer(app, port) {
  setupViewEngine(app);
  setupMiddleware(app);
  setupRoutes(app, [
    { basePath: "/", router: indexRouter },
    { basePath: "/blog", router: blogRouter },
  ]);

  await syncDatabase(sequelize);
  startServer(app, port);
}

const app = express();
const port = process.env.PORT || 3000;

initializeServer(app, port);
