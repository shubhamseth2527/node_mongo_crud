const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../docs/swagger.json');
const UsersModel = require('../models/users');
const UserController = require('../controllers/users');
const auth = require('../auth/authentication');

router.post("/api/users/login", UserController.login)
router.post("/api/users/register", UserController.register);
router.get('/api/users' , UserController.findAll);
router.get('/api/users/:id' , auth, UserController.findOne);
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