const express = require("express");
const router = express.Router();
const userController = require("../controllers/userhome");

// Route to display the user's home page
router.get("/:id", userController.userhome);

module.exports = router;
