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
 *         - address
 *         - phone
 *         - category
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: Contact person's full name
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: Contact person's email address
 *           example: "john.doe@example.com"
 *         address:
 *           type: string
 *           description: Contact person's full address
 *           example: "123 Main St, City, Country"
 *         phone:
 *           type: number
 *           description: Contact person's phone number (minimum 10 digits)
 *           example: 9876543210
 *         category:
 *           type: string
 *           description: Category of the inquiry
 *           example: "General Inquiry"
 *         description:
 *           type: string
 *           description: Detailed message or inquiry
 *           example: "I have a question about your services."
 * 
 *     ContactResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the request was successful
 *         message:
 *           type: string
 *           description: Response message
 *         data:
 *           type: object
 *           properties:
 *             _id: { type: string }
 *             name: { type: string }
 *             email: { type: string }
 *             address: { type: string }
 *             phone: { type: number }
 *             category: { type: string }
 *             description: { type: string }
 *             createdAt: { type: string, format: date-time }
 *             updatedAt: { type: string, format: date-time }
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
   *   get:
   *     summary: Get contact us page
   *     tags: [Contact]
   *     responses:
   *       200:
   *         description: Contact us page HTML
   *
   *   post:
   *     summary: Submit contact form
   *     tags: [Contact]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ContactForm'
   *           example:
   *             name: "John Doe"
   *             email: "john.doe@example.com"
   *             address: "123 Main St, City, Country"
   *             phone: 9876543210
   *             category: "General Inquiry"
   *             description: "I have a question about your services."
   *     responses:
   *       200:
   *         description: Contact form submitted successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ContactResponse'
   *             example:
   *               success: true
   *               message: "Contact form submitted successfully"
   *               data:
   *                 _id: "60a1b2c3d4e5f6a7b8c9d0e1"
   *                 name: "John Doe"
   *                 email: "john.doe@example.com"
   *                 address: "123 Main St, City, Country"
   *                 phone: 9876543210
   *                 category: "General Inquiry"
   *                 description: "I have a question about your services."
   *                 createdAt: "2025-05-06T08:37:40.000Z"
   *                 updatedAt: "2025-05-06T08:37:40.000Z"
   *       400:
   *         description: Invalid form data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success: { type: boolean, example: false }
   *                 message: 
   *                   type: string
   *                   oneOf:
   *                     - "All fields are required"
   *                     - "Invalid email format"
   *                     - "Invalid phone number"
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success: { type: boolean, example: false }
   *                 message: { type: string, example: "Error submitting contact form" }
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
