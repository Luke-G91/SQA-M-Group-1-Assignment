const express = require("express");
const blogPostController = require("../controllers/blogPostController.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/home");
});

router.get("/home", async (req, res) => {
  const searchQuery = req.query.query || "";
  const posts = await blogPostController.getAllBlogPosts(searchQuery);

  res.render("pages/home", {
    title: "Blog Posts",
    posts,
  });
});


router.get("/stats", async (req, res) => {
  const stats = await blogPostController.getBlogStats();
  res.render("pages/stats", { title: "Post Statistics", ...stats });
});

module.exports = router;
