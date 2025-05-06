const userModel3 = require("../Models/userDetail");
const sellmodel = require("../Models/sellbook");
const { bookmodel } = require("../Models/bookcollection");
const {ordermodel} = require("../Models/orders")
const path = require("path");
const { redisClient, cacheMiddleware, setCache, clearCache } = require("../config/redis");

/**
 * @swagger
 * tags:
 *   name: Home Page
 *   description: Home page related endpoints
 */

class HomePageLinksController {

  /**
   * @swagger
   * /startpage:
   *   get:
   *     summary: Get the starting page
   *     tags: [Home Page]
   *     responses:
   *       200:
   *         description: Starting page HTML
   */
  startpage(req, res) {
    res.sendFile(path.join(__dirname, "../views/startingpage.html"));
  }

  /**
   * @swagger
   * /usedbook/{id}:
   *   get:
   *     summary: Get all used books
   *     tags: [Home Page]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: User ID
   *     responses:
   *       200:
   *         description: List of used books
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 books:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Book'
   *                 id:
   *                   type: string
   *       500:
   *         description: Server error
   */
  async usedBookpage(req, res) {
    try {
      const cacheKey = `used-books-${req.params.id}`;
      const cachedData = await redisClient.get(cacheKey);
      
      if (cachedData) {
        return res.status(200).send(JSON.parse(cachedData));
      }

      const books = await sellmodel.find();
      const response = { books: books, id: req.params.id };
      
      // Cache the response for 1 hour
      await setCache(cacheKey, response, 3600);
      
      return res.status(200).send(response);
    } catch (error) {
      console.error("Error fetching used books:", error);
      return res.status(500).send("Internal Server Error");
    }
  }

  /**
   * @swagger
   * /allbooks/{id}:
   *   get:
   *     summary: Get all books
   *     tags: [Home Page]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: User ID
   *     responses:
   *       200:
   *         description: List of all books
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 books:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Book'
   *                 userid:
   *                   type: string
   *       500:
   *         description: Server error
   */
  async allbookspage(req, res) {
    try {
      const cacheKey = `all-books-${req.params.id}`;
      const cachedData = await redisClient.get(cacheKey);
      
      if (cachedData) {
        return res.status(200).send(JSON.parse(cachedData));
      }

      const books = await bookmodel.find();
      const response = { books: books, userid: req.params.id };
      
      // Cache the response for 1 hour
      await setCache(cacheKey, response, 3600);
      
      return res.status(200).send(response);
    } catch (error) {
      console.error("Error fetching all books:", error);
      return res.status(500).send("Internal Server Error");
    }
  }

  /**
   * @swagger
   * /bestsellers/{id}:
   *   get:
   *     summary: Get bestseller books
   *     tags: [Home Page]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: User ID
   *     responses:
   *       200:
   *         description: List of bestseller books
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 books:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Book'
   *                 id:
   *                   type: string
   *       500:
   *         description: Server error
   */
  async bestsellerpage(req, res) {
    try {
      const cacheKey = `bestsellers-${req.params.id}`;
      const cachedData = await redisClient.get(cacheKey);
      
      if (cachedData) {
        return res.status(200).send(JSON.parse(cachedData));
      }

      const books = await bookmodel.find();
      const bestsellers = books.filter((book) => {
        const sum = book.Reviews.reduce((acc, review) => acc + review.Rating, 0);
        const average = sum / book.Reviews.length;
        return average >= 4;
      });
      
      const response = { books: bestsellers, id: req.params.id };
      
      // Cache the response for 1 hour
      await setCache(cacheKey, response, 3600);
      
      return res.status(200).send(response);
    } catch (error) {
      console.error("Error fetching bestseller books:", error);
      return res.status(500).send("Internal Server Error");
    }
  }

  /**
   * @swagger
   * /orders/{id}:
   *   get:
   *     summary: Get user orders
   *     tags: [Home Page]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: User ID
   *     responses:
   *       200:
   *         description: User orders
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   $ref: '#/components/schemas/User'
   *       500:
   *         description: Server error
   */
  async orderpage(req, res) {
    try {
      const user = await userModel3.findOne({ _id: req.params.id });
      if (!user) {
        return res.status(404).send({ data: { books: [] } }); // Return empty books array if user not found
      }
      
      // Return the user data with books
      return res.status(200).send({ data: { books: user.books || [] } });
    } catch (error) {
      console.error("Error fetching user's cart:", error);
      return res.status(500).send({ data: { books: [] } }); // Return empty books array on error
    }
  }

  /**
   * @swagger
   * /orders/{id}:
   *   post:
   *     summary: Submit an order
   *     tags: [Home Page]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: User ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               phone:
   *                 type: string
   *               address:
   *                 type: string
   *               city:
   *                 type: string
   *               pincode:
   *                 type: string
   *     responses:
   *       200:
   *         description: Order placed successfully
   *       500:
   *         description: Server error
   */
  async orderpost(req, res) {
    try {
      const user = await userModel3.findOne({ _id: req.params.id });
      
      // Build an array embedding full book details for each cart item
      const orderBooks = [];
      for (const entry of user.books) {
        // Assuming entry.book contains the book id or an object with _id field.
        const bookId = entry.book._id ? entry.book._id : entry.book;
        const fullBook = await bookmodel.findOne({ _id: bookId });
        orderBooks.push({ book: fullBook, count: entry.count });
      }
    console.log(orderBooks);
      const newOrder = new ordermodel({
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        pincode: req.body.pincode,
        books: orderBooks,
      });
      
      await newOrder.save();
      console.log(newOrder);
      
      user.books = [];
      user.orders.push(newOrder);
      await user.save();
      
      return res.status(200).send("Order placed successfully");
    } catch (error) {
      console.error("Error processing order:", error);
      return res.status(500).send("Internal Server Error");
    }
  }

  /**
   * @swagger
   * /mybooks/{id}:
   *   get:
   *     summary: Get user's books
   *     tags: [Home Page]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: User ID
   *     responses:
   *       200:
   *         description: User's books
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   $ref: '#/components/schemas/User'
   *                 id:
   *                   type: string
   *       500:
   *         description: Server error
   */
  async mybookpage(req, res) {
    try {
      // console.log(req.params.id);
      
      const user = await userModel3.findOne({ _id: req.params.id });
      return res.status(200).send({ data: user, id: req.params.id });
      // res.render("mybook", { data: user, id: req.params.id });
    } catch (error) {
      console.error("Error fetching user for my books page:", error);
      return res.status(500).send("Internal Server Error");
    }
  }
}

// Export an instance of the controller class
module.exports = new HomePageLinksController();
