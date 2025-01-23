const { Op, Sequelize } = require("sequelize");
const { BlogPost, User, BlogLike, BlogComment } = require("../models/index");

// Fetches blog posts based on a search query. The search is case-insensitive and checks for matches
// in the title, content, or user's display name of the blog posts.
// The `BlogPost.findAll` method is used to query the database, and it includes the associated `User`
exports.getAllBlogPosts = async (searchQuery = "") => {
  try {
    // returns all blogs, with the linked user (using userId) added in the response
    const blogs = await BlogPost.findAll({
      include: User,
      where: {
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("title")),
            "LIKE",
            `%${searchQuery.toLowerCase()}%`,
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("content")),
            "LIKE",
            `%${searchQuery.toLowerCase()}%`,
          ),
          Sequelize.where(
            Sequelize.fn("LOWER", Sequelize.col("user.displayName")),
            "LIKE",
            `%${searchQuery.toLowerCase()}%`,
          ),
        ],
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

exports.getBlogPostById = async (id, userId) => {
  try {
    const post = await BlogPost.findByPk(id, {
      include: [
        User,
        {
          model: BlogComment,
          as: "comments",
          include: [
            {
              model: User,
              attributes: ["displayName"],
            },
          ],
          separate: true,
          order: [["createdAt", "DESC"]],
        },
      ],
    });

    if (post && userId) {
      const like = await BlogLike.findOne({ where: { blogId: id, userId } });
      post.dataValues.liked = !!like;
    } else {
      post.dataValues.liked = false;
    }
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
    // return true if the post is found and deleted, else false
    return !!post;
  } catch (error) {
    console.error(`Error updating post with id ${id}:`, error);
  }
};

exports.toggleLike = async (postId, userId) => {
  try {
    // Check if the user has already liked the post
    const like = await BlogLike.findOne({ where: { blogId: postId, userId } });
    let liked;
    if (like) {
      // If liked, remove the like and decrement the like count
      await like.destroy();
      await BlogPost.decrement("likeCount", { where: { id: postId } });
      liked = false;
    } else {
      // If not liked, add the like and increment the like count
      await BlogLike.create({ blogId: postId, userId });
      await BlogPost.increment("likeCount", { where: { id: postId } });
      liked = true;
    }
    // Fetch the updated post to get the new like count
    const post = await BlogPost.findByPk(postId);
    return { liked, likeCount: post.likeCount };
  } catch (error) {
    console.error(`Error toggling like for post with id ${postId}:`, error);
    throw error;
  }
};

exports.addComment = async (commentData) => {
  try {
    // Basic validation
    if (!commentData || typeof commentData.comment !== "string") {
      console.log("Invalid comment data received:", commentData);
      throw new Error("Comment text is required");
    }

    const trimmedComment = commentData.comment.trim();
    if (!trimmedComment) {
      throw new Error("Comment cannot be empty");
    }

    if (trimmedComment.length > 500) {
      throw new Error("Comment cannot exceed 500 characters");
    }

    // Create the comment
    const newComment = await BlogComment.create({
      comment: trimmedComment,
      blogId: commentData.blogId,
      userId: commentData.userId,
    });

    // Update comment count
    await BlogPost.increment("commentCount", {
      where: { id: commentData.blogId },
    });

    // Return with user info
    const commentWithUser = await BlogComment.findByPk(newComment.id, {
      include: [
        {
          model: User,
          attributes: ["displayName"],
        },
      ],
    });

    return commentWithUser;
  } catch (error) {
    console.error("Error in addComment:", error);
    throw error;
  }
};

exports.updateComment = async (commentId, userId, updatedComment) => {
  try {
    if (!updatedComment) {
      throw new Error("Comment cannot be empty");
    }

    const existingComment = await BlogComment.findByPk(commentId);
    if (!existingComment || existingComment.userId !== userId) {
      throw new Error("Cannot update comment with id:", commentId);
    }

    existingComment.comment = updatedComment;
    await existingComment.save();
    return existingComment;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};
