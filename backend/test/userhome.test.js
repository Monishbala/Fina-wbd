const request = require('supertest');
const app = require('../app');
const UserModel = require('../Models/userDetail');
const BookModel = require('../Models/bookspage');
const SellBookModel = require('../Models/sellbook');

describe('User Controller', () => {
    let server;

    beforeAll(() => {
        server = app.listen(4001); // Use a different port for testing
    });

    afterAll(async () => {
        await server.close();
    });

    describe('GET /users/:id', () => {
        beforeEach(async () => {
            // Clean up test data
            await UserModel.deleteMany({});
        });

        it('should return user details for valid user ID', async () => {
            // Create test user
            const user = await UserModel.create({
                username: 'testuser',
                email: 'test@example.com',
                password: 'testpassword'
            });

            const response = await request(app)
                .get(`/users/${user._id}`)
                .expect(200);

            expect(response.body).toEqual({
                id: user._id.toString(),
                username: 'testuser'
            });
        });

        it('should return 400 for invalid user ID format', async () => {
            const response = await request(app)
                .get('/users/invalidid')
                .expect(400);

            expect(response.body).toEqual({
                error: 'Invalid user ID format'
            });
        });

        it('should return 404 for non-existent user', async () => {
            // Create a valid but non-existent ObjectId
            const nonExistentId = '507f1f77bcf86cd799439011';
            
            const response = await request(app)
                .get(`/users/${nonExistentId}`)
                .expect(404);

            expect(response.text).toBe('User not found');
        });

        it('should handle multiple users correctly', async () => {
            // Create multiple test users
            const user1 = await UserModel.create({
                username: 'user1',
                email: 'user1@example.com',
                password: 'testpassword'
            });

            const user2 = await UserModel.create({
                username: 'user2',
                email: 'user2@example.com',
                password: 'testpassword'
            });

            // Test first user
            const response1 = await request(app)
                .get(`/users/${user1._id}`)
                .expect(200);

            expect(response1.body).toEqual({
                id: user1._id.toString(),
                username: 'user1'
            });

            // Test second user
            const response2 = await request(app)
                .get(`/users/${user2._id}`)
                .expect(200);

            expect(response2.body).toEqual({
                id: user2._id.toString(),
                username: 'user2'
            });
        });
    });

}); 