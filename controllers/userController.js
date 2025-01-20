const bcrypt = require("bcrypt");
const { User } = require("../models/index");

exports.getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    return createUserViewModel(user);
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};

exports.authUser = async (email, password, done) => {
  try {
    const user = await User.findOne({
      where: { email: email },
    });
    if (user === null) {
      return done(null, false, { message: "Incorrect email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      return done(null, false, { message: "Incorrect email or password" });
    }

    return done(null, createUserViewModel(user));
  } catch (error) {
    console.error("Error while authenticating user", error);
    return done(null, false, {
      message:
        "An error occurred during authentication. Please try again later.",
    });
  }
};

exports.addUser = async (user) => {
  try {
    const newUser = await User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      displayName: user.displayName,
      hashedPassword: user.password,
      profilePicture: user.profilePicture,
      bio: user.bio,
    });

    const newUserViewModel = createUserViewModel(newUser);
    console.log("User created successfully:", newUserViewModel);
    return newUserViewModel;
  } catch (error) {
    console.error("Error adding new user:", error);
    throw error;
  }
};

function createUserViewModel(user) {
  // return view model, which only contains information required by frontend
  // hashed password is not returned
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    displayName: user.displayName,
    profilePicture: user.profilePicture,
    bio: user.bio,
  };
}
