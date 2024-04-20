const express = require('express');
const userController = require('./../controllers/userControllers');

const router = express.Router();

router
    .route('/')
    .post(userController.register)
    .get(userController.getAllUsers);

router
    .route('/login').post(userController.login);
    
// router
//     .route('/:id')
//     .get(auth, userController.getProfile);

module.exports = router;