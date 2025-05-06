const path = require("path");
const superusermodel = require("../Models/superuser");
const adminmodel = require("../Models/adminmodel");

/**
 * @swagger
 * tags:
 *   name: Superuser
 *   description: Superuser management operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Superuser:
 *       type: object
 *       required:
 *         - email
 *         - pass
 *       properties:
 *         email:
 *           type: string
 *           description: Superuser email
 *           example: "superuser@example.com"
 *         pass:
 *           type: string
 *           description: Superuser password
 *           example: "password123"
 */

class SuperuserController {

  // Render superuser login page
  superuserlogin(req, res) {
    res.sendFile(path.join(__dirname, "../views/SuperUser.html"));
  }

  /**
   * @swagger
   * /superuser/login:
   *   post:
   *     summary: Superuser login
   *     tags: [Superuser]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - pass
   *             properties:
   *               email:
   *                 type: string
   *                 example: "superuser@example.com"
   *               pass:
   *                 type: string
   *                 example: "password123"
   *     responses:
   *       200:
   *         description: Login successful
   *         content:
   *           text/plain:
   *             schema:
   *               type: string
   *               example: "Super login is successful"
   *       401:
   *         description: Invalid credentials
   *         content:
   *           text/plain:
   *             schema:
   *               type: string
   *               example: "Wrong password"
   *       404:
   *         description: User not found
   *         content:
   *           text/plain:
   *             schema:
   *               type: string
   *               example: "User not found"
   *       500:
   *         description: Internal server error
   *         content:
   *           text/plain:
   *             schema:
   *               type: string
   *               example: "Internal server error"
   */
  async superuserloginpost(req, res) {
    const { email, pass } = req.body;
  
    try {
      const user = await superusermodel.findOne({ email: email });
  
      if (!user) {
        return res.status(404).send("User not found"); // Handle case where user does not exist
      }
  
      if (user.password === pass) {
        return res.status(200).send("Super login is successful");
      } else {
        return res.status(401).send("Wrong password"); // Unauthorized
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal server error"); // Handle unexpected errors
    }
  }
  

  // Render superuser home page with list of admins
  async superuserhome(req, res) {
    await adminmodel.find().then(async (arr) => {
      return res.status(200).send({ admins:arr});
      // res.render("superuser", { admins: arr });
    });
  }

  // Render page to create a new admin
  admincreatepage(req, res) {
    res.sendFile(path.join(__dirname, "../views/admincreate.html"));
  }

  // Handle the creation of a new admin
  creatingadmin(req, res) {
    const newAdmin = new adminmodel({
      username: req.body.username,
      password: req.body.password,
      permissions: {
        viewing: true,
        book_deleting: true,
        user_deleting: true,
        
      }
    });
    newAdmin.save();
    res.status(200).send("Admin has been successfully created");
    // res.redirect("/superuser/home");
  }

  // Handle change in admin permissions
  async changepermissions(req, res) {
    try {
      const adminId = req.params.admin; // Getting the admin ID from the URL parameter
      const admin = await adminmodel.findOne({ _id: adminId }); // Find the admin by ID
  
      if (!admin) {
        return res.status(404).send("Admin not found"); // Return 404 if admin is not found
      }
  
      // Extract permissions from the request body
      const { user_deleting, book_deleting } = req.body;
  
      // Update the permissions based on the data received
      admin.permissions.user_deleting = user_deleting; // Assuming the value is a boolean
      admin.permissions.book_deleting = book_deleting; // Assuming the value is a boolean
  
      await admin.save(); // Save the updated admin object to the database
  
      return res.status(200).send("Permission has been changed"); // Send a success response
    } catch (err) {
      console.error(err); // Log the error if there's any
      return res.status(500).send("Internal Server Error"); // Send an error response
    }
  }
  

  addbook(req,res)
  {
    res.sendFile(path.join(__dirname,"../views/addbook.html"));
  }
}

// Export an instance of SuperuserController
module.exports = new SuperuserController();
