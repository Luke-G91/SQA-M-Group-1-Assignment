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
});

afterAll(async () => {
  await sequelize.sync({ force: true });
});


