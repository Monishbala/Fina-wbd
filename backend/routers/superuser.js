const express = require("express");
const router = express.Router();
const superuserController = require("../controllers/superuser");

// Route to render superuser login page
router.get("/", superuserController.superuserlogin);

// Route to handle superuser login form submission
router.post("/login", superuserController.superuserloginpost);

// Route to render superuser home page with a list of admins
router.get("/home", superuserController.superuserhome);

router.get("/addbook",superuserController.addbook)

module.exports = router;
