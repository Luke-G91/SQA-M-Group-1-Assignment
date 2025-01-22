const initTestServer = require("../utils/intializeUnitTestServer.js");
const blogController = require("../../controllers/blogPostController.js");
const express = require("express");
const sequelize = require("../../config/database.js");
const { User, BlogPost } = require("../../models/index.js");

jest.mock("../../models/index.js");

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
});

afterAll(async () => {
  await sequelize.sync({ force: true });
});
