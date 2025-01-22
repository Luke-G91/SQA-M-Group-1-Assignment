const initTestServer = require("./utils/intializeUnitTestServer.js");
const blogController = require("../controllers/blogPostController.js");
const express = require("express");
const sequelize = require("../config/database.js");
const { BlogPost, User } = require("../models/index");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

jest.mock("../models/index");

beforeAll(async () => {
  const app = express();
  await initTestServer(app, sequelize);

  await User.create({
    firstName: "Test",
    lastName: "User",
    email: "test@user.com",
    displayName: "Test user",
    hashedPassword: "testpass",
  });
});

describe("Blog controller", () => {
  describe("getAllBlogPosts", () => {
    it("should return all blog posts with linked user information", async () => {
      const mockBlogs = [
        {
          id: 1,
          title: "Blog Post 1",
          content: "Content for blog post 1",
          userId: 1,
          User: { displayName: "JohnD" },
        },
        {
          id: 2,
          title: "Blog Post 2",
          content: "Content for blog post 2",
          userId: 2,
          User: { displayName: "JaneD" },
        },
      ];
      BlogPost.findAll.mockResolvedValue(mockBlogs);

      const result = await blogController.getAllBlogPosts();

      expect(result).toEqual(mockBlogs);
      expect(BlogPost.findAll).toHaveBeenCalledWith({
        include: User,
        where: {
          [Op.or]: [
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("title")),
              "LIKE",
              "%%"
            ),
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("content")),
              "LIKE",
              "%%"
            ),
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("user.displayName")),
              "LIKE",
              "%%"
            ),
          ],
        },
      });
    });

    it("should filter blog posts based on the search query", async () => {
      const mockBlogs = [
        {
          id: 1,
          title: "Filtered Blog",
          content: "This matches the search query",
          userId: 1,
          User: { displayName: "JohnD" },
        },
      ];
      BlogPost.findAll.mockResolvedValue(mockBlogs);

      const searchQuery = "filtered";
      const result = await blogController.getAllBlogPosts(searchQuery);

      expect(result).toEqual(mockBlogs);
      expect(BlogPost.findAll).toHaveBeenCalledWith({
        include: User,
        where: {
          [Op.or]: [
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("title")),
              "LIKE",
              `%${searchQuery.toLowerCase()}%`
            ),
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("content")),
              "LIKE",
              `%${searchQuery.toLowerCase()}%`
            ),
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("user.displayName")),
              "LIKE",
              `%${searchQuery.toLowerCase()}%`
            ),
          ],
        },
      });
    });

    it("should return an empty array if no blog posts match the search query", async () => {
      BlogPost.findAll.mockResolvedValue([]);

      const searchQuery = "nonexistent";
      const result = await blogController.getAllBlogPosts(searchQuery);

      expect(result).toEqual([]);
      expect(BlogPost.findAll).toHaveBeenCalledWith({
        include: User,
        where: {
          [Op.or]: [
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("title")),
              "LIKE",
              `%${searchQuery.toLowerCase()}%`
            ),
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("content")),
              "LIKE",
              `%${searchQuery.toLowerCase()}%`
            ),
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("user.displayName")),
              "LIKE",
              `%${searchQuery.toLowerCase()}%`
            ),
          ],
        },
      });
    });

    it("should throw an error if fetching blog posts fails", async () => {
      const error = new Error("Database error");
      BlogPost.findAll.mockRejectedValue(error);

      await expect(blogController.getAllBlogPosts()).rejects.toThrow(
        "Database error"
      );
    });
  });

  it("toggles like on a blog post", async () => {
    const blog = await blogController.createBlogPost({
      title: "Like Test Post",
      content: "Test Content"
    }, { id: 1 });

    const result = await blogController.toggleLike(blog.id, 1);
    expect(result.liked).toBe(true);
    expect(result.likeCount).toBe(1);

    const unlikeResult = await blogController.toggleLike(blog.id, 1);
    expect(unlikeResult.liked).toBe(false);
    expect(unlikeResult.likeCount).toBe(0);
  });

  it("adds a comment to a blog post", async () => {
    const blog = await blogController.createBlogPost({
      title: "Comment Test Post",
      content: "Test Content"
    }, { id: 1 });

    const comment = await blogController.addComment({
      comment: "Test comment",
      blogId: blog.id,
      userId: 1
    });

    expect(comment.comment).toBe("Test comment");
    expect(comment.blogId).toBe(blog.id);
    expect(comment.userId).toBe(1);
  });

  it("updates a comment", async () => {
    const blog = await blogController.createBlogPost({
      title: "Update Comment Test",
      content: "Test Content"
    }, { id: 1 });

    const comment = await blogController.addComment({
      comment: "Original comment",
      blogId: blog.id,
      userId: 1
    });

    const updatedComment = await blogController.updateComment(
      comment.id,
      1,
      "Updated comment"
    );

    expect(updatedComment.comment).toBe("Updated comment");
  });
});

afterAll(async () => {
  await sequelize.sync({ force: true });
});


