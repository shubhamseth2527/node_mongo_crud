const express = require('express');
const router = express.Router();
const UsersModel = require('../mongoose/models/users');
const UserController = require('../controller/users');
// Get all users 

router.get('/api/users' , UserController.findAll);
router.get('/api/users/:id' , UserController.findOne);
router.post('/api/users/add' , UserController.save);
router.post('/api/users/:id' , UserController.findByIdAndUpdate);



module.exports = router;