const sellmodel = require("../Models/sellbook");

/**
 * @swagger
 * tags:
 *   name: Sell Books
 *   description: Used book selling operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SellBook:
 *       type: object
 *       required:
 *         - Title
 *         - Author
 *         - Price
 *         - Condition
 *         - userId
 *       properties:
 *         Title:
 *           type: string
 *           description: Book title
 *         Author:
 *           type: string
 *           description: Book author
 *         Price:
 *           type: number
 *           description: Selling price
 *         Condition:
 *           type: string
 *           description: Book condition
 *         userId:
 *           type: string
 *           description: ID of the user selling the book
 */

class SellBookController {
  
  // Render the sell book page
  booksellpage(req, res) {
    res.status(200).send({id: req.params.id });
    // res.render("SellBook", { id: req.params.id });
  }

  /**
   * @swagger
   * /sellbooks:
   *   post:
   *     summary: List a book for sale
   *     tags: [Sell Books]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/SellBook'
   *     responses:
   *       201:
   *         description: Book listed successfully
   *       400:
   *         description: Invalid book data
   */
  async booksellpost(req, res) {
    const newUser = new sellmodel({
      ImageUrl: req.body.ImageUrl,
      Title: req.body.Title,
      Released: req.body.Released,
      Author: req.body.Author,
      Publication: req.body.Publication,
      Price: req.body.Price,
      MRP: req.body.MRP,
      Language: req.body.Language,
      ISBN_10: req.body.ISBN_10,
      ISBN_13: req.body.ISBN_13,
      Pages: req.body.Pages,
      About_the_Book: req.body.About_the_Book,
      Reviews: [],
    });

    // Save the new book entry
    await newUser.save();

    res.status(200).send("Sell the book has been successfull");
    // Redirect to the sell books page
    // res.redirect("/sellbooks/" + req.params.id);
  }
}

// Export an instance of SellBookController
module.exports = new SellBookController();
