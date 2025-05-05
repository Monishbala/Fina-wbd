const express = require("express");
const router = express.Router();
const authController = require("../controllers/login-register");

// Route for the signup page
router.get("/", authController.signuppage);

// Route to handle signup form submissions
router.post("/", authController.signuppost);


module.exports = router;
