const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class BlogLike extends Model {}

BlogLike.init(
  {
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // remove once functionality is added
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // remove once functionality is added
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "BlogLike",
    tableName: "BlogLike",
  },
);

module.exports = BlogLike;

