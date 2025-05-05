const express = require("express");
const router = express.Router();
const authController = require("../controllers/login-register");

// Route for the login page
router.get("/", authController.loginpage);

// Route to handle login form submissions
router.post("/", authController.login);

module.exports = router;
