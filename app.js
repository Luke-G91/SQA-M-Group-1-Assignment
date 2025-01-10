const express = require("express");
const path = require("path");
const expressSession = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const sequelize = require("./config/database.js");
const flash = require("connect-flash");

const indexRouter = require("./routers/indexRouter.js");
const authRouter = require("./routers/authRouter.js");
const blogRouter = require("./routers/blogRouter.js");
const userController = require("./controllers/userController.js");

const app = express();
const port = process.env.PORT || 3000;

const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false,
};

function setupViewEngine(app) {
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "pug");
}

function setupMiddleware(app) {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));
}

function setupRoutes(app, routers) {
  for (const router of routers) {
    app.use(router.basePath, router.router);
  }
}

function startServer() {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

async function syncDatabase() {
  try {
    await sequelize.sync();
    console.log("Database synchronized");
  } catch (error) {
    console.error("Failed to sync database:", error);
    process.exit(1);
  }
}

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

function setupFlash(app) {
  app.use(flash());
}

async function initializeServer() {
  setupViewEngine(app);
  setupMiddleware(app);
  setupAuth(app, session, passport);
  setupFlash(app);
  setupRoutes(app, [
    { basePath: "/", router: indexRouter },
    { basePath: "/", router: authRouter },
    { basePath: "/blog", router: blogRouter },
  ]);

  await syncDatabase();
  startServer();
}

initializeServer();
