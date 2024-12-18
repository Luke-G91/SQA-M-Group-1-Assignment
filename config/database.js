const { Sequelize } = require('sequelize');

require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.log('No connection string provided');
  throw new ReferenceError('Environment variable DATABASE_URL is not defined.');
}

const sequelize = new Sequelize(process.env.DATABASE_URL);

module.exports = sequelize;
