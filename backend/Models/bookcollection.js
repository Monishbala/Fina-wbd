


const Mongo = require("mongoose");



const bookschema = Mongo.Schema({
    ImageUrl: String,
    Title: String,
    Released: String,
    Author: String,
    Publication: String,
    Price: String,
    Discount: String,
    MRP: String,
    Language: String,
    ISBN_10: String,
    ISBN_13: String,
    Pages: String,
    count:Number,
    About_the_Book: String,
    Reviews: [
      {
        name: String,
        description: String,
        Rating: Number,
      },
    ],
  });
  



const bookmodel = Mongo.model("books", bookschema);


module.exports = {bookmodel,bookschema};