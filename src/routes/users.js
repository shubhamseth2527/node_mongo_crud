const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../docs/swagger.json');
const UsersModel = require('../mongoose/models/users');
const UserController = require('../controllers/users');
// Get all users 

router.get('/api/users' , UserController.findAll);
router.get('/api/users/:id' , UserController.findOne);
router.post('/api/users/add' , UserController.save);
router.put('/api/users/:id' , UserController.findByIdAndUpdate);
router.delete('/api/users/:id' , UserController.findByIdAndDelete);
var options = {
    explorer: true,
    swaggerOptions: {
    //   urls: [
    //    {url: 'http://petstore.swagger.io/v2/swagger.json',name: 'Spec1'},
    //   ]
    }
};
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
router.get('/api-docs');

module.exports = router;