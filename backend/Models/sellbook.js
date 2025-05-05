const Mongo = require("mongoose");

const sellbook = Mongo.Schema({
    ImageUrl: String,
    Title: String,
    Released: String,
    Author: String,
    Publication: String,
    Price: String,
    MRP: String,
    Language: String,
    count: Number,
    ISBN_10: String,
    ISBN_13: String,
    Pages: String,
    About_the_Book: String,
    seller: {
      type: String,
      required: true
    },
    Reviews: [
      {
        name: String,
        description: String,
        Rating: Number,
      },
    ],
  });

const sellmodel = Mongo.model("sellbook", sellbook);

module.exports = sellmodel;
  
  