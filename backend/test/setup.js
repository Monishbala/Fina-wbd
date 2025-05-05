const mongoose = require('mongoose');

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
  await mongoose.connection.close();
});

// Clean up database before each test
beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}); 