// Function to handle the validation for registration
// This function is used in the Pug template register.pug
/* eslint-disable-next-line no-unused-vars */
const validateRegister = () => {
  let isValid = true;

  // find all form inputs and error spans to allow errors to be displayed
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const displayName = document.getElementById("displayName").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const emailError = document.getElementById("emailError");
  const displayNameError = document.getElementById("displayNameError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  if (!firstName) {
    firstNameError.textContent = "First name is required.";
    isValid = false;
  } else {
    firstNameError.textContent = "";
  }

  if (!lastName) {
    lastNameError.textContent = "Last name is required.";
    isValid = false;
  } else {
    lastNameError.textContent = "";
  }

  // checks for at least one valid char followed by an @ followed by atleast one valid char
  // followed by a . then at least 2 valid chars
  // regex that checks email is valid
  const emailRequirements = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    emailError.textContent = "Email is required.";
    isValid = false;
  } else if (!emailRequirements.test(email)) {
    emailError.textContent = "Email address is invalid.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  if (!displayName) {
    displayNameError.textContent = "Display name is required.";
    isValid = false;
  } else {
    displayNameError.textContent = "";
  }

  // (?=.*[A-Z]) => contains an uppercase character at some point in the string
  // (?=.*[!@#$%^&*]) => contains a special character at some point in the string
  // Regex used to check there is at least one uppercase character and one special character in the password
  const passwordRequirements = /(?=.*[A-Z])(?=.*[!@#$%^&*])/;
  if (password.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters long.";
    isValid = false;
  } else if (!passwordRequirements.test(password)) {
    passwordError.textContent =
      "Password must contain at least one special character and one capital letter.";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  if (confirmPassword !== password) {
    confirmPasswordError.textContent = "Passwords do not match.";
    isValid = false;
  } else {
    confirmPasswordError.textContent = "";
  }

  return isValid;
};
