const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/getCurrentUser/:uid').get(userController.getCurrentUser);
router.route('/getAllUser').get(userController.getAllUsers);

// Sign Up New User
router.route('/signUpNewUser').post(userController.signUpNewUser);
router.route('/loginUser').post(userController.loginUser);

module.exports = router;
