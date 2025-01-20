const { BlogPost, User } = require("../models/index");
const { Op } = require("sequelize")

exports.getAllBlogPosts = async (searchQuery) => {
  try {
    const blogs = await BlogPost.findAll({
      include: User,
      where: {
        title: {
          [Op.iLike]: `%${searchQuery}%`, // Case-insensitive search
        },
      },
    });
    
    return blogs;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
};

exports.getBlogStats = async () => {
  const posts = await this.getAllBlogPosts();
  const lengths = posts.map((post) => post.title.length + post.content.length);
  const stats = {
    average_length: lengths.reduce((a, b) => a + b, 0) / lengths.length,
    median_length: lengths.sort((a, b) => a - b)[
      Math.floor(lengths.length / 2)
    ],
    max_length: Math.max(...lengths),
    min_length: Math.min(...lengths),
    total_length: lengths.reduce((a, b) => a + b, 0),
  };
  return stats;
};

exports.createBlogPost = async (blog, user) => {
  try {
    const newPost = await BlogPost.create({
      title: blog.title,
      content: blog.content,
      likes: blog.likes || 0,
      userId: user.id,
    });

    console.log("Blog post created successfully:", newPost);
    return newPost;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      console.error("Validation errors:", error.errors);
    } else {
      console.error("Error creating blog post:", error);
    }
    throw error;
  }
};

exports.getBlogPostById = async (id) => {
  try {
    const post = await BlogPost.findByPk(id, { include: User });
    return post;
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    throw error;
  }
};

exports.updatePostById = async (id, updateData) => {
  try {
    const post = await this.getBlogPostById(id);
    if (post) {
      await post.update(updateData);
      return post;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error updating post with id ${id}:`, error);
    throw error;
  }
};

exports.deletePostById = async (id) => {
  try {
    const post = await this.getBlogPostById(id);
    await post.destroy();
    return !!post;
  } catch (error) {
    console.error(`Error updating post with id ${id}:`, error);
  }
};
