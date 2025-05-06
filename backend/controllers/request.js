const userModel = require("../Models/request");

/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: Book request operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BookRequest:
 *       type: object
 *       required:
 *         - isbn
 *         - title
 *         - author
 *         - quantity
 *         - email
 *         - phone
 *       properties:
 *         isbn:
 *           type: string
 *           description: ISBN of the requested book
 *         title:
 *           type: string
 *           description: Title of the requested book
 *         author:
 *           type: string
 *           description: Author of the requested book
 *         quantity:
 *           type: integer
 *           minimum: 1
 *           description: Quantity of books requested (must be at least 1)
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the requester
 *         phone:
 *           type: integer
 *           description: Phone number of the requester (digits only)
 */

class RequestController {
  
  // Render the request page
  async requestpage(req, res) {
    try {
      res.status(200).send({id: req.params.id });
    } catch (error) {
      res.status(500).send("Error processing request");
    }
  }

  /**
   * @swagger
   * /request:
   *   post:
   *     summary: Submit a book request
   *     tags: [Requests]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/BookRequest'
   *     responses:
   *       200:
   *         description: Request submitted successfully
   *         content:
   *           text/plain:
   *             schema:
   *               type: string
   *               example: "Request for the book is successful"
   *       400:
   *         description: Invalid request data
   *         content:
   *           text/plain:
   *             schema:
   *               type: string
   *               oneOf:
   *                 - const: "All fields are required"
   *                 - const: "Quantity must be a positive number"
   *                 - const: "Phone must be a number"
   *       500:
   *         description: Server error
   */
  async requestpost(req, res) {
    try {
      const { isbn, title, author, quantity, email, phone } = req.body;
      
      // Validate required fields
      if (!isbn || !title || !author || !quantity || !email || !phone) {
        return res.status(400).send("All fields are required");
      }

      // Validate quantity is positive
      if (quantity <= 0) {
        return res.status(400).send("Quantity must be a positive number");
      }

      // Validate phone is a number
      if (typeof phone !== 'number') {
        return res.status(400).send("Phone must be a number");
      }

      const newUser = new userModel({
        ISBN: isbn,
        Title: title,
        Author: author,
        Quantity: quantity,
        Email: email,
        Phone: phone,
      });
    
      // Save the new request to the database
      await newUser.save();

      res.status(200).send("Request for the book is successfull");
    } catch (error) {
      console.error("Error in requestpost:", error);
      res.status(500).send("Error processing request");
    }
  }
}

// Export an instance of the RequestController
module.exports = new RequestController();
