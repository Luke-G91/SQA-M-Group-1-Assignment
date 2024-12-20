async function syncDatabase(sequelize, force = false) {
  try {
    await sequelize.sync({ force: force });
    console.log("Database synchronized");
  } catch (error) {
    console.error("Failed to sync database:", error);
    process.exit(1);
  }
}

module.exports = syncDatabase;
