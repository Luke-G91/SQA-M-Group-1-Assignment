const express = require("express");
const BlogPost = require("../models/BlogPost.js");
const blogPostController = require("../controllers/blogPostController.js");

const router = express.Router();

router.get("/create", (req, res) => {
  res.render("create", { title: "Create Post" });
});

router.post("/create", async (req, res) => {
  await blogPostController.createBlogPost(req.body);
  res.redirect("/");
});

router.get("/:id", async (req, res) => {
  try {
    const post = await blogPostController.getBlogPostById(req.params.id);
    console.log(post);
    if (post) {
      res.render("post", { title: post.title, post });
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const post = await blogPostController.getBlogPostById(req.params.id);
    if (post) {
      res.render("edit", { title: "Edit Post", post });
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.post("/:id/edit", async (req, res) => {
  try {
    const post = await blogPostController.updatePostById(
      req.params.id,
      req.body,
    );
    if (post) {
      res.redirect(`/blog/${post.id}`);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.post("/:id/delete", async (req, res) => {
  const post = await blogPostController.deletePostById(req.params.id);
  if (post) {
    res.redirect("/home");
  } else {
    res.status(404).send("Post not found");
  }
});

module.exports = router;
