const express = require("express");
const {createPost, getPosts} = require("../controllers/postsController");

const router = express.Router();

router.get("/", getPosts);
router.post("/create", createPost);

module.exports = router;
