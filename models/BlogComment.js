const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class BlogComment extends Model {}

BlogComment.init(
  {
    blogId: {
      type: DataTypes.INTEGER(),
      // remove once functionality is added
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER(),
      // remove once functionality is added
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "blogComment",
    tableName: "BlogComment",
  },
);

module.exports = BlogComment;
