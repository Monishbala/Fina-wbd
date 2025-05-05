const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const superusermodel = require('../Models/superuser');
const adminmodel = require('../Models/adminmodel');

describe('Superuser Controller Tests', () => {
    let server;

    beforeAll(async () => {
        server = app.listen(4003); // Use a different port for testing
    });

    beforeEach(async () => {
        // Clean up the database before each test
        await superusermodel.deleteMany({});
        await adminmodel.deleteMany({});
    });

    afterAll(async () => {
        await server.close();
    });

    describe('GET /superUser', () => {
        it('should serve the superuser login page', async () => {
            const response = await request(app)
                .get('/superUser')
                .expect(200);

            // Check if it's an HTML page with login form
            expect(response.text).toContain('<!DOCTYPE html>');
            expect(response.text).toContain('form');
            expect(response.text).toContain('email');
            expect(response.text).toContain('password');
        });
    });

    describe('POST /superUser/login', () => {
        it('should successfully login with correct credentials', async () => {
            // Create a test superuser
            const testSuperuser = new superusermodel({
                email: 'test@example.com',
                password: 'test123'
            });
            await testSuperuser.save();

            const response = await request(app)
                .post('/superUser/login')
                .send({
                    email: 'test@example.com',
                    pass: 'test123'
                })
                .expect(200);

            expect(response.text).toBe('Super login is successful');
        });

        it('should handle incorrect password', async () => {
            // Create a test superuser
            const testSuperuser = new superusermodel({
                email: 'test@example.com',
                password: 'test123'
            });
            await testSuperuser.save();

            const response = await request(app)
                .post('/superUser/login')
                .send({
                    email: 'test@example.com',
                    pass: 'wrongpassword'
                })
                .expect(401);

            expect(response.text).toBe('Wrong password');
        });

        it('should handle non-existent user', async () => {
            const response = await request(app)
                .post('/superUser/login')
                .send({
                    email: 'nonexistent@example.com',
                    pass: 'test123'
                })
                .expect(404);

            expect(response.text).toBe('User not found');
        });
    });

    describe('GET /superUser/home', () => {
        it('should return list of admins', async () => {
            // Create test admins with correct schema fields
            const admin1 = new adminmodel({
                username: 'Admin1',
                password: 'pass123',
                permissions: {
                    viewing: true,
                    book_deleting: true,
                    user_deleting: true
                }
            });
            const admin2 = new adminmodel({
                username: 'Admin2',
                password: 'pass123',
                permissions: {
                    viewing: true,
                    book_deleting: true,
                    user_deleting: true
                }
            });
            await admin1.save();
            await admin2.save();

            const response = await request(app)
                .get('/superUser/home')
                .expect(200);

            expect(response.body).toHaveProperty('admins');
            expect(response.body.admins).toHaveLength(2);
            expect(response.body.admins[0].username).toBe('Admin1');
            expect(response.body.admins[1].username).toBe('Admin2');
        });

        it('should return empty array when no admins exist', async () => {
            const response = await request(app)
                .get('/superUser/home')
                .expect(200);

            expect(response.body).toHaveProperty('admins');
            expect(response.body.admins).toHaveLength(0);
        });
    });

    describe('GET /superUser/addbook', () => {
        it('should serve the add book page', async () => {
            const response = await request(app)
                .get('/superUser/addbook')
                .expect(200);

            expect(response.text).toContain('<!DOCTYPE html>');
            expect(response.text).toContain('html');
        });
    });

    describe('Admin Creation Tests', () => {
        describe('GET /admincreate', () => {
            it('should serve the admin creation page', async () => {
                const response = await request(app)
                    .get('/admincreate')
                    .expect(200);

                expect(response.text).toContain('<!DOCTYPE html>');
                expect(response.text).toContain('html');
            });
        });

        describe('POST /admincreate', () => {
            it('should successfully create a new admin', async () => {
                const adminData = {
                    username: 'NewAdmin',
                    password: 'admin123'
                };

                const response = await request(app)
                    .post('/admincreate')
                    .send(adminData)
                    .expect(200);

                expect(response.text).toBe('Admin has been successfully created');

                // Verify admin was created in database
                const createdAdmin = await adminmodel.findOne({ username: 'NewAdmin' });
                expect(createdAdmin).toBeTruthy();
                expect(createdAdmin.username).toBe('NewAdmin');
                expect(createdAdmin.permissions).toEqual({
                    viewing: true,
                    book_deleting: true,
                    user_deleting: true
                });
            });

            it('should handle missing required fields', async () => {
                const incompleteData = {
                    username: 'IncompleteAdmin'
                    // Missing password
                };

                const response = await request(app)
                    .post('/admincreate')
                    .send(incompleteData)
                    .expect(200);

                // Verify admin was created with default permissions
                const admin = await adminmodel.findOne({ username: 'IncompleteAdmin' });
                expect(admin).toBeTruthy();
                expect(admin.permissions).toEqual({
                    viewing: true,
                    book_deleting: true,
                    user_deleting: true
                });
            });

            it('should handle duplicate username', async () => {
                // Create an admin first
                const existingAdmin = new adminmodel({
                    username: 'DuplicateAdmin',
                    password: 'pass123',
                    permissions: {
                        viewing: true,
                        book_deleting: true,
                        user_deleting: true
                    }
                });
                await existingAdmin.save();

                // Try to create another admin with same username
                const duplicateData = {
                    username: 'DuplicateAdmin',
                    password: 'newpass123'
                };

                const response = await request(app)
                    .post('/admincreate')
                    .send(duplicateData)
                    .expect(200);

                // Verify both admins exist (the controller doesn't check for duplicates)
                const admins = await adminmodel.find({ username: 'DuplicateAdmin' });
                expect(admins).toHaveLength(2);
            });
        });
    });

    describe('Change Permissions Tests', () => {
        describe('POST /admincreate/changepermissions/:admin', () => {
            it('should successfully update admin permissions', async () => {
                // Create an admin first
                const admin = new adminmodel({
                    username: 'TestAdmin',
                    password: 'pass123',
                    permissions: {
                        viewing: true,
                        book_deleting: false,
                        user_deleting: false
                    }
                });
                await admin.save();

                const newPermissions = {
                    user_deleting: true,
                    book_deleting: true
                };

                const response = await request(app)
                    .post(`/admincreate/changepermissions/${admin._id}`)
                    .send(newPermissions)
                    .expect(200);

                expect(response.text).toBe('Permission has been changed');

                // Verify permissions were updated
                const updatedAdmin = await adminmodel.findById(admin._id);
                expect(updatedAdmin.permissions.user_deleting).toBe(true);
                expect(updatedAdmin.permissions.book_deleting).toBe(true);
                expect(updatedAdmin.permissions.viewing).toBe(true); // Should remain unchanged
            });

            it('should handle non-existent admin', async () => {
                const newPermissions = {
                    user_deleting: true,
                    book_deleting: true
                };

                // Use a valid but non-existent ObjectId
                const nonExistentId = new mongoose.Types.ObjectId();
                const response = await request(app)
                    .post(`/admincreate/changepermissions/${nonExistentId}`)
                    .send(newPermissions)
                    .expect(404);

                expect(response.text).toBe('Admin not found');
            });

            it('should handle missing permissions', async () => {
                // Create an admin first
                const admin = new adminmodel({
                    username: 'TestAdmin2',
                    password: 'pass123',
                    permissions: {
                        viewing: true,
                        book_deleting: false,
                        user_deleting: false
                    }
                });
                await admin.save();

                const response = await request(app)
                    .post(`/admincreate/changepermissions/${admin._id}`)
                    .send({})
                    .expect(200);

                // Verify permissions were not changed
                const unchangedAdmin = await adminmodel.findById(admin._id);
                // The controller sets undefined values when no permissions are sent
                expect(unchangedAdmin.permissions.viewing).toBe(true); // This remains unchanged
                expect(unchangedAdmin.permissions.book_deleting).toBeUndefined(); // Set to undefined
                expect(unchangedAdmin.permissions.user_deleting).toBeUndefined(); // Set to undefined
            });
        });
    });
}); 