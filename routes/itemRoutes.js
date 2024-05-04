const express = require('express');
const itemController = require('../controllers/itemControllers');
const isAdmin = require('./../middleware/isAdmin');
const auth = require('./../middleware/auth');
const upload = require('./../middleware/upload');
const router = express.Router();

router
    .route("/addItem")
    .post(auth, isAdmin, upload.single('image'), itemController.createItem);

router
    .route("/addCategory")
    .post(auth, isAdmin, itemController.createCategory);

router
    .route("/updateCategory/:id")
    .put(auth, isAdmin, itemController.updateCategory);

router
    .route("/deleteItem/:id")
    .delete(auth, isAdmin, itemController.deleteItem);

router
    .route("/updateItem/:id")
    .put(auth, isAdmin, itemController.updateItem);

router
    .route("/getAllItems")
    .get(itemController.getAllMenuItems);

router
    .route("/getItem/:id")
    .get(itemController.getItem);

module.exports = router;