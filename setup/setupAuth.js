const expressSession = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controllers/userController.js");

function setupAuth(app, session, passport) {
  app.use(expressSession(session));

  const strategy = new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    userController.authUser,
  );

  passport.use(strategy);
  app.use(passport.initialize());
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
  });

  app.use((req, res, next) => {
    const openRoutes = ["/login", "/register"];

    if (openRoutes.includes(req.path) || req.isAuthenticated()) {
      return next();
    }

    res.redirect("/login");
  });
}

module.exports = setupAuth;
