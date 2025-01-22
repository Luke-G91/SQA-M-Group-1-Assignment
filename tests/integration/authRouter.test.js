const express = require("express");
const request = require("supertest");
const initTestServer = require("../../features/utils/initializeTestServer.js");
const authRouter = require("../../routers/authRouter.js");
const sequelize = require("../../config/database.js");

const app = express();

beforeAll(async () => {
  await initTestServer(app, [{ basePath: "/", router: authRouter }], sequelize);
});

describe("Auth Router", () => {
  describe("POST /register", () => {
    it("Should successfully register the user and redirect to /login", async () => {
      await request(app)
        .post("/register")
        .type("form")
        .send({
          firstName: "test",
          lastName: "user",
          email: "test@test.com",
          displayName: "test",
          password: "test",
        })
        .expect(302)
        .expect("Location", "/login");
    });
  });
});
