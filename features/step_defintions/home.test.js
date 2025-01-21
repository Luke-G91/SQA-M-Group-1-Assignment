const express = require("express");
const { Given, When, Then, After } = require("cucumber");
const request = require("supertest");
const expect = require("expect.js");
const initTestServer = require("../utils/initializeTestServer.js");
const indexRouter = require("../../routers/indexRouter.js");
const sequelize = require("../../config/database.js");

const app = express();

Given("I am a user", async () => {
  await initTestServer(
    app,
    [{ basePath: "/", router: indexRouter }],
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
