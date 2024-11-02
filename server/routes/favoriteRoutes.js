const express = require("express");
const {toggleFavoritePost} = require("../controllers/favoriteController");

const router = express.Router();

router.post("/:slug/favorite", toggleFavoritePost);
router.delete("/:slug/favorite", toggleFavoritePost);

module.exports = router;
