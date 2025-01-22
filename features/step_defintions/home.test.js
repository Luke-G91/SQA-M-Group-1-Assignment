const express = require("express");
const { Given, When, Then, After } = require("cucumber");
const request = require("supertest");
const expect = require("expect.js");
const initTestServer = require("../utils/initializeTestServer.js");
const indexRouter = require("../../routers/indexRouter.js");
const blogRouter = require("../../routers/blogRouter.js");
const sequelize = require("../../config/database.js");
const mockAuthMiddleware = require("../utils/mockAuthMiddleware.js");
const {BlogPost, User} = require("../../models/index.js")
const app = express();

Given("I am a user", async function () {
  app.use(mockAuthMiddleware(user));
  await initTestServer(
    app,
    [
      { basePath: "/", router: indexRouter }, 
      { basePath: "/blog", router: blogRouter }
    ],
    sequelize,
  );
  await User.create({
    firstName: "Test",
    lastName: "User",
    email: "test@user.com",
    displayName: "Isma",
    hashedPassword: "testpass",
  });
 
  await User.create({
    firstName: "Test",
    lastName: "User2",
    email: "test2@user.com",
    displayName: "Zoe",
    hashedPassword: "testpass",
  });

  await BlogPost.create({
    title: "Happiness",
    content: "Test content",
    userId: 1,
  });
  
  await BlogPost.create({
    title: "Test title",
    content: "Testing is easy",
    userId: 2,
  });
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

Then("I should see the search bar", (done) => {
  expect(this.response.text).to.contain("Search for inspiration...");
  done();
});

Then("I should see the Search and Clear buttons", (done) => {
  expect(this.response.text).to.contain("Search").and.to.contain("Clear");
  done();
});

When("I visit the home page and I input blog title in search bar", (done) => {
  request(app)
    .get("/home?query=happiness") // Search for the title "Happiness"
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      this.response = res;
      done();
    });
});

Then("I should have the searched blog appear", (done) => { 
  expect(this.response.text).to.contain("Happiness"); 
  done();
});



When("I visit the home page and I input author name of a blog in search bar", (done) => {
  request(app)
    .get("/home?query=zoe") 
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      this.response = res; 
      done();
    });
});

Then("I should have the related blogs to the author appear", (done) => {
  expect(this.response.text).to.contain("Zoe").and.to.not.contain("Isma");
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
