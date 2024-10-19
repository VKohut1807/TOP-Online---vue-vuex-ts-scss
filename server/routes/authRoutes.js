const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUser);
router.put("/", updateUser);

module.exports = router;
