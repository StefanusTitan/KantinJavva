const express = require('express');
const itemController = require('../controllers/itemControllers');
const isAdmin = require('./../middleware/isAdmin');
const auth = require('./../middleware/auth');

const router = express.Router();

router
    .route("/addItem")
    .post(auth, isAdmin, itemController.createItem);

router
    .route("/addCategory")
    .post(auth, isAdmin, itemController.createCategory);

router
    .route("/getAllItems")
    .get(itemController.getAllMenuItems);

module.exports = router;