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
    try {
      // Get the user ID from the request body or session
      const userId = req.body.userId || req.user?._id;
      
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const newBook = new sellmodel({
        ImageUrl: req.body.ImageUrl,
        Title: req.body.Title,
        Released: req.body.Released,
        Author: req.body.Author,
        Publication: req.body.Publication,
        Price: req.body.Price,
        count: Number(req.body.count) || 1, // Changed from count to Count to match the model
        MRP: req.body.MRP,
        Language: req.body.Language,
        ISBN_10: req.body.ISBN_10,
        ISBN_13: req.body.ISBN_13,
        Pages: req.body.Pages,
        About_the_Book: req.body.About_the_Book,
        Reviews: [],
        seller: userId // Use the user ID from the authenticated user
      });


      // Save the new book entry
      await newBook.save();
      res.status(201).json({ message: 'Book listed successfully', book: newBook });
    } catch (error) {
      console.error('Error creating book listing:', error);
      res.status(500).json({ message: 'Error creating book listing', error: error.message });
    }
  }
}

// Export an instance of SellBookController
module.exports = new SellBookController();
