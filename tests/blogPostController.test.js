const initTestServer = require("./utils/intializeUnitTestServer.js");
const blogController = require("../controllers/blogPostController.js");
const express = require("express");
const sequelize = require("../config/database.js");
const { User } = require("../models/index.js");

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
  it("creates a new blog", async () => {
    const blogToCreate = {
      title: "test title",
      content: "test content",
    };

    const user = {
      id: 1,
    };

    const createdBlog = await blogController.createBlogPost(blogToCreate, user);

    expect(createdBlog.title).toBe(blogToCreate.title);
  });
});

afterAll(async () => {
  await sequelize.sync({ force: true });
});
