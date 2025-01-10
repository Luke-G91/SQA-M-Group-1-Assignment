const flash = require("connect-flash");

function setupFlash(app) {
  app.use(flash());
}

module.exports = setupFlash;
