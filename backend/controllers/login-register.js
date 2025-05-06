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
 *         - pass
 *       properties:
 *         email:
 *           type: string
 *           description: User's email address (used as username)
 *         pass:
 *           type: string
 *           description: User's password
 *     UserRegister:
 *       type: object
 *       required:
 *         - email
 *         - pass1
 *         - pass2
 *       properties:
 *         email:
 *           type: string
 *           description: User's email address (used as username)
 *         pass1:
 *           type: string
 *           format: password
 *           description: User's password
 *         pass2:
 *           type: string
 *           format: password
 *           description: Password confirmation (must match pass1)
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the user
 *         username:
 *           type: string
 *           description: User's email address
 *         password:
 *           type: string
 *           description: Hashed password
 *         books:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               count:
 *                 type: number
 *                 description: Number of books
 *               book:
 *                 $ref: '#/components/schemas/Book'
 *               seller:
 *                 type: string
 *                 description: ID of the seller
 *         orders:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Order'
 *         isVerified:
 *           type: boolean
 *           default: true
 *     Book:
 *       type: object
 *       properties:
 *         ImageUrl: { type: string }
 *         Title: { type: string }
 *         Released: { type: string }
 *         Author: { type: string }
 *         Publication: { type: string }
 *         Price: { type: string }
 *         Discount: { type: string }
 *         MRP: { type: string }
 *         Language: { type: string }
 *         ISBN_10: { type: string }
 *         ISBN_13: { type: string }
 *         Pages: { type: string }
 *         count: { type: number }
 *         About_the_Book: { type: string }
 *     Order:
 *       type: object
 *       properties:
 *         name: { type: string }
 *         phone: { type: string }
 *         address: { type: string }
 *         city: { type: string }
 *         pincode: { type: string }
 *         books:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               count: { type: number }
 *               book: { $ref: '#/components/schemas/Book' }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
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
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success: { type: boolean }
     *                 message: { type: string }
     *                 userId: { type: string }
     *       401:
     *         description: Invalid credentials
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success: { type: boolean }
     *                 message: { type: string }
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
     * /signup:
     *   post:
     *     summary: User registration
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - pass1
     *               - pass2
     *             properties:
     *               email:
     *                 type: string
     *                 description: User's email address (will be used as username)
     *               pass1:
     *                 type: string
     *                 format: password
     *               pass2:
     *                 type: string
     *                 format: password
     *     responses:
     *       200:
     *         description: User registered successfully
     *         content:
     *           text/plain:
     *             schema:
     *               type: string
     *               example: "User registered successfully"
     *       400:
     *         description: Bad request (passwords don't match or invalid input)
     *         content:
     *           text/plain:
     *             schema:
     *               type: string
     *               example: "Passwords do not match"
     *       500:
     *         description: Server error or user already exists
     *         content:
     *           text/plain:
     *             schema:
     *               type: string
     *               example: "User already exists"
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