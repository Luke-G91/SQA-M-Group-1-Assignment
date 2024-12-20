const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class BlogComment extends Model {}

BlogComment.init(
  {
    blog_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "BlogComment",
    tableName: "BlogComment",
  },
);

module.exports = BlogComment;
