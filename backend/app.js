const Express = require("express");
const Body = require("body-parser");
const Mongo = require("mongoose");
const app = Express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
require('dotenv').config();

app.use(Body.urlencoded({ extended: true }));
const cors = require('cors')
app.use(Express.static("public"));
app.set("view engine", "ejs");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { name } = require("nodeman/lib/mustache");
const { default: mongoose } = require("mongoose");

// Only connect to the main database if not running tests
if (process.env.NODE_ENV !== 'test') {
    Mongo.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('MongoDB connection error:', err);
    });
}

app.use(Express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}))
const userModel4  = require("./Models/bookspage.js");
const userModel3 = require("./Models/userDetail");
const  sellmodel = require("./Models/sellbook.js");
const adminmodel = require("./Models/adminmodel.js");
const {bookmodel} = require("./Models/bookcollection.js");
const AdminLogin = require("./routers/admin.js")
const adminhome = require("./routers/adminhome.js")
const superuser= require("./routers/superuser.js")
const createadmin=require("./routers/createadmin.js")
const login=require("./routers/login.js")
const request=require("./routers/request.js")
const contact=require("./routers/contactus.js");
const sellbook=require("./routers/sellbook.js");
const userhome=require("./routers/userhome.js");
const homeroutes=require("./routers/homepageroutes.js");
const authController = require("./controllers/login-register");
const bookController = require("./controllers/addbook.js");
const signup=require("./routers/signup.js");
const { ordermodel } = require("./Models/orders.js");

const errorhandler = function (req , res , next , err) {
  if (err) {
    res.send("error occures")
  } else{
    next()
  }
}

app.use(errorhandler)
app.use("/", homeroutes);
app.use("/admin",AdminLogin);
app.use("/adminhome",adminhome);
app.use("/superUser",superuser );
app.use("/admincreate",createadmin )

app.get("/aboutus", function (req, res) {res.sendFile(__dirname + "/Aboutus/Aboutus.html");});
app.get("/faq", function (req, res) {res.sendFile(__dirname + "/FAQ/FAQ.html");});
app.get("/terms", function (req, res) {res.sendFile(__dirname + "/TermsAndcondition/terms&conditions.html");});

app.use("/login", login);
app.use("/signup",signup);
app.use("/request", request);
app.use("/contactus", contact);
app.use("/sellbooks",sellbook );
app.use("/users", userhome);

app.post('/addbook', bookController.addBook);

app.get("/delete/user/:id", async function (req, res) {
  await userModel3.findByIdAndDelete(req.params.id);
 return res.status(200).send({message:"Deleted Successfully"})
});

app.get("/delete/book/:id", async function (req, res) {
  await userModel4.findByIdAndDelete(req.params.id);
 return res.status(200).send({message:"Deleted Successfully"})
});

app.get("/book/:id/:userid", function (req, res) {
  var id = req.params.id;
  bookmodel.findOne({ _id: id }).then((arr) => {
    var url = "/review/" + id;
    return res.send({
      data: arr,
      url: url,
      userid: req.params.userid,
      bookid: req.params.id,
    });
  });
});

app.post("/book/:id/:userid", function (req, res) {
  var id = req.params.id;
  bookmodel
    .findOne({ _id: id })
    .then((arr) => {
      if (!arr) {
        return res.status(404).send("Document not found");
      }

      var review = {
        name: req.body.name,
        description: req.body.description,
        Rating: req.body.rating,
      };

      arr.Reviews.push(review);
      return arr.save();
    })
    .then((savedDoc) => {
      return res.status(200).send()
      // res.redirect(`/book/${req.params.id}/${req.params.userid}`);
    })
    .catch((err) => {
      return res.status(500).send("Internal Server Error");
    });
});

app.get("/books/:id", function (req, res) {
  var id = req.params.id;
  sellmodel.findOne({ _id: id }).then((arr) => {
    var url = "/review/" + id;
    res.render("detailsofsellpage ", { data: arr, url: url });
  });
});

app.post("/books/:id", function (req, res) {
  var id = req.params.id;
  sellmodel
    .findOne({ _id: id })
    .then((arr) => {
      if (!arr) {
        return res.status(404).send("Document not found");
      }

      var review = {
        name: req.body.name,
        description: req.body.description,
        Rating: req.body.rating,
      };

      arr.Reviews.push(review);
      return arr.save();
    })
    .then((savedDoc) => {
      res.redirect("/books/" + req.params.id);
    })
    .catch((err) => {
      
      res.status(500).send("Internal Server Error");
    });
});

app.get("/buy/:bookid/:userid", async function (req, res) {
  try {
    const user = await userModel3.findOne({ _id: req.params.userid });
    if (!user) return res.status(404).send("User not found");

    const book = await bookmodel.findOne({ _id: req.params.bookid });
    if (!book) return res.status(404).send("Book not found");

    // Check the available stock for the book.
    if (book.count <= 0) {
      return res.status(400).send("Books over");
    }

    book.count = book.count - 1;
    await book.save();
    const existingEntry = user.books.find(
      (entry) => entry.book._id.toString() === book._id.toString()
    );

    if (existingEntry) {
      // Increase the count for this user's book.
      existingEntry.count = (existingEntry.count || 1) + 1;
    } else {
      // Add new book entry with count set to 1.
      user.books.push({ book: book, count: 1 });
    }

    await user.save();
    res.status(200).send("Successful");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/used/buy/:bookid/:userid", async function (req, res) {
  try {
    const user = await userModel3.findOne({ _id: req.params.userid });
    if (!user) return res.status(404).send("User not found");

    const book = await sellmodel.findOne({ _id: req.params.bookid });
    if (!book) return res.status(404).send("Book not found");

    // Check the available stock for the book.
    if (book.count <= 0) {
      return res.status(400).send("Books over");
    }

    book.count = book.count - 1;
    
    await book.save();
    const existingEntry = user.books.find(
      (entry) => entry.book._id.toString() === book._id.toString()
    );

    if (existingEntry) {
      // Increase the count for this user's book.
      existingEntry.count = (existingEntry.count || 1) + 1;
    } else {
      // Add new book entry with count set to 1.
      user.books.push({ book: book, count: 1 ,seller:book.seller });
    }

    await user.save();
    res.status(200).send("Successful");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/mybooks/:userid/delete/:bookid", async (req, res) => {
  try {
    const { userid, bookid } = req.params;

    // Find the user by userid.
    const user = await userModel3.findOne({ _id: userid });
    if (!user) return res.status(404).send("User not found");

    // Find the index of the book in the user's cart.
    const bookIndex = user.books.findIndex(
      (entry) => entry.book._id.toString() === bookid
    );
    if (bookIndex === -1) return res.status(404).send("Book not in cart");

    // Get the cart entry.
    const cartEntry = user.books[bookIndex];

    // Remove one copy from the user's cart.
    if (cartEntry.count > 1) {
      cartEntry.count = cartEntry.count - 1;
    } else {
      // Remove the entry if only one copy exists.
      user.books.splice(bookIndex, 1);
    }

    // Increase the available stock count in the books collection.
    const book = await bookmodel.findOne({ _id: bookid });
    if (!book) return res.status(404).send("Book not found");
    book.count = book.count + 1;
    await book.save();
    await user.save();
    res.status(200).send("Book deleted from cart and count updated");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
app.delete("/used/mybooks/:userid/delete/:bookid", async (req, res) => {
  try {
    const { userid, bookid } = req.params;

    // Find the user by userid.
    const user = await userModel3.findOne({ _id: userid });
    if (!user) return res.status(404).send("User not found");

    // Find the index of the book in the user's cart.
    const bookIndex = user.books.findIndex(
      (entry) => entry.book._id.toString() === bookid
    );
    if (bookIndex === -1) return res.status(404).send("Book not in cart");

    // Get the cart entry.
    const cartEntry = user.books[bookIndex];

    // Remove one copy from the user's cart.
    if (cartEntry.count > 1) {
      cartEntry.count = cartEntry.count - 1;
    } else {
      // Remove the entry if only one copy exists.
      user.books.splice(bookIndex, 1);
    }

    // Increase the available stock count in the books collection.
    const book = await sellmodel.findOne({ _id: bookid });
    if (!book) return res.status(404).send("Book not found");
    book.count = book.count + 1;
    await book.save();
    await user.save();
    res.status(200).send("Book deleted from cart and count updated");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/orders/:id", (req, res) => {
  userModel3.findOne({ _id: req.params.id }).then((user) => {
      return res.status(200).send({ user: user, id: user._id });
  }).catch((err) => {
      
      console.error(err);
      return res.status(404).send("User not found");
  });
});

// Analytics endpoint for admin dashboard
app.get("/admin/analytics", async (req, res) => {
  try {
    // Get basic metrics directly from the models
    const totalUsers = await userModel3.countDocuments();
    const totalAdmins = await adminmodel.countDocuments();
    const totalBooks = await bookmodel.countDocuments();
    const totalOrders = await ordermodel.countDocuments();

    // Calculate orders for the last 7 days (including today)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    const today = new Date();

    // Aggregate weekly orders data by grouping on day-of-week and then converting to day name
    const weeklyOrdersData = await ordermodel.aggregate([
      { 
        $match: { 
          createdAt: { $gte: sevenDaysAgo, $lte: today }
        } 
      },
      { 
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          orders: { $sum: 1 }
        }
      },
      { 
        $project: { 
          dayNumber: "$_id",
          orders: 1,
          _id: 0 
        }
      },
      {
        $addFields: {
          name: {
            $switch: {
              branches: [
                { case: { $eq: ["$dayNumber", 1] }, then: "Sun" },
                { case: { $eq: ["$dayNumber", 2] }, then: "Mon" },
                { case: { $eq: ["$dayNumber", 3] }, then: "Tue" },
                { case: { $eq: ["$dayNumber", 4] }, then: "Wed" },
                { case: { $eq: ["$dayNumber", 5] }, then: "Thu" },
                { case: { $eq: ["$dayNumber", 6] }, then: "Fri" },
                { case: { $eq: ["$dayNumber", 7] }, then: "Sat" },
              ],
              default: "Unknown"
            }
          }
        }
      },
      {
        $project: { orders: 1, name: 1 }
      }
    ]);

    // Aggregate weekly revenue data by summing revenue from each order's books.
    const revenueData = await ordermodel.aggregate([
      { 
        $match: { 
          createdAt: { $gte: sevenDaysAgo, $lte: today }
        } 
      },
      {
        $project: {
          revenue: {
            $sum: {
              $map: {
                input: "$books",
                as: "b",
                in: { $multiply: [ { $toDouble: "$$b.book.Price" }, "$$b.count" ] }
              }
            }
          },
          createdAt: 1
        }
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          revenue: { $sum: "$revenue" }
        }
      },
      {
        $project: {
          dayNumber: "$_id",
          revenue: 1,
          _id: 0
        }
      },
      {
        $addFields: {
          name: {
            $switch: {
              branches: [
                { case: { $eq: ["$dayNumber", 1] }, then: "Sun" },
                { case: { $eq: ["$dayNumber", 2] }, then: "Mon" },
                { case: { $eq: ["$dayNumber", 3] }, then: "Tue" },
                { case: { $eq: ["$dayNumber", 4] }, then: "Wed" },
                { case: { $eq: ["$dayNumber", 5] }, then: "Thu" },
                { case: { $eq: ["$dayNumber", 6] }, then: "Fri" },
                { case: { $eq: ["$dayNumber", 7] }, then: "Sat" },
              ],
              default: "Unknown"
            }
          }
        }
      },
      {
        $project: { revenue: 1, name: 1 }
      }
    ]);

    // Aggregate category data from books grouped by Publication (or adjust as needed)
    const categoryData = await bookmodel.aggregate([
      {
        $group: {
          _id: "$Publication",
          value: { $sum: 1 }
        }
      },
      {
        $project: {
          name: "$_id",
          value: 1,
          _id: 0
        }
      }
    ]);

    // For bookRatingData, if there is a field to compute ratings, aggregate accordingly.
    // For this example, we'll return an empty array.
    const bookRatingData = [];

    // Aggregate language distribution data from books.
    const languageDistribution = await bookmodel.aggregate([
      {
        $group: {
          _id: "$Language",
          value: { $sum: 1 }
        }
      },
      {
        $project: {
          name: "$_id",
          value: 1,
          _id: 0
        }
      }
    ]);

    // Return the real data from models
    res.status(200).send({
      metrics: { totalUsers, totalAdmins, totalBooks, totalOrders },
      weeklyOrdersData,
      revenueData,
      categoryData,
      bookRatingData,
      languageDistribution,
    });
  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Only start the server if this file is run directly (not when imported)
if (require.main === module) {
    app.listen(4000, () => {
        console.log("Server is running in port 4000");
    });
}

module.exports = app;