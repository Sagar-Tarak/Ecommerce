const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin } = require("../controllers/authController");

// Register route
router.post("/register", registerAdmin);

// Login route
router.post("/login", loginAdmin);

module.exports = router;
