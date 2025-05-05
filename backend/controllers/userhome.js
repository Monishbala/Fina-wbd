const userModel3 = require("../Models/userDetail");
const mongoose = require('mongoose');

/**
 * @swagger
 * tags:
 *   name: User Home
 *   description: User home page operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserHome:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         userId:
 *           type: string
 *           description: User ID
 */

class UserController {
  
  // Render the user's home page
  async userhome(req, res) {
    try {
      // Validate if the ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
      }

      // Find user by ID from the request parameters
      const user = await userModel3.findOne({ _id: req.params.id });

      if (user) {
        // Return the user's ID and username
        res.status(200).json({ id: req.params.id, username: user.username });
      } else {
        // If the user is not found, return a 404 status and message
        res.status(404).send("User not found");
      }
    } catch (error) {
      // Log the error and send a 500 status with an error message
      console.error('Error finding user:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

// Export an instance of the UserController class
module.exports = new UserController();
