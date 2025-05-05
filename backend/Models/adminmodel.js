const Mongo = require("mongoose");


const admin = Mongo.Schema({
    username: String,
    password: String,
    permissions: {
      viewing: Boolean,
      book_deleting: Boolean,
      user_deleting: Boolean,
    },
  });



  const adminmodel = Mongo.model("adminuser", admin);


  module.exports = adminmodel;

  