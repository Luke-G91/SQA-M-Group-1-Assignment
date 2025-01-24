const express = require("express");
const request = require("supertest");
const initTestServer = require("../../features/utils/initializeTestServer.js");
const authRouter = require("../../routers/authRouter.js");
const sequelize = require("../../config/database.js");
const userController = require("../../controllers/userController.js");
const blogRouter = require("../../routers/blogRouter.js");

const app = express();

app.use((req, res, next) => {
  req.logout = jest.fn((callback) => {
    callback();
  });
  next();
});

beforeAll(async () => {
  await initTestServer(
    app,
    [
      { basePath: "/blog", router: blogRouter },
      { basePath: "/", router: authRouter },
    ],
    sequelize,
  );
});

describe("Auth Router", () => {
  describe("GET /login", () => {
    it("Should render the login page", async () => {
      const response = await request(app).get("/login");
      expect(response.status).toBe(200);
      expect(response.text).toContain("Login");
    });
  });

  describe("GET /logout", () => {
    it("Should log the user out and redirect to /", async () => {
      const response = await request(app).get("/logout");
      expect(response.status).toBe(302);
      expect(response.headers.location).toBe("/");
    });
  });

  describe("GET /register", () => {
    it("Should render the registration page", async () => {
      const response = await request(app).get("/register");
      expect(response.status).toBe(200);
      expect(response.text).toContain("Register");
    });
  });

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

    it("Should return error for registration failure", async () => {
      jest.spyOn(console, "error").mockImplementation(() => {}); // Mock console.error to suppress output
      jest
        .spyOn(userController, "addUser")
        .mockRejectedValue(new Error("Registration error"));

      const response = await request(app).post("/register").type("form").send({
        firstName: "test",
        lastName: "user",
        email: "test@test.com",
        displayName: "test",
        password: "test",
      });

      expect(response.status).toBe(500);
      expect(response.text).toContain("Error registering new user");

      console.error.mockRestore();
      userController.addUser.mockRestore();
    });
  });
});
