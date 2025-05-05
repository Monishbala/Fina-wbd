const express = require("express");
const router = express.Router();
const superuserController = require("../controllers/superuser");

// Route to render the admin creation page
router.get("/", superuserController.admincreatepage);

// Route to handle admin creation form submission
router.post("/", superuserController.creatingadmin);

// Route to handle change of admin permissions
router.post("/changepermissions/:admin", superuserController.changepermissions);

module.exports = router;
