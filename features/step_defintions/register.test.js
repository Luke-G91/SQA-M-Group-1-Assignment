const express = require("express");
const { Given, When, Then } = require("cucumber");
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
  // Check for the presence of the main heading
  expect(this.response.text).to.contain("<h1>Register</h1>");

  // Check for the presence of input fields
  expect(this.response.text).to.contain(
    '<input type="text" name="firstName" id="firstName" placeholder="First Name" required>',
  );
  expect(this.response.text).to.contain(
    '<input type="text" name="lastName" id="lastName" placeholder="Last Name" required>',
  );
  expect(this.response.text).to.contain(
    '<input type="email" name="email" id="email" placeholder="Email" required>',
  );
  expect(this.response.text).to.contain(
    '<input type="text" name="displayName" id="displayName" placeholder="Display Name" required>',
  );
  expect(this.response.text).to.contain(
    '<input type="password" name="password" id="password" placeholder="Password" required minlength="8">',
  );
  expect(this.response.text).to.contain(
    '<input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" required>',
  );

  // Check for the presence of error message spans
  expect(this.response.text).to.contain(
    '<span class="error-message" id="firstNameError"></span>',
  );
  expect(this.response.text).to.contain(
    '<span class="error-message" id="lastNameError"></span>',
  );
  expect(this.response.text).to.contain(
    '<span class="error-message" id="emailError"></span>',
  );
  expect(this.response.text).to.contain(
    '<span class="error-message" id="displayNameError"></span>',
  );
  expect(this.response.text).to.contain(
    '<span class="error-message" id="passwordError"></span>',
  );
  expect(this.response.text).to.contain(
    '<span class="error-message" id="confirmPasswordError"></span>',
  );

  // Check for the presence of the submit button
  expect(this.response.text).to.contain(
    '<button type="submit">Register</button>',
  );

  // Check for the presence of the login link
  expect(this.response.text).to.contain('<a href="/login">Login here</a>');

  done();
});
