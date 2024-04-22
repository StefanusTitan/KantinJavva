const express = require('express');
const userController = require('./../controllers/userControllers');
const auth = require('./../middleware/auth');
const isAdmin = require('./../middleware/isAdmin');

const router = express.Router();

router
    .route('/')
    .post(userController.register)
    .get(auth, isAdmin, userController.getAllUsers);

router
    .route('/login').post(userController.login);

router
    .route('/logout').post(userController.logout);
    
router
    .route('/:id')
    .get(auth, userController.getProfile);

module.exports = router;