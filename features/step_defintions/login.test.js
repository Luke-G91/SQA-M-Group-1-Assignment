const express = require("express");
const { Given, When, Then } = require("cucumber");
const request = require("supertest");
const expect = require("expect.js");
const initTestServer = require("../utils/initializeTestServer.js");
const authRouter = require("../../routers/authRouter.js");
const sequelize = require("../../config/database.js");

const app = express();

Given("I am not signed in", async () => {
  await initTestServer(app, [{ basePath: "/", router: authRouter }], sequelize);
});

When("I visit the login page", (done) => {
  request(app)
    .get("/login")
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      this.response = res;
      done();
    });
});

Then("I should see the login page", (done) => {
  // Check for the presence of the main heading
  expect(this.response.text).to.contain("<h1>Login</h1>");

  // Check for the presence of the email and password input fields
  expect(this.response.text).to.contain(
    '<input type="email" name="email" placeholder="Email" required>',
  );
  expect(this.response.text).to.contain(
    '<input type="password" name="password" placeholder="Password" required>',
  );

  // Check for the presence of the submit button
  expect(this.response.text).to.contain('<button type="submit">Login</button>');

  // Check for the presence of error message container, if any errors are expected
  if (this.response.text.includes("alert-danger")) {
    expect(this.response.text).to.contain('<div class="alert alert-danger">');
  }

  // Check for the presence of the registration link
  expect(this.response.text).to.contain(
    '<a href="/register">Register here</a>',
  );

  done();
});
