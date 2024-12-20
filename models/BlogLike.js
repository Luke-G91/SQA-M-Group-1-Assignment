const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class BlogLike extends Model {}

BlogLike.init(
  {
    
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
    tableName: "BlogLike", 
   
  },
);

module.exports = BlogLike;