const BlogPost = require("../models/BlogPost.js");

exports.getAllBlogPosts = async () => {
  try {
    return await BlogPost.findAll();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
};

exports.createBlogPost = async (blog) => {
  try {
    const newPost = await BlogPost.create({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      likes: blog.likes || 0,
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
