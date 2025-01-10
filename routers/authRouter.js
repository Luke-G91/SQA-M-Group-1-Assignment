const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const userController = require("../controllers/userController.js");

const router = express.Router();

router.get("/login", (req, res) => {
  const errors = req.flash("error");
  res.render("pages/login", { errors });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/register", (req, res) => {
  res.render("pages/register");
});

router.post("/register", async (req, res) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = {
      ...req.body,
      password: hashedPassword,
    };

    await userController.addUser(newUser);

    res.redirect("/login");
  } catch (error) {
    console.error("Error registering new user:", error);
    res.status(500).send("Error registering new user");
  }
});

module.exports = router;
