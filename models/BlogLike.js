const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class BlogLike extends Model {}

BlogLike.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "BlogLike",
    tableName: "BlogLikes", 
   
  },
);

module.exports = BlogLike;