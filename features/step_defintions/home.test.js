const express = require("express");
const { Given, When, Then, After } = require("cucumber");
const request = require("supertest");
const expect = require("expect.js");
const initTestServer = require("../utils/initializeTestServer.js");
const indexRouter = require("../../routers/indexRouter.js");
const blogRouter = require("../../routers/blogRouter.js");
const sequelize = require("../../config/database.js");
const { User, BlogPost } = require("../../models/index.js");
const mockAuthMiddleware = require("../utils/mockAuthMiddleware.js");

const app = express();

Given("I am a user", async () => {

  const user = await User.create({
    firstName: "Test",
    lastName: "User",
    email: "test@user.com",
    displayName: "Test user",
    hashedPassword: "testpass",
  });
 
  await BlogPost.create({
    title: "Test blog",
    content: "Test content",
    userId: 1,
  });
 
  app.use(mockAuthMiddleware(user));

  await initTestServer(
    app,
    [
      { basePath: "/", router: indexRouter }, 
      { basePath: "/blog", router: blogRouter }
    ],
    sequelize,
  );
});

When("I visit the home page", (done) => {
  request(app)
    .get("/home")
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      this.response = res;
      done();
    });
});

Then("I should see {string}", (message, done) => {
  expect(this.response.text).to.contain(message);
  done();
});

After(async () => {
  await sequelize.sync({ force: true });
});

// Tests for Comments & Likes

When("I create a post", (done) => {
  BlogPost.create({
    title: "Test Post",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ...",
  });
  request(app)
    .get("/home")
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      this.response = res;
      done();
    });
});

When("I open a blog post", (done) => {
  request(app)
    .get("/blog/1")
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      this.response = res;
      done();
    });
});

Then("I should see like count", (done) => {
  expect(this.response.text).to.contain("p Likes");
  done();
});

Then("I should see comment count", (done) => {
  expect(this.response.text).to.contain("| Comments");
  done();
});

Then("I should see its comment section", (done) => {
  expect(this.response.text).to.contain("View Comments");
  done();
});

After(async () => {
  await sequelize.sync({ force: true });
});