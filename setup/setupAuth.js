const expressSession = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controllers/userController.js");

function setupAuth(app, session, passport) {
  // add express session to app
  app.use(expressSession(session));

  // define the authentication strategy to be used
  const strategy = new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    userController.authUser,
  );

  // passport auth setup
  passport.use(strategy);
  app.use(passport.initialize());
  app.use(passport.initialize());
  app.use(passport.session());

  // handle user serialisation
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // allow isAuthenticated to be access in requests for routers
  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
  });

  app.use((req, res, next) => {
    // routes that do not require auth
    const openRoutes = ["/login", "/register"];

    if (openRoutes.includes(req.path) || req.isAuthenticated()) {
      return next();
    }

    // if the user is not authenticated and on a closed route redirect to login
    res.redirect("/login");
  });
}

module.exports = setupAuth;
