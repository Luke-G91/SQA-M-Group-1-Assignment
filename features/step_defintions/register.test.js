const express = require("express");
const { Given, When, Then, After } = require("cucumber");
const request = require("supertest");
const expect = require("expect.js");
const initTestServer = require("../utils/initializeTestServer.js");
const authRouter = require("../../routers/authRouter.js");
const sequelize = require("../../config/database.js");

const app = express();

Given("I am a user without an account", async () => {
  await initTestServer(app, [{ basePath: "/", router: authRouter }], sequelize);
});

When("I visit the register page", (done) => {
  request(app)
    .get("/register")
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      this.response = res;
      done();
    });
});

Then("I should see the register page", (done) => {
  expect(this.response.text).to.contain("Register");
  done();
});

After(async () => {
  await sequelize.sync({ force: true });
});
