const Mongo = require("mongoose");

const userSchema = Mongo.Schema({
    ISBN: String,
    Title: String,
    Author: String,
    Quantity: Number,
    Email: String,
    Phone: Number,
  });

  

  const userModel = Mongo.model("RequestBook", userSchema);

  module.exports = userModel;