const path = require("path");
const bcrypt = require('bcrypt');
const userModel3 = require("../Models/userDetail");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and registration
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's password
 *     UserRegister:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: User's full name
 *         email:
 *           type: string
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's password
 */

class AuthController {
    // Render the login page
    loginpage(req, res) {
        res.sendFile(path.join(__dirname, "../views/login1.html"));
    }

    /**
     * @swagger
     * /login:
     *   post:
     *     summary: User login
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserLogin'
     *     responses:
     *       200:
     *         description: Login successful
     *       401:
     *         description: Invalid credentials
     */
    async login(req, res) {
        const { email, pass } = req.body;
        console.log(email, pass);

        try {
            const user = await userModel3.findOne({ username: email });

            if (!user) {
                return res.json({ success: false, message: "User does not exist" });
            }

            // Compare password using bcrypt
            const passwordMatch = await bcrypt.compare(pass, user.password);

            if (passwordMatch) {
                return res.json({ success: true, message: "Login successful", userId: user._id });
            } else {
                return res.json({ success: false, message: "Wrong password" });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: "Server error" });
        }
    }

    // Render the signup page
    signuppage(req, res) {
        res.sendFile(path.join(__dirname, "../views/signup.html"));
    }

    /**
     * @swagger
     * /register:
     *   post:
     *     summary: User registration
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserRegister'
     *     responses:
     *       201:
     *         description: User registered successfully
     *       400:
     *         description: User already exists
     */
    async signuppost(req, res) {
        const { email, pass1, pass2 } = req.body;

        if (pass1 !== pass2) {
            return res.send("Passwords do not match");
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(pass1, 10);

        const newUser = new userModel3({
            username: email,
            password: hashedPassword,
            books: [],
            orders: [],
            isVerified: true
        });

        try {
            const existingUser = await userModel3.findOne({ username: email });
            if (existingUser) {
                return res.status(500).send("User already exists");
            }

            // Save the new user with the hashed password
            await newUser.save();
            res.status(200).send("User registered successfully");
        } catch (err) {
            console.error(err);
            res.status(500).send("Error saving user");
        }
    }
}

// Export an instance of AuthController
module.exports = new AuthController();