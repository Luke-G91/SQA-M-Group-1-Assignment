function setupRoutes(app, routers) {
  for (const router of routers) {
    app.use(router.basePath, router.router);
  }
}

module.exports = setupRoutes;
