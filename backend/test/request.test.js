const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Request = require('../Models/request');
const path = require('path');

describe('Request Controller', () => {
    let server;

    beforeAll(async () => {
        server = app.listen(4003); // Use a different port for testing
    });

    beforeEach(async () => {
        // Clean up database before each test
        await Request.deleteMany({});
    });

    afterAll(async () => {
        await server.close();
    });

    describe('GET /request/:id', () => {
        it('should return the request ID', async () => {
            const response = await request(app)
                .get('/request/123')
                .expect(200);

            expect(response.body).toEqual({ id: '123' });
        });
    });

    describe('POST /request', () => {
        it('should successfully submit book request', async () => {
            const testRequest = {
                isbn: '1234567890',
                title: 'Test Book',
                author: 'Test Author',
                quantity: 1,
                email: 'test@example.com',
                phone: 1234567890
            };

            const response = await request(app)
                .post('/request')
                .send(testRequest)
                .expect(200);

            expect(response.text).toBe('Request for the book is successfull');

            // Verify the request was saved in the database
            const savedRequest = await Request.findOne({ ISBN: testRequest.isbn });
            expect(savedRequest).toBeTruthy();
            expect(savedRequest.Title).toBe(testRequest.title);
            expect(savedRequest.Author).toBe(testRequest.author);
            expect(savedRequest.Quantity).toBe(testRequest.quantity);
            expect(savedRequest.Email).toBe(testRequest.email);
            expect(savedRequest.Phone).toBe(testRequest.phone);
        });

        it('should handle missing required fields', async () => {
            const incompleteData = {
                title: 'Test Book',
                author: 'Test Author',
                quantity: 1,
                email: 'test@example.com',
                phone: 1234567890
            };

            const response = await request(app)
                .post('/request')
                .send(incompleteData)
                .expect(400);

            expect(response.text).toBe('All fields are required');

            // Verify no request was saved in the database
            const savedRequest = await Request.findOne({ Title: incompleteData.title });
            expect(savedRequest).toBeNull();
        });

        it('should handle invalid quantity', async () => {
            const invalidData = {
                isbn: '1234567890',
                title: 'Test Book',
                author: 'Test Author',
                quantity: -1,
                email: 'test@example.com',
                phone: 1234567890
            };

            const response = await request(app)
                .post('/request')
                .send(invalidData)
                .expect(400);

            expect(response.text).toBe('Quantity must be a positive number');

            // Verify no request was saved in the database
            const savedRequest = await Request.findOne({ ISBN: invalidData.isbn });
            expect(savedRequest).toBeNull();
        });

        it('should handle invalid phone type', async () => {
            const invalidData = {
                isbn: '1234567890',
                title: 'Test Book',
                author: 'Test Author',
                quantity: 1,
                email: 'test@example.com',
                phone: '1234567890' // string instead of number
            };

            const response = await request(app)
                .post('/request')
                .send(invalidData)
                .expect(400);

            expect(response.text).toBe('Phone must be a number');

            // Verify no request was saved in the database
            const savedRequest = await Request.findOne({ ISBN: invalidData.isbn });
            expect(savedRequest).toBeNull();
        });
    });
}); 