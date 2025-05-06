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
 *     SellBookRequest:
 *       type: object
 *       required:
 *         - userId
 *         - Title
 *         - Author
 *         - Price
 *         - ImageUrl
 *       properties:
 *         userId:
 *           type: string
 *           description: ID of the user selling the book
 *         ImageUrl:
 *           type: string
 *           description: URL of the book image
 *         Title:
 *           type: string
 *           description: Book title
 *         Released:
 *           type: string
 *           description: Release date of the book (YYYY-MM-DD)
 *         Author:
 *           type: string
 *           description: Book author
 *         Publication:
 *           type: string
 *           description: Publication name
 *         Price:
 *           type: string
 *           description: Selling price
 *         MRP:
 *           type: string
 *           description: Maximum Retail Price
 *         Language:
 *           type: string
 *           description: Book language
 *         count:
 *           type: number
 *           description: Number of copies available
 *         ISBN_10:
 *           type: string
 *           description: 10-digit ISBN
 *         ISBN_13:
 *           type: string
 *           description: 13-digit ISBN
 *         Pages:
 *           type: string
 *           description: Number of pages
 *         About_the_Book:
 *           type: string
 *           description: Book description
 * 
 *     SellBookResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Book listed successfully"
 *         book:
 *           type: object
 *           properties:
 *             _id: { type: string }
 *             ImageUrl: { type: string }
 *             Title: { type: string }
 *             Author: { type: string }
 *             Price: { type: string }
 *             seller: { type: string }
 *             createdAt: { type: string, format: date-time }
 *             updatedAt: { type: string, format: date-time }
 */

class SellBookController {
  
  // Render the sell book page
  booksellpage(req, res) {
    res.status(200).send({id: req.params.id });
    // res.render("SellBook", { id: req.params.id });
  }

  /**
   * @swagger
   * /sellbooks/{id}:
   *   get:
   *     summary: Get sell book page
   *     tags: [Sell Books]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: User ID
   *     responses:
   *       200:
   *         description: Sell book page data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   description: User ID
   *
   * /sellbooks/book/{id}/{userid}:
   *   get:
   *     summary: Get a specific used book by ID
   *     tags: [Sell Books]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Book ID
   *       - in: path
   *         name: userid
   *         schema:
   *           type: string
   *         required: true
   *         description: User ID
   *     responses:
   *       200:
   *         description: Book data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   $ref: '#/components/schemas/SellBook'
   *                 url:
   *                   type: string
   *                   description: Review URL
   *                 userid:
   *                   type: string
   *                   description: User ID
   *                 bookid:
   *                   type: string
   *                   description: Book ID
   *
   * /sellbooks:
   *   post:
   *     summary: List a book for sale
   *     tags: [Sell Books]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/SellBookRequest'
   *           example:
   *             userId: "user123"
   *             Title: "Sample Book Title"
   *             Author: "Author Name"
   *             Price: "19.99"
   *             ImageUrl: "http://example.com/book.jpg"
   *             count: 1
   *             Language: "English"
   *             ISBN_10: "1234567890"
   *             ISBN_13: "1234567890123"
   *     responses:
   *       201:
   *         description: Book listed successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SellBookResponse'
   *       400:
   *         description: Invalid book data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   enum:
   *                     - "User ID is required"
   *                     - "Title is required"
   *                     - "Author is required"
   *                     - "Price is required"
   *                     - "Image URL is required"
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Error creating book listing"
   *                 error:
   *                   type: string
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
