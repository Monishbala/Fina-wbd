const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const userModel1 = require('../Models/contactus');
const path = require('path');

describe('ContactUs Controller Tests', () => {
    let server;

    beforeAll(async () => {
        // Connect to test database
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect('mongodb://127.0.0.1:27017/Test_db', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }

        // Start the server on a different port for testing
        return new Promise((resolve) => {
            server = app.listen(4001, () => {
                console.log('Test server running on port 4001');
                resolve();
            });
        });
    });

    beforeEach(async () => {
        // Clean up database before each test
        await userModel1.deleteMany({});
    });

    afterAll(async () => {
        // Clean up test database
        await userModel1.deleteMany({});
        
        // Close the server
        if (server) {
            await new Promise((resolve) => {
                server.close(() => {
                    console.log('Test server closed');
                    resolve();
                });
            });
        }
        
        // Close the MongoDB connection
        await mongoose.connection.close();
    });

    describe('GET /contactus', () => {
        test('should serve contact us page', async () => {
            const response = await request(server)
                .get('/contactus')
                .expect(200);

            expect(response.text).toContain('html');
        });
    });

    describe('POST /contactus', () => {
        test('should successfully submit contact form', async () => {
            const contactData = {
                name: 'Test User',
                email: 'test@example.com',
                address: '123 Test Street',
                phone: 1234567890,
                category: 'General Inquiry',
                description: 'This is a test message'
            };

            const response = await request(server)
                .post('/contactus')
                .send(contactData)
                .expect(200);

            expect(response.body).toEqual({
                success: true,
                message: "You have sent your message successfully"
            });

            // Verify the contact request was saved in the database
            const savedContact = await userModel1.findOne({ email: contactData.email });
            expect(savedContact).toBeTruthy();
            expect(savedContact.name).toBe(contactData.name);
            expect(savedContact.address).toBe(contactData.address);
            expect(savedContact.phone).toBe(contactData.phone);
            expect(savedContact.category).toBe(contactData.category);
            expect(savedContact.description).toBe(contactData.description);
        });

        test('should handle missing required fields', async () => {
            const incompleteData = {
                name: 'Test User',
                // email is missing
                address: '123 Test Street',
                phone: 1234567890,
                category: 'General Inquiry',
                description: 'This is a test message'
            };

            const response = await request(server)
                .post('/contactus')
                .send(incompleteData)
                .expect(400);

            expect(response.body).toEqual({
                success: false,
                message: "All fields are required"
            });

            // Verify no contact was saved in the database
            const savedContact = await userModel1.findOne({ name: incompleteData.name });
            expect(savedContact).toBeNull();
        });

        test('should handle invalid email format', async () => {
            const invalidEmailData = {
                name: 'Test User',
                email: 'invalid-email',
                address: '123 Test Street',
                phone: 1234567890,
                category: 'General Inquiry',
                description: 'This is a test message'
            };

            const response = await request(server)
                .post('/contactus')
                .send(invalidEmailData)
                .expect(400);

            expect(response.body).toEqual({
                success: false,
                message: "Invalid email format"
            });

            // Verify no contact was saved in the database
            const savedContact = await userModel1.findOne({ email: invalidEmailData.email });
            expect(savedContact).toBeNull();
        });

        test('should handle invalid phone number', async () => {
            const invalidPhoneData = {
                name: 'Test User',
                email: 'test@example.com',
                address: '123 Test Street',
                phone: '123', // Invalid phone number
                category: 'General Inquiry',
                description: 'This is a test message'
            };

            const response = await request(server)
                .post('/contactus')
                .send(invalidPhoneData)
                .expect(400);

            expect(response.body).toEqual({
                success: false,
                message: "Invalid phone number"
            });

            // Verify no contact was saved in the database
            const savedContact = await userModel1.findOne({ email: invalidPhoneData.email });
            expect(savedContact).toBeNull();
        });
    });
});