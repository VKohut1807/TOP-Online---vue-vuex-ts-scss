const express = require("express");
const {
  createPost,
  getPosts,
  getPost,
} = require("../controllers/postsController");

const router = express.Router();

router.get("/", getPosts);
router.get("/:slug", getPost);
router.post("/create", createPost);

module.exports = router;
