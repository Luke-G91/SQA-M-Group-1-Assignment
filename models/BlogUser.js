const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class BlogUser extends Model {}

BlogComment.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    displayName: {
      type: DataTypes.STRING(255),
      allowNull: true, 
    },
    hashedPassword: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.TEXT, 
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    
      sequelize,
      modelName: "BlogUser",
      tableName: "BlogUser",
    
  }
);

module.exports = BlogUser;
