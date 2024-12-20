const setupViewEngine = require("../../setup/setupViewEngine.js");
const setupMiddleware = require("../../setup/setupMiddleware.js");
const setupRoutes = require("../../setup/setupRoutes.js");
const syncDatabase = require("../../setup/syncDatabase.js");

async function intializeTestServer(app, routes, sequelize) {
  setupViewEngine(app);
  setupMiddleware(app);
  setupRoutes(app, routes);

  await syncDatabase(sequelize, true);
}

module.exports = intializeTestServer;
