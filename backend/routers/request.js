const express = require("express");
const router = express.Router();
const requestController = require("../controllers/request");

// Route to display the request page
router.get("/:id", requestController.requestpage);

// Route to handle the form submission for requests
router.post("/", requestController.requestpost);

module.exports = router;
