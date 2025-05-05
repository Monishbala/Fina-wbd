const express = require("express");
const router = express.Router();



router.get("/:admin",userAdmin);

router.get("/bookadmin/:admin",BookAdmin);


module.exports = router;

