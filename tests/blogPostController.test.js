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
