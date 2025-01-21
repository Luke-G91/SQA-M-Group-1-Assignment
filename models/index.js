const BlogPost = require("./BlogPost");
const BlogLike = require("./BlogLike");
const BlogComment = require("./BlogComment");
const User = require("./User");

// Define associations
User.hasMany(BlogPost, { foreignKey: "userId" });
BlogPost.belongsTo(User, { foreignKey: "userId" });

User.belongsToMany(BlogPost, {
  through: BlogLike,
  foreignKey: "userId",
  otherKey: "blogId",
});
BlogPost.belongsToMany(User, {
  through: BlogLike,
  foreignKey: "blogId",
  otherKey: "userId",
});

BlogLike.belongsTo(User, { foreignKey: "userId" });
BlogLike.belongsTo(BlogPost, { foreignKey: "blogId" });

// Comment Associations
// One to many association for BlogPost to BlogComment
BlogPost.hasMany(BlogComment, {
  foreignKey: "blogId",
});
BlogComment.belongsTo(BlogPost);

// One to many association for User to BlogComment
User.hasMany(BlogComment, {
  foreignKey: "userId",
});
BlogComment.belongsTo(User);

module.exports = {
  User,
  BlogPost,
  BlogLike,
  BlogComment,
};
