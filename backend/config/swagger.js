const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Book Store API',
            version: '1.0.0',
            description: 'API documentation for the Book Store application',
        },
        servers: [
            {
                url: 'http://localhost:4000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./controllers/*.js', './routers/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs; 