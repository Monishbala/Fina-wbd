


const Mongo = require("mongoose");


const userSchema1 = Mongo.Schema({
    name: String,
    email: String,
    address: String,
    phone: Number,
    category: String,
    description: String,
  });


  const userModel1 = Mongo.model("conatct", userSchema1);

  module.exports = userModel1;