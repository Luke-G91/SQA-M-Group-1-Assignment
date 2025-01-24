const { Sequelize } = require("sequelize");
const path = require("path");

require("dotenv").config();

const env = process.env.NODE_ENV;
let sequelize = null;

if (env === "test") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
} else if (env === "local") {
  // use SQLite database for local environment
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "..", "database.sqlite"),
    logging: false,
  });
} else {
  const connectionString = process.env.DATABASE_URL;
  // validate connection string is provide
  // app cannot run without a database connection
  if (!connectionString) {
    console.log("No connection string provided");
    throw new ReferenceError(
      "Environment variable DATABASE_URL is not defined.",
    );
  }
  // connect sequelize to the datbase
  sequelize = new Sequelize(connectionString);
}

module.exports = sequelize;
