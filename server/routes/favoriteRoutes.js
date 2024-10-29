const express = require("express");
const {
  addToFavoritePost,
  removeFromFavoritePost,
} = require("../controllers/favoriteController");

const router = express.Router();

router.post("/favorite", addToFavoritePost);
router.delete("/favorite", removeFromFavoritePost);

module.exports = router;
