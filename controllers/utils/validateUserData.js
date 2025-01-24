// will not validate password as it has been hashed at this point
const validateUserData = (user) => {
  // checks for at least one valid char followed by an @ followed by atleast one valid char
  // followed by a . then at least 2 valid chars
  // regex that checks email is valid
  const emailRequirements = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (
    !user.firstName ||
    typeof user.firstName !== "string" ||
    user.firstName.trim() === ""
  ) {
    throw new Error("First name is required.");
  }

  if (
    !user.lastName ||
    typeof user.lastName !== "string" ||
    user.lastName.trim() === ""
  ) {
    throw new Error("Last name is required.");
  }

  if (
    !user.email ||
    typeof user.email !== "string" ||
    !emailRequirements.test(user.email)
  ) {
    throw new Error("Email address is invalid.");
  }

  if (
    !user.displayName ||
    typeof user.displayName !== "string" ||
    user.displayName.trim() === ""
  ) {
    throw new Error("Display name is required.");
  }
};

module.exports = validateUserData;
