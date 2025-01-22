const express = require("express");
const { Given, When, Then, After } = require("cucumber");
const request = require("supertest");
const expect = require("expect.js");
const initTestServer = require("../utils/initializeTestServer.js");
const indexRouter = require("../../routers/indexRouter.js");
const sequelize = require("../../config/database.js");
const {BlogPost, User} = require("../../models/index.js")
const app = express();

Given("I am a visitor", async function () {
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

  await initTestServer(
    app,
    [{ basePath: "/", router: indexRouter }],
    sequelize,
  );
});

When("I visit the home page", function (done) {
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

Then("I should see {string}", function (message, done) {
  expect(this.response.text).to.contain(message);
  done();
});

Then("I should see the search bar", function (done) {
  expect(this.response.text).to.contain("Search for inspiration...");
  done();
});

Then("I should see the Search and Clear buttons", function (done) {
  expect(this.response.text).to.contain("Search").and.to.contain("Clear");
  done();
});

When("I visit the home page and I input blog title in search bar", function (done) {
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

Then("I should have the searched blog appear", function (done) {
  console.log(this.response.text); 
  expect(this.response.text).to.contain("Happiness"); 
  done();
});



When("I visit the home page and I input author name of a blog in search bar", function (done) {
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

Then("I should have the related blogs to the author appear", function (done) {
  expect(this.response.text).to.contain("Zoe").and.to.not.contain("Isma");
  done();
});



After(async function () {
  await sequelize.sync({ force: true });
});

