const initTestServer = require("./utils/intializeUnitTestServer.js");
const blogController = require("../controllers/blogPostController.js");
const express = require("express");
const sequelize = require("../config/database.js");

beforeAll(async () => {
  const app = express();
  await initTestServer(app, [], sequelize);
});

describe("Blog controller", () => {
  it("creates a new blog", async () => {
    const blogToCreate = {
      title: "test title",
      content: "test content",
      author: "test author",
    };

    const createdBlog = await blogController.createBlogPost(blogToCreate);

    expect(createdBlog.title).toBe(blogToCreate.title);
  });
});

afterAll(async () => {
  await sequelize.sync({ force: true });
});
