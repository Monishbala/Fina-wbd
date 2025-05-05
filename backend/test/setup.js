const mongoose = require('mongoose');
const { redisClient, disconnectRedis } = require('../config/redis');

// Global setup for all tests
beforeAll(async () => {
  // Connect to test database
  if (!mongoose.connection.readyState) {
    await mongoose.connect('mongodb://127.0.0.1:27017/bookstore_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

// Global cleanup after all tests
afterAll(async () => {
  // Close MongoDB connection
  await mongoose.connection.close();
  
  // Close Redis connection
  if (redisClient.isOpen) {
    await disconnectRedis();
  }
});

// Clean up database before each test
beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}); 