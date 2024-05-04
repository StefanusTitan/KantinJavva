const express = require('express');
const userController = require('./../controllers/userControllers');
const auth = require('./../middleware/auth');
const isAdmin = require('./../middleware/isAdmin');
const upload = require('./../middleware/upload');

const router = express.Router();

router
    .route('/reg')
    .post(upload.single('image'), userController.register)
    // .get(auth, isAdmin, userController.getAllUsers);

router
    .route('/users')
    .get(auth, isAdmin, userController.getAllUsers);

router
    .route('/login').post(userController.login);

router
    .route('/logout').post(userController.logout);
     
router
    .route('/:id')
    .get(auth, userController.getProfile);

router
    .route("/updateUser/:id")
    .put(auth, upload.single('image'), userController.updateUser);

module.exports = router;