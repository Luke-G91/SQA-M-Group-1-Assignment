const setupMiddleware = require("../../setup/setupMiddleware.js");
const syncDatabase = require("../../setup/syncDatabase.js");

async function intializeUnitTestServer(app, sequelize) {
  setupMiddleware(app);

  await syncDatabase(sequelize, true);
}

module.exports = intializeUnitTestServer;
