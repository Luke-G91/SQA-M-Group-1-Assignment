const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class BlogPost extends Model {}

BlogPost.init(
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likeCount: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      defaultValue: 0,
    },
    commentCount: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE(),
      allowNull: false,
      defaultValue: Date.now(),
    },
  },
  {
    sequelize,
    modelName: "blogPost",
    tableName: "BlogPost",
  },
);

module.exports = BlogPost;
