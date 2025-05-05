const Mongo = require("mongoose");
const {bookschema} = require("./bookcollection")

const orderschema = Mongo.Schema({
    name: String,
    phone: String,
    address: String,
    city: String,
    pincode: String,
    books: [{
      count:Number,
      book:bookschema
    }],
  } ,{
    timestamps:true
  } )  ;
  


const ordermodel = Mongo.model("orders", orderschema);

module.exports = {ordermodel,orderschema};

