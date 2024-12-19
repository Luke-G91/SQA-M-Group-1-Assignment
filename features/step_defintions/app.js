const { Given, When, Then } = require("cucumber");
const request = require("supertest");
const express = require("express");
const expect = require("expect.js");
const blogRoutes = require("../../routes/blog.js");
const mockDatabase = require("../../test/mock/database.js");
const path = require("path");

const app = express();
app.set("views", path.join(__dirname, "../../views/"));
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use("/", blogRoutes);

const database = Given("I am a visitor", async function () {
  const mockedDatbase = await mockDatabase();
  console.log(mockedDatbase);
});

When("I visit the home page", function (done) {
  request(app)
    .get("/test")
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
