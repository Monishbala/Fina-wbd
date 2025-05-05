const Redis = require('redis');

// Create Redis client with Upstash configuration
const redisClient = Redis.createClient({
    url: process.env.REDIS_URL,
    socket: {
        connectTimeout: 10000, // 10 seconds
        reconnectStrategy: (retries) => {
            if (retries > 10) {
                console.error('Max reconnection attempts reached');
                return new Error('Max reconnection attempts reached');
            }
            return Math.min(retries * 100, 3000);
        }
    }
});

// Handle Redis connection errors
redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
    // Don't throw the error, just log it
});

// Handle Redis connection
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

// Handle Redis reconnection
redisClient.on('reconnecting', () => {
    console.log('Reconnecting to Redis...');
});

// Connect to Redis with error handling
const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        console.error('Failed to connect to Redis:', error);
        // Don't throw the error, just log it
    }
};

// Disconnect from Redis
const disconnectRedis = async () => {
    try {
        await redisClient.quit();
    } catch (error) {
        console.error('Failed to disconnect from Redis:', error);
    }
};

// Call connectRedis to establish the connection
connectRedis();

// Cache middleware
const cacheMiddleware = async (req, res, next) => {
    const key = req.originalUrl;
    
    try {
        const cachedData = await redisClient.get(key);
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }
        next();
    } catch (error) {
        console.error('Cache error:', error);
        next(); // Continue without cache if there's an error
    }
};

// Set cache
const setCache = async (key, data, expireTime = 3600) => {
    try {
        await redisClient.setEx(key, expireTime, JSON.stringify(data));
    } catch (error) {
        console.error('Error setting cache:', error);
        // Don't throw the error, just log it
    }
};

// Clear cache
const clearCache = async (pattern) => {
    try {
        const keys = await redisClient.keys(pattern);
        if (keys.length > 0) {
            await redisClient.del(keys);
        }
    } catch (error) {
        console.error('Error clearing cache:', error);
        // Don't throw the error, just log it
    }
};

module.exports = {
    redisClient,
    cacheMiddleware,
    setCache,
    clearCache,
    connectRedis,
    disconnectRedis
}; 