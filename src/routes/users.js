const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../docs/swagger.json');
const UserController = require('../controllers/users');
const auth = require('../auth/authentication');
const {requiredFields} = require('../middlewares/errorhandled');
const {
    PATHS,
    BASE_USER_API_URL
} = require('../util/constant');

router.post(BASE_USER_API_URL+PATHS.login,requiredFields(['email', 'password']), UserController.login)
router.post(BASE_USER_API_URL+PATHS.register, UserController.register);
router.get(BASE_USER_API_URL,  UserController.findAll);
router.get(BASE_USER_API_URL+PATHS.id, auth, UserController.findOne);
router.post(BASE_USER_API_URL+PATHS.add , UserController.create);
router.put(BASE_USER_API_URL+PATHS.id, UserController.findByIdAndUpdate);
router.delete(BASE_USER_API_URL+PATHS.id, UserController.findByIdAndDelete);
router.post(`/api/user/${PATHS.forgot_password}`, UserController.forgotPassword);
router.post(`/api/user/${PATHS.reset_password}`, UserController.resetPassword);
router.get('/api/user/'+PATHS.email, requiredFields(['email']), auth, UserController.findByEmail);
var options = {
    explorer: true,
};
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
router.get('/api-docs');

module.exports = router;