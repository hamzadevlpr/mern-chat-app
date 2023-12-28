const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'Description'
    },
    host: 'localhost:1050'
};

const outputFile = './swagger-output.json';
const routes = ['./Routes/ChatRoutes.js', './Routes/UserRoutes.js'];


swaggerAutogen(outputFile, routes, doc);