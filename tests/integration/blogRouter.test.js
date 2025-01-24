const express = require("express");
const request = require("supertest");
const bodyParser = require("body-parser");
const initTestServer = require("../../features/utils/initializeTestServer.js");
const blogRouter = require("../../routers/blogRouter.js");
const authRouter = require("../../routers/authRouter.js");
const sequelize = require("../../config/database.js");
const { User, BlogPost, BlogComment } = require("../../models");

const app = express();

// Mock authentication middleware
const mockAuthMiddleware = (req, res, next) => {
  if (req.headers["mock-auth"] === "false") {
    return next();
  }
  User.findOne({ where: { email: "test@user.com" } }).then((user) => {
    req.user = user;
    next();
  });
};

beforeEach(async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(mockAuthMiddleware);
  await initTestServer(
    app,
    [
      { basePath: "/blog", router: blogRouter },
      { basePath: "/", router: authRouter },
    ],
    sequelize,
  );

  // Create a test user
  await User.create({
    firstName: "Test",
    lastName: "User",
    email: "test@user.com",
    displayName: "TestUser",
    hashedPassword: "testpass",
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Blog Router", () => {
  jest.setTimeout(10000);

  describe("GET /blog/create", () => {
    it("Should render the create blog page", async () => {
      const response = await request(app).get("/blog/create");
      expect(response.status).toBe(200);
      expect(response.text).toContain("Create Post");
    });
  });

  describe("POST /blog/create", () => {
    it("Should create a new blog post and redirect to /", async () => {
      const mockBlog = { title: "New Blog", content: "Blog content" };

      const response = await request(app).post("/blog/create").send(mockBlog);

      expect(response.status).toBe(302);
      expect(response.headers.location).toBe("/");

      const createdBlog = await BlogPost.findOne({
        where: { title: "New Blog" },
      });
      expect(createdBlog).not.toBeNull();
      expect(createdBlog.content).toBe("Blog content");
    });
  });

  describe("GET /blog/:id", () => {
    it("Should render the blog post page", async () => {
      const user = await User.findOne({ where: { email: "test@user.com" } });
      const blog = await BlogPost.create({
        title: "Blog Post",
        content: "Content",
        userId: user.id,
      });

      const response = await request(app).get(`/blog/${blog.id}`);

      expect(response.status).toBe(200);
      expect(response.text).toContain("Blog Post");
      expect(response.text).toContain("Content");
    });

    it("Should return 404 if the blog post is not found", async () => {
      const response = await request(app).get("/blog/999");

      expect(response.status).toBe(404);
      expect(response.text).toBe("Post not found");
    });
  });

  describe("GET /blog/:id/edit", () => {
    it("Should render the edit blog post page", async () => {
      const user = await User.findOne({ where: { email: "test@user.com" } });
      const blog = await BlogPost.create({
        title: "Blog Post",
        content: "Content",
        userId: user.id,
      });

      const response = await request(app).get(`/blog/${blog.id}/edit`);

      expect(response.status).toBe(200);
      expect(response.text).toContain("Edit Post");
    });

    it("Should return 404 if the blog post is not found", async () => {
      const response = await request(app).get("/blog/999/edit");

      expect(response.status).toBe(404);
      expect(response.text).toBe("Post not found");
    });
  });

  describe("POST /blog/:id/edit", () => {
    it("Should update the blog post and redirect to the blog post page", async () => {
      const user = await User.findOne({ where: { email: "test@user.com" } });
      const blog = await BlogPost.create({
        title: "Blog Post",
        content: "Content",
        userId: user.id,
      });

      const response = await request(app)
        .post(`/blog/${blog.id}/edit`)
        .send({ title: "Updated Blog Post", content: "Updated Content" });

      expect(response.status).toBe(302);
      expect(response.headers.location).toBe(`/blog/${blog.id}`);

      const updatedBlog = await BlogPost.findByPk(blog.id);
      expect(updatedBlog.title).toBe("Updated Blog Post");
      expect(updatedBlog.content).toBe("Updated Content");
    });

    it("Should return 404 if the blog post is not found", async () => {
      const response = await request(app)
        .post("/blog/999/edit")
        .send({ title: "Updated Blog Post", content: "Updated Content" });

      expect(response.status).toBe(404);
      expect(response.text).toBe("Post not found");
    });
  });

  describe("POST /blog/:id/delete", () => {
    it("Should delete the blog post and redirect to /home", async () => {
      const user = await User.findOne({ where: { email: "test@user.com" } });
      const blog = await BlogPost.create({
        title: "Blog Post",
        content: "Content",
        userId: user.id,
      });

      const response = await request(app).post(`/blog/${blog.id}/delete`);

      expect(response.status).toBe(302);
      expect(response.headers.location).toBe("/home");

      const deletedBlog = await BlogPost.findByPk(blog.id);
      expect(deletedBlog).toBeNull();
    });

    it("Should return 404 if the blog post is not found", async () => {
      const response = await request(app).post("/blog/999/delete");

      expect(response.status).toBe(404);
      expect(response.text).toBe("Post not found");
    });
  });

  describe("POST /blog/:id/like", () => {
    it("Should like the blog post and return the updated like count", async () => {
      const user = await User.findOne({ where: { email: "test@user.com" } });
      const blog = await BlogPost.create({
        title: "Blog Post",
        content: "Content",
        userId: user.id,
      });

      const response = await request(app)
        .post(`/blog/${blog.id}/like`)
        .set("user", user);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        liked: true,
        likeCount: 1,
      });

      const updatedBlog = await BlogPost.findByPk(blog.id);
      expect(updatedBlog.likeCount).toBe(1);
    });

    it("Should return an error if the user is not logged in", async () => {
      const response = await request(app)
        .post("/blog/1/like")
        .set("mock-auth", "false");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: false,
        message: "User not logged in",
      });
    });
  });

  describe("POST /blog/:id/comment", () => {
    it("Should add a comment to the blog post and redirect to the blog post page", async () => {
      const user = await User.findOne({ where: { email: "test@user.com" } });
      const blog = await BlogPost.create({
        title: "Blog Post",
        content: "Content",
        userId: user.id,
      });

      const response = await request(app)
        .post(`/blog/${blog.id}/comment`)
        .send({ comment: "Nice post!" })
        .set("user", user);

      expect(response.status).toBe(302);
      expect(response.headers.location).toBe(`/blog/${blog.id}`);

      const comment = await BlogComment.findOne({
        where: { blogId: blog.id, userId: user.id },
      });
      expect(comment).not.toBeNull();
      expect(comment.comment).toBe("Nice post!");
    });

    it("Should return an error if adding a comment fails", async () => {
      const user = await User.findOne({ where: { email: "test@user.com" } });
      const blog = await BlogPost.create({
        title: "Blog Post",
        content: "Content",
        userId: user.id,
      });

      jest
        .spyOn(BlogComment, "create")
        .mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .post(`/blog/${blog.id}/comment`)
        .send({ comment: "Nice post!" })
        .set("user", user);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Database error" });

      BlogComment.create.mockRestore();
    });
  });

  describe("PUT /blog/comment/:id", () => {
    it("Should update the comment and return the updated comment", async () => {
      const user = await User.findOne({ where: { email: "test@user.com" } });
      const blog = await BlogPost.create({
        title: "Blog Post",
        content: "Content",
        userId: user.id,
      });
      const comment = await BlogComment.create({
        comment: "Nice post!",
        blogId: blog.id,
        userId: user.id,
      });

      const response = await request(app)
        .put(`/blog/comment/${comment.id}`)
        .send({ comment: "Updated comment" })
        .set("user", user);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.comment.comment).toBe("Updated comment");

      const updatedComment = await BlogComment.findByPk(comment.id);
      expect(updatedComment.comment).toBe("Updated comment");
    });

    it("Should return an error if the user is not logged in", async () => {
      const response = await request(app)
        .put("/blog/comment/1")
        .send({ comment: "Updated comment" })
        .set("mock-auth", "false");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: false,
        message: "You must be logged in to edit comments",
      });
    });

    it("Should return an error if updating the comment fails", async () => {
      const user = await User.findOne({ where: { email: "test@user.com" } });
      const blog = await BlogPost.create({
        title: "Blog Post",
        content: "Content",
        userId: user.id,
      });
      const comment = await BlogComment.create({
        comment: "Nice post!",
        blogId: blog.id,
        userId: user.id,
      });

      jest
        .spyOn(BlogComment.prototype, "save")
        .mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .put(`/blog/comment/${comment.id}`)
        .send({ comment: "Updated comment" })
        .set("user", user);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        success: false,
        message: "Error updating comment",
        error: {},
      });

      BlogComment.prototype.save.mockRestore();
    });
  });
});
