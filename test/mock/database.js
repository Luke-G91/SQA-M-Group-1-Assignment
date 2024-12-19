const { Sequelize } = require("sequelize");
const path = require("path");

async function mockDatabase() {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "../..", "database.sqlite"),
  });
  await sequelize.sync();
  return sequelize;
}

module.exports = mockDatabase;
