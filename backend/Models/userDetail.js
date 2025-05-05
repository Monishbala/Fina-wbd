const Mongo = require("mongoose");
const {bookschema} = require("./bookcollection")
const {orderschema} = require("./orders")

const userDetail = Mongo.Schema({
    username: String,
    password: String,
    books: [{
      count:Number,
      book:bookschema
    }],
    orders: [orderschema],
    isVerified: { type: Boolean, default: true }
});

const userModel3 = Mongo.model("users", userDetail);

module.exports = userModel3;