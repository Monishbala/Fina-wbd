const path = require("path");
const userModel1 = require("../Models/contactus.js");

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact form operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ContactForm:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - message
 *       properties:
 *         name:
 *           type: string
 *           description: Contact person's name
 *         email:
 *           type: string
 *           description: Contact person's email
 *         message:
 *           type: string
 *           description: Contact message
 */

class ContactUsController {

  // Method to serve the contact us page
  async contactuspage(req, res) {
    res.sendFile(path.join(__dirname, "../views/Contactus.html"));
  }

  // Method to handle form submission
  /**
   * @swagger
   * /contactus:
   *   post:
   *     summary: Submit contact form
   *     tags: [Contact]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ContactForm'
   *     responses:
   *       200:
   *         description: Contact form submitted successfully
   *       400:
   *         description: Invalid form data
   */
  async contactuspost(req, res) {
    const { name, email, address, phone, category, description } = req.body;

    // Validate required fields
    if (!name || !email || !address || !phone || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    // Validate phone number format
    if (isNaN(phone) || phone.toString().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number"
      });
    }

    try {
      const newUser = new userModel1({
        name,
        email,
        address,
        phone: Number(phone), // Convert to number
        category,
        description,
      });

      // Save the new contact request to the database
      await newUser.save();

      // Return success response
      return res.status(200).json({
        success: true,
        message: "You have sent your message successfully"
      });
    } catch (error) {
      console.error('Error saving contact:', error);
      return res.status(500).json({
        success: false,
        message: "Error saving contact message"
      });
    }
  }
}

// Export an instance of ContactUsController
module.exports = new ContactUsController();
