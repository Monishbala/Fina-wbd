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
 *         - bookName
 *         - author
 *         - userId
 *       properties:
 *         bookName:
 *           type: string
 *           description: Name of the requested book
 *         author:
 *           type: string
 *           description: Author of the requested book
 *         userId:
 *           type: string
 *           description: ID of the user making the request
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
   *       400:
   *         description: Invalid request data
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
