const express = require("express");
const blogPostController = require("../controllers/blogPostController.js");

const router = express.Router();

router.get("/create", (req, res) => {
  res.render("pages/createBlog", { title: "Create Post" });
});

router.post("/create", async (req, res) => {
  await blogPostController.createBlogPost(req.body, req.user);
  res.redirect("/");
});

router.get("/:id", async (req, res) => {
  try {
    // Fetch the blog post and check if the user has liked it
    const post = await blogPostController.getBlogPostById(req.params.id, req.user ? req.user.id : null, req.user);
    if (post) {
      res.render("pages/blog", { title: post.title, post, user: req.user });
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const post = await blogPostController.getBlogPostById(req.params.id, req.user ? req.user.id : null, req.user);
    if (post) {
      res.render("pages/editBlog", { title: "Edit Post", post });
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

router.post("/:id/like", async (req, res) => {
  if (!req.user) {
    return res.json({ success: false, message: "User not logged in" });
  }
  const { liked, likeCount } = await blogPostController.toggleLike(req.params.id, req.user.id);
  res.json({ success: true, liked, likeCount });
});

module.exports = router;
