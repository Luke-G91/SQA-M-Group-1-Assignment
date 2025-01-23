const bcrypt = require("bcrypt");
const { User } = require("../../models/index");
const userController = require("../../controllers/userController.js");
const validateUserData = require("../../controllers/utils/validateUserData.js");

jest.mock("bcrypt");
jest.mock("../../models/index");
jest.mock("../../controllers/utils/validateUserData.js");

describe("User Service", () => {
  describe("getUserById", () => {
    it("should return user view model for a valid user id", async () => {
      const mockUser = {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        displayName: "JohnD",
      };
      User.findByPk.mockResolvedValue(mockUser);

      const result = await userController.getUserById(1);

      expect(result).toEqual({
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        displayName: "JohnD",
      });
    });

    it("should throw an error if user not found", async () => {
      User.findByPk.mockResolvedValue(null);

      await expect(userController.getUserById(999)).rejects.toThrow();
    });
  });

  describe("authUser", () => {
    it("should authenticate user with correct email and password", async () => {
      const mockUser = {
        id: 1,
        email: "john.doe@example.com",
        hashedPassword: "hashedpassword",
      };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);

      const done = jest.fn();
      await userController.authUser("john.doe@example.com", "password", done);

      expect(done).toHaveBeenCalledWith(null, {
        id: 1,
        firstName: undefined,
        lastName: undefined,
        email: "john.doe@example.com",
        displayName: undefined,
        profilePicture: undefined,
        bio: undefined,
      });
    });

    it("should not authenticate user with incorrect password", async () => {
      const mockUser = {
        hashedPassword: "hashedpassword",
      };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      const done = jest.fn();
      await userController.authUser(
        "john.doe@example.com",
        "wrongpassword",
        done,
      );

      expect(done).toHaveBeenCalledWith(null, false, {
        message: "Incorrect email or password",
      });
    });

    it("should not authenticate user with non-existing email", async () => {
      User.findOne.mockResolvedValue(null);

      const done = jest.fn();
      await userController.authUser(
        "nonexistent@example.com",
        "password",
        done,
      );

      expect(done).toHaveBeenCalledWith(null, false, {
        message: "Incorrect email or password",
      });
    });
  });

  describe("addUser", () => {
    it("should add a new user and return its view model", async () => {
      const userInput = {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        displayName: "JaneD",
        password: "password",
      };
      const mockUser = {
        id: 2,
        ...userInput,
        hashedPassword: "hashedpassword",
      };
      User.create.mockResolvedValue(mockUser);

      const result = await userController.addUser(userInput);

      expect(validateUserData).toHaveBeenCalledWith(userInput);
      expect(result).toEqual({
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        displayName: "JaneD",
      });
    });

    it("should throw an error if user data is invalid", async () => {
      validateUserData.mockImplementation(() => {
        throw new Error("Invalid user data");
      });

      await expect(userController.addUser({})).rejects.toThrow(
        "Invalid user data",
      );
    });
  });
});
