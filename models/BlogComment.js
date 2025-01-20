const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class BlogComment extends Model {}

BlogComment.init(
  {
    comment: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 500]
      }
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "blogComment",
    tableName: "BlogComment"
  }
);

module.exports = BlogComment;
