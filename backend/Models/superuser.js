const Mongo = require("mongoose");



const superuserDetail = Mongo.Schema({
    email: String,
    password: String,
  });




const superusermodel = Mongo.model("Superuser", superuserDetail);

module.exports = superusermodel;