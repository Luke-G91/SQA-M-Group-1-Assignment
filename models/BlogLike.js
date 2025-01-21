const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class BlogLike extends Model {}

BlogLike.init(
  {
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "BlogPost",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "blogLike",
    tableName: "BlogLike",
  },
);

module.exports = BlogLike;
