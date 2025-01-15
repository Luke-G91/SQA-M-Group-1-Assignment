const { Sequelize } = require("sequelize");
const path = require("path");

require("dotenv").config();

const env = process.env.NODE_ENV;
let sequelize = null;

if (env === "test" || env === "dev") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "..", "database.sqlite"),
  });
} else {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.log("No connection string provided");
    throw new ReferenceError(
      "Environment variable DATABASE_URL is not defined.",
    );
  }
  sequelize = new Sequelize(connectionString);
}

module.exports = sequelize;
