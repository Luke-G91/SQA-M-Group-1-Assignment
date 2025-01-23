const initTestServer = require("../utils/intializeUnitTestServer.js");
const blogController = require("../../controllers/blogPostController.js");
const express = require("express");
const sequelize = require("../../config/database.js");
const { BlogPost, User, BlogLike, BlogComment } = require("../../models/index");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

jest.mock("../../models/index");

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
              "%%",
            ),
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("content")),
              "LIKE",
              "%%",
            ),
            Sequelize.where(
              Sequelize.fn("LOWER", Sequelize.col("user.displayName")),
              "LIKE",
              "%%",
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
    });

    it("should throw an error if fetching blog posts fails", async () => {
      const error = new Error("Database error");
      BlogPost.findAll.mockRejectedValue(error);

      await expect(blogController.getAllBlogPosts()).rejects.toThrow(
        "Database error",
      );
    });
  });

  describe("toggleLike", () => {
    it("should like a post if not already liked", async () => {
      const mockPost = { id: 1, likeCount: 0 };
      BlogPost.findByPk.mockImplementation(() => Promise.resolve(mockPost));
      BlogLike.findOne.mockResolvedValue(null);
      BlogLike.create.mockResolvedValue({});
      BlogPost.increment.mockImplementation((field, options) => {
        if (field === "likeCount" && options.where.id === 1) {
          mockPost.likeCount += 1;
        }
        return Promise.resolve();
      });

      const result = await blogController.toggleLike(1, 1);

      expect(result).toEqual({ liked: true, likeCount: 1 });
      expect(BlogLike.create).toHaveBeenCalledWith({ blogId: 1, userId: 1 });
      expect(BlogPost.increment).toHaveBeenCalledWith("likeCount", {
        where: { id: 1 },
      });
    });

    it("should unlike a post if already liked", async () => {
      const mockPost = { id: 1, likeCount: 1 };
      const mockLike = { destroy: jest.fn() };
      BlogPost.findByPk.mockImplementation(() => Promise.resolve(mockPost));
      BlogLike.findOne.mockResolvedValue(mockLike);
      BlogPost.decrement.mockImplementation((field, options) => {
        if (field === "likeCount" && options.where.id === 1) {
          mockPost.likeCount -= 1;
        }
        return Promise.resolve();
      });

      jest.spyOn(mockLike, "destroy");

      const result = await blogController.toggleLike(1, 1);

      expect(result).toEqual({ liked: false, likeCount: 0 });
      expect(mockLike.destroy).toHaveBeenCalled();
      expect(BlogPost.decrement).toHaveBeenCalledWith("likeCount", {
        where: { id: 1 },
      });
    });

    it("should throw an error if toggling like fails", async () => {
      const error = new Error("Database error");
      BlogLike.findOne.mockRejectedValue(error);

      await expect(blogController.toggleLike(1, 1)).rejects.toThrow(
        "Database error",
      );
    });
  });

  describe("addComment", () => {
    it("should add a comment to a post", async () => {
      const mockComment = {
        id: 1,
        comment: "Nice post!",
        blogId: 1,
        userId: 1,
        User: { displayName: "TestUser" },
      };
      BlogComment.create.mockResolvedValue(mockComment);
      BlogPost.increment.mockResolvedValue();
      BlogComment.findByPk.mockResolvedValue(mockComment);

      const result = await blogController.addComment({
        comment: "Nice post!",
        blogId: 1,
        userId: 1,
      });

      expect(result).toEqual(mockComment);
      expect(BlogComment.create).toHaveBeenCalledWith({
        comment: "Nice post!",
        blogId: 1,
        userId: 1,
      });
      expect(BlogPost.increment).toHaveBeenCalledWith("commentCount", {
        where: { id: 1 },
      });
    });

    it("should throw an error if adding a comment fails", async () => {
      const error = new Error("Database error");
      BlogComment.create.mockRejectedValue(error);

      await expect(
        blogController.addComment({
          comment: "Nice post!",
          blogId: 1,
          userId: 1,
        }),
      ).rejects.toThrow("Database error");
    });
  });

  describe("updateComment", () => {
    it("should update a comment", async () => {
      const mockComment = {
        id: 1,
        comment: "Updated comment",
        userId: 1,
        save: jest.fn(),
      };
      BlogComment.findByPk.mockResolvedValue(mockComment);

      const result = await blogController.updateComment(
        1,
        1,
        "Updated comment",
      );

      expect(result).toEqual(mockComment);
      expect(mockComment.save).toHaveBeenCalled();
    });

    it("should throw an error if updating a comment fails", async () => {
      const error = new Error("Database error");
      BlogComment.findByPk.mockRejectedValue(error);

      await expect(
        blogController.updateComment(1, 1, "Updated comment"),
      ).rejects.toThrow("Database error");
    });
  });

  describe("createBlogPost", () => {
    it("should create a new blog post for a valid user", async () => {
      const blogToCreate = {
        title: "test title",
        content: "test content",
      };

      const user = { id: 1 };
      BlogPost.create.mockResolvedValue({
        id: 1,
        ...blogToCreate,
        userId: user.id,
      });

      const createdBlog = await blogController.createBlogPost(
        blogToCreate,
        user,
      );

      expect(createdBlog.title).toBe(blogToCreate.title);
      expect(createdBlog.userId).toBe(user.id);
    });
  });

  describe("getBlogStats", () => {
    it("should return correct blog statistics", async () => {
      const mockBlogs = [
        { title: "Blog Post 1", content: "Content for blog post 1" },
        { title: "Blog Post 2", content: "Content for blog post 2" },
        { title: "Blog Post 3", content: "Content for blog post 3" },
      ];
      BlogPost.findAll.mockResolvedValue(mockBlogs);

      const stats = await blogController.getBlogStats();

      expect(stats.average_length).toBeGreaterThan(0);
      expect(stats.median_length).toBeGreaterThan(0);
      expect(stats.max_length).toBeGreaterThan(0);
      expect(stats.min_length).toBeGreaterThan(0);
      expect(stats.total_length).toEqual(
        mockBlogs.reduce(
          (total, blog) => total + blog.title.length + blog.content.length,
          0,
        ),
      );
    });
  });

  describe("getBlogPostById", () => {
    it("should return a blog post by ID with comments and likes information", async () => {
      const mockPost = {
        id: 1,
        title: "Blog Post",
        content: "Content",
        User: { displayName: "JohnD" },
        comments: [],
        dataValues: {},
      };
      BlogPost.findByPk.mockResolvedValue(mockPost);
      BlogLike.findOne.mockResolvedValue(null);

      const post = await blogController.getBlogPostById(1, 1);

      expect(post).toEqual(mockPost);
      expect(post.dataValues.liked).toBe(false);
    });

    it("should throw an error if fetching the post fails", async () => {
      const error = new Error("Database error");
      BlogPost.findByPk.mockRejectedValue(error);

      await expect(blogController.getBlogPostById(1)).rejects.toThrow(
        "Database error",
      );
    });
  });

  describe("updatePostById", () => {
    it("should update a blog post by ID", async () => {
      const mockPost = {
        id: 1,
        title: "Old Title",
        update: jest.fn().mockResolvedValue(),
      };
      blogController.getBlogPostById = jest.fn().mockResolvedValue(mockPost);

      const updatedPost = await blogController.updatePostById(1, {
        title: "New Title",
      });

      expect(updatedPost).toEqual(mockPost);
      expect(mockPost.update).toHaveBeenCalledWith({ title: "New Title" });
    });

    it("should throw an error if updating the post fails", async () => {
      const error = new Error("Database error");
      blogController.getBlogPostById = jest.fn().mockRejectedValue(error);

      await expect(
        blogController.updatePostById(1, { title: "New Title" }),
      ).rejects.toThrow("Database error");
    });
  });

  describe("deletePostById", () => {
    it("should delete a blog post by ID", async () => {
      const mockPost = {
        id: 1,
        destroy: jest.fn().mockResolvedValue(),
      };
      blogController.getBlogPostById = jest.fn().mockResolvedValue(mockPost);

      const result = await blogController.deletePostById(1);

      expect(result).toBe(true);
      expect(mockPost.destroy).toHaveBeenCalled();
    });

    it("should return false if the post does not exist", async () => {
      blogController.getBlogPostById = jest.fn().mockResolvedValue(null);

      const result = await blogController.deletePostById(1);

      expect(result).toBe(false);
    });
  });
});

afterAll(async () => {
  await sequelize.sync({ force: true });
});
