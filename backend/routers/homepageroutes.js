const express = require("express");
const router = express.Router();
const homePageLinksController = require("../controllers/homepagelinks");

// Define routes
router.get("/", homePageLinksController.startpage);
router.get("/usedBook/:id", homePageLinksController.usedBookpage);
router.get("/allbooks/:id", homePageLinksController.allbookspage);
router.get("/bestseller/:id", homePageLinksController.bestsellerpage);
router.get("/order/:id", homePageLinksController.orderpage);
router.post("/order/:id", homePageLinksController.orderpost);
router.get("/mybooks/:id", homePageLinksController.mybookpage);

module.exports = router;
