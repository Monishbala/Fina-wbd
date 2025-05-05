const {bookmodel} = require("../Models/bookcollection.js");

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - Title
 *         - Author
 *         - Price
 *         - Publication
 *         - Language
 *       properties:
 *         Title:
 *           type: string
 *           description: Book title
 *         Author:
 *           type: string
 *           description: Book author
 *         Price:
 *           type: number
 *           description: Book price
 *         Publication:
 *           type: string
 *           description: Book publication
 *         Language:
 *           type: string
 *           description: Book language
 *         count:
 *           type: number
 *           description: Number of available copies
 */

class BookController{
  /**
   * @swagger
   * /addbook:
   *   post:
   *     summary: Add a new book
   *     tags: [Books]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Book'
   *     responses:
   *       201:
   *         description: Book added successfully
   *       400:
   *         description: Invalid book data
   */
  async addBook(req, res){
  try {
    const newBook = new bookmodel({
      ImageUrl: req.body.ImageUrl,
      Title: req.body.Title,
      Released: req.body.Released,
      Author: req.body.Author,
      Publication: req.body.Publication,
      Price: req.body.Price,
      Discount: req.body.Discount,
      MRP: req.body.MRP,
      Language: req.body.Language,
      ISBN_10: req.body.ISBN_10,
      ISBN_13: req.body.ISBN_13,
      count:req.body.count,
      Pages: req.body.Pages,
      About_the_Book: req.body.About_the_Book,
    });

    
    await newBook.save();

    return res.status(200).send("Book added successfully")
    // res.redirect('/superUser/home'); 
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).send('Server error while adding book');
  }
}

}

module.exports = new BookController();