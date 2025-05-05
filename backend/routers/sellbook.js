const express = require("express");
const router = express.Router();
const sellBookController = require("../controllers/sellbook");
const sellmodel = require("../Models/sellbook");

// Route to get a specific used book by ID
router.get("/book/:id/:userid", async (req, res) => {
  var id = req.params.id;
  sellmodel.findOne({ _id: id }).then((arr) => {
    var url = "/review/" + id;
    return res.send({
      data: arr,
      url: url,
      userid: req.params.userid,
      bookid: req.params.id,
    });
  });
});

// Route to display the book selling page
router.get("/:id", sellBookController.booksellpage);

// Route to handle the book selling form submission
router.post("/", sellBookController.booksellpost);

module.exports = router;
