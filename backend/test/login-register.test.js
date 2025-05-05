const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const userModel3 = require('../Models/userDetail');
const bcrypt = require('bcrypt');
const path = require('path');

describe('Login-Register Controller Tests', () => {
    let testUser;
    let server;
    const testPassword = '12345678!m';
    const testEmail = 'monishkingcoc@gmail.com';

    beforeAll(async () => {
        server = app.listen(4002); // Use a different port for testing
    });

    beforeEach(async () => {
        // Clean up database before each test
        await userModel3.deleteMany({});
        
        // Create a test user
        const hashedPassword = await bcrypt.hash(testPassword, 10);
        testUser = await userModel3.create({
            username: testEmail,
            password: hashedPassword,
            books: [],
            orders: [],
            isVerified: true
        });
    });

    afterEach(async () => {
        // Clean up test data
        await userModel3.deleteMany({});
    });

    afterAll(async () => {
        await server.close();
    });

    describe('GET /login', () => {
        test('should serve login page', async () => {
            const response = await request(server)
                .get('/login')
                .expect(200);

            expect(response.text).toContain('html');
        });
    });

    describe('POST /login', () => {
        test('should login successfully with correct credentials', async () => {
            const response = await request(server)
                .post('/login')
                .send({
                    email: testEmail,
                    pass: testPassword
                })
                .expect(200);

            expect(response.body).toEqual({
                success: true,
                message: "Login successful",
                userId: expect.any(String)
            });
        });

        test('should fail with wrong password', async () => {
            const response = await request(server)
                .post('/login')
                .send({
                    email: testEmail,
                    pass: 'wrongpassword'
                })
                .expect(200);

            expect(response.body).toEqual({
                success: false,
                message: "Wrong password"
            });
        });

        test('should fail with non-existent user', async () => {
            const response = await request(server)
                .post('/login')
                .send({
                    email: 'nonexistent@example.com',
                    pass: testPassword
                })
                .expect(200);

            expect(response.body).toEqual({
                success: false,
                message: "User does not exist"
            });
        });
    });

    describe('GET /signup', () => {
        test('should serve signup page', async () => {
            const response = await request(server)
                .get('/signup')
                .expect(200);

            expect(response.text).toContain('html');
        });
    });

    describe('POST /signup', () => {
        test('should create new user successfully', async () => {
            const newEmail = 'newuser@example.com';
            const response = await request(server)
                .post('/signup')
                .send({
                    email: newEmail,
                    pass1: testPassword,
                    pass2: testPassword
                })
                .expect(200);

            expect(response.text).toBe('User registered successfully');

            // Verify user was created in database
            const user = await userModel3.findOne({ username: newEmail });
            expect(user).toBeTruthy();
            expect(user.isVerified).toBe(true);
        });

        test('should fail when passwords do not match', async () => {
            const response = await request(server)
                .post('/signup')
                .send({
                    email: 'test2@example.com',
                    pass1: testPassword,
                    pass2: 'differentpassword'
                })
                .expect(200);

            expect(response.text).toBe('Passwords do not match');
        });

        test('should fail when user already exists', async () => {
            const response = await request(server)
                .post('/signup')
                .send({
                    email: testEmail,
                    pass1: testPassword,
                    pass2: testPassword
                })
                .expect(500);

            expect(response.text).toBe('User already exists');
        });
    });
}); 