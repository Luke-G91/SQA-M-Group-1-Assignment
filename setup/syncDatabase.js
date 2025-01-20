async function syncDatabase(sequelize, force = false) {
  try {
    // sync database, if force is true the existing data will be overriden
    await sequelize.sync({ force: force });
    console.log("Database synchronized");
  } catch (error) {
    console.error("Failed to sync database:", error);
    process.exit(1);
  }
}

module.exports = syncDatabase;
