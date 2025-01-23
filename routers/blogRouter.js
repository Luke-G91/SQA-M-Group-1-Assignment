const express = require("express");
const blogPostController = require("../controllers/blogPostController.js");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/create", (req, res) => {
  res.render("pages/createBlog", { title: "Create Post" });
});

router.post("/create", async (req, res) => {
  try {
    await blogPostController.createBlogPost(req.body, req.user);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await blogPostController.getBlogPostById(
      req.params.id,
      req.user ? req.user.id : null,
    );
    if (post) {
      res.render("pages/blog", { title: post.title, post, user: req.user });
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const post = await blogPostController.getBlogPostById(
      req.params.id,
      req.user ? req.user.id : null,
    );
    if (post) {
      res.render("pages/editBlog", { title: "Edit Post", post });
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
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
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

router.post("/:id/delete", async (req, res) => {
  try {
    const post = await blogPostController.deletePostById(req.params.id);
    if (post) {
      res.redirect("/home");
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

router.post("/:id/like", async (req, res) => {
  if (!req.user) {
    return res.json({ success: false, message: "User not logged in" });
  }
  try {
    const { liked, likeCount } = await blogPostController.toggleLike(
      req.params.id,
      req.user.id,
    );
    res.json({ success: true, liked, likeCount });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

router.get("/:id/comment", (req, res) => {
  res.render("pages/commentForm", {
    title: "Write a Comment",
    post: { id: req.params.id },
  });
});

router.post("/:id/comment", async (req, res) => {
  try {
    await blogPostController.addComment({
      comment: req.body.comment,
      blogId: req.params.id,
      userId: req.user.id,
    });

    res.redirect(`/blog/${req.params.id}`);
  } catch (error) {
    res.status(400).render("error", { error: error.message });
  }
});

router.put("/comment/:id", express.json(), async (req, res) => {
  if (!req.user) {
    return res.json({
      success: false,
      message: "You must be logged in to edit comments",
    });
  }
  try {
    const comment = await blogPostController.updateComment(
      req.params.id,
      req.user.id,
      req.body.comment,
    );
    if (!comment) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to edit this comment",
      });
    }
    res.json({ success: true, comment });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating comment", error });
  }
});

module.exports = router;
