const express = require("express");
const {getPopularTags} = require("../controllers/popularTags");

const router = express.Router();

router.get("/", getPopularTags);

module.exports = router;
