const BlogPost = require("./BlogPost")
const BlogLike = require("./BlogLike")
const BlogComment = require("./BlogComment")
const User = require("./User")


// Like Associations
// One to many association for BlogPost to BlogLike
BlogPost.hasMany(BlogLike, {
    foreignKey: 'blogId',
  });
BlogLike.belongsTo(BlogPost);

// One to many association for User to BlogLike
User.hasMany(BlogLike, {
    foreignKey: 'userId',
  });
BlogLike.belongsTo(User);

// Comment Associations
// One to many association for BlogPost to BlogComment
BlogPost.hasMany(BlogComment, {
    foreignKey: 'blogId',
  });
BlogComment.belongsTo(BlogPost);

// One to many association for User to BlogComment
User.hasMany(BlogComment, {
    foreignKey: 'userId',
  });
BlogComment.belongsTo(User);

// User Associations
// One to many association for User to BlogPost
User.hasMany(BlogPost, {
    foreignKey: 'userId',
  });
BlogPost.belongsTo(User);

