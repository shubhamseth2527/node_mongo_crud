/* Swagger configuration */

const {SWAGGER_LOCALHOST} = require('../src/util/constant');
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',      
    title: 'Apis',        // by default: 'REST API'
    description: 'API for Managing request calls',
    contact: {
        'name': 'API Support',
        'email': 'shubham.verma292@gmail.com'
    },
  },
  host: SWAGGER_LOCALHOST,      // by default: 'localhost:5000'
  basePath: '/',  // by default: '/'
  schemes: ['http'],   // by default: ['http']
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
        name: 'Users',
        description: 'Users API Testing'
    }
  ],
  securityDefinitions: {},  // by default: empty object
  definitions: {
    UserResponse: {
      code: 200,
      message: 'OK',
    },
    'errorResponse.400': {
      code: 400,
      message: 'Bad Request ',
    },
    'errorResponse.403': {
      code: 403,
      message: 'Forbidden error',
    },
    'errorResponse.404': {
      "code": "404",
      "message": "Not found",
    },
    'errorResponse.500': {
      code: 500,
      message: 'Internal Server Error',
    }
  },
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./app.js', './controllers/*.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */
swaggerAutogen(outputFile, endpointsFiles, doc);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index.js'); // Your project's root file
//   });