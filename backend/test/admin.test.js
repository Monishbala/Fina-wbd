const request = require('supertest');
const app = require('../app');
const AdminModel = require('../Models/adminmodel');
const BookModel = require('../Models/bookspage');
const UserModel = require('../Models/userDetail');
const SellBookModel = require('../Models/sellbook');

describe('Admin Controller', () => {
    let server;

    beforeAll(() => {
        server = app.listen(4002); // Use a different port for testing
    });

    afterAll(async () => {
        await server.close();
    });

    describe('GET /admin/loginpages', () => {
        it('should serve the admin login page', async () => {
            const response = await request(app)
                .get('/admin/loginpages')
                .expect(200);

            expect(response.type).toBe('text/html');
        });
    });

    describe('POST /admin/login', () => {
        beforeEach(async () => {
            // Create a test admin
            await AdminModel.create({
                username: 'testadmin@example.com',
                password: 'testpassword',
                role: 'admin'
            });
        });

        it('should login successfully with correct credentials', async () => {
            const response = await request(app)
                .post('/admin/login')
                .send({
                    email: 'testadmin@example.com',
                    password: 'testpassword'
                })
                .expect(200);

            expect(response.body).toEqual({
                success: true,
                message: "Login successful",
                userId: expect.any(String)
            });
        });

        it('should fail with incorrect password', async () => {
            const response = await request(app)
                .post('/admin/login')
                .send({
                    email: 'testadmin@example.com',
                    password: 'wrongpassword'
                })
                .expect(200);

            expect(response.body).toEqual({
                success: false,
                message: "Password wrong"
            });
        });

        it('should fail with non-existent admin', async () => {
            const response = await request(app)
                .post('/admin/login')
                .send({
                    email: 'nonexistent@example.com',
                    password: 'testpassword'
                })
                .expect(200);

            expect(response.text).toBe("Admin is not available");
        });
    });

    describe('GET /adminhome/:admin', () => {
        it('should return admin dashboard data with valid admin ID', async () => {
            // Create test data
            const admin = await AdminModel.create({
                username: 'dashboardadmin@example.com',
                password: 'testpassword',
                role: 'admin'
            });

            const user = await UserModel.create({
                username: 'testuser',
                email: 'test@example.com',
                password: 'testpassword'
            });

            const book = await BookModel.create({
                title: 'Test Book',
                author: 'Test Author',
                ISBN: '1234567890'
            });

            const sellBook = await SellBookModel.create({
                title: 'Test Sell Book',
                author: 'Test Author',
                ISBN: '0987654321',
                price: 20,
                seller: 'testuser@example.com'
            });

            const response = await request(app)
                .get(`/adminhome/${admin._id}`)
                .expect(200);

            expect(response.body).toHaveProperty('admin');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('usersdata');
            expect(response.body.data).toHaveProperty('books');
            expect(response.body.data).toHaveProperty('sellbook');
        });

        it('should handle invalid admin ID gracefully', async () => {
            const response = await request(app)
                .get('/adminhome/invalidid')
                .expect(200);

            expect(response.body).toEqual({
                admin: null,
                data: {
                    usersdata: [],
                    books: [],
                    sellbook: []
                }
            });
        });
    });

    describe('GET /adminhome/bookadmin/:admin', () => {
        it('should return book admin dashboard data with valid admin ID', async () => {
            // Create test data
            const admin = await AdminModel.create({
                username: 'bookadmin@example.com',
                password: 'testpassword',
                role: 'bookadmin'
            });

            const book = await BookModel.create({
                title: 'Test Book',
                author: 'Test Author',
                ISBN: '1234567890'
            });

            const sellBook = await SellBookModel.create({
                title: 'Test Sell Book',
                author: 'Test Author',
                ISBN: '0987654321',
                price: 20,
                seller: 'testuser@example.com'
            });

            const response = await request(app)
                .get(`/adminhome/bookadmin/${admin._id}`)
                .expect(200);

            expect(response.body).toHaveProperty('admin2');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('books');
            expect(response.body.data).toHaveProperty('sellbook');
            expect(response.body.data).toHaveProperty('usersdata');
        });

        it('should handle invalid admin ID gracefully', async () => {
            const response = await request(app)
                .get('/adminhome/bookadmin/invalidid')
                .expect(200);

            expect(response.body).toEqual({
                admin2: null,
                data: {
                    usersdata: [],
                    books: [],
                    sellbook: []
                }
            });
        });
    });
}); 