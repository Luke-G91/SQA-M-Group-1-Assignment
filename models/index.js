const BlogPost = require("./BlogPost");
const BlogLike = require("./BlogLike");
const BlogComment = require("./BlogComment");
const User = require("./User");

// Define associations
User.hasMany(BlogPost, { foreignKey: 'userId' });
BlogPost.belongsTo(User, { foreignKey: 'userId' });

// Like associations
User.belongsToMany(BlogPost, { through: BlogLike, foreignKey: 'userId', otherKey: 'blogId' });
BlogPost.belongsToMany(User, { through: BlogLike, foreignKey: 'blogId', otherKey: 'userId' });

BlogLike.belongsTo(User, { foreignKey: 'userId' });
BlogLike.belongsTo(BlogPost, { foreignKey: 'blogId' });

// Comment associations
BlogPost.hasMany(BlogComment, {
  foreignKey: 'blogId',
  as: 'comments'
});
BlogComment.belongsTo(BlogPost, {
  foreignKey: 'blogId'
});

User.hasMany(BlogComment, {
  foreignKey: 'userId'
});
BlogComment.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = {
  User,
  BlogPost,
  BlogLike,
  BlogComment,
};
