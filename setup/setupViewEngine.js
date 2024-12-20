const path = require("path");

function setupViewEngine(app) {
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "pug");
}

module.exports = setupViewEngine;
