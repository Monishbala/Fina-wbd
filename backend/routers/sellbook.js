const express = require("express");
const router = express.Router();
const sellBookController = require("../controllers/sellbook");

// Route to display the book selling page
router.get("/:id", sellBookController.booksellpage);

// Route to handle the book selling form submission
router.post("/", sellBookController.booksellpost);

module.exports = router;
