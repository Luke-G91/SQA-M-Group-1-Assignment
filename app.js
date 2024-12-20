const express = require("express");
const path = require("path");
const indexRouter = require("./routers/indexRouter.js");
const blogRouter = require("./routers/blogRouter.js");
const sequelize = require("./config/database.js");

const app = express();
const port = process.env.PORT || 3000;

function setupViewEngine(app) {
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "pug");
}

function setupMiddleware(app) {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));
}

function setupRoutes(app, routers) {
  for (const router of routers) {
    app.use(router.basePath, router.router);
  }
}

function startServer() {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

async function syncDatabase() {
  try {
    await sequelize.sync();
    console.log("Database synchronized");
  } catch (error) {
    console.error("Failed to sync database:", error);
    process.exit(1);
  }
}

async function initializeServer() {
  setupViewEngine(app);
  setupMiddleware(app);
  setupRoutes(app, [
    { basePath: "/", router: indexRouter },
    { basePath: "/blog", router: blogRouter },
  ]);

  await syncDatabase();
  startServer();
}

initializeServer();
