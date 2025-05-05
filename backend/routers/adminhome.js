const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

router.get("/:admin", adminController.userAdmin);
router.get("/bookadmin/:admin", adminController.BookAdmin);

module.exports = router;
