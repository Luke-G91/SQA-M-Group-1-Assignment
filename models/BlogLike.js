const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class BlogLike extends Model {}

BlogLike.init(
  {
    blogId: {
      type: DataTypes.INTEGER,
      // remove once functionality is added
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      // remove once functionality is added
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "blogLike",
    tableName: "BlogLike",
  },
);

module.exports = BlogLike;
