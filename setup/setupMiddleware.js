const express = require("express");
const path = require("path");

function setupMiddleware(app) {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "../public")));
}

module.exports = setupMiddleware;
