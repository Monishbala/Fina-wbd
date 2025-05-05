const express = require("express");
const router = express.Router();
const contactUsController = require("../controllers/contactus");

// Route for the contact us page
router.get("/", contactUsController.contactuspage);

// Route to handle form submissions
router.post("/", contactUsController.contactuspost);

module.exports = router;
