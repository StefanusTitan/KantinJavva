const express = require('express');
const cartController = require('../controllers/cartControllers');
const isAdmin = require('./../middleware/isAdmin');
const auth = require('./../middleware/auth');

const router = express.Router();

router
    .route("/getCart")
    .get(auth, cartController.getCart);

router
    .route("/addItemToCart")
    .post(auth, cartController.addItemToCart);

router
    .route("/removeItemFromCart")
    .patch(auth, cartController.removeItemFromCart);

router
    .route("/reduceItemQuantity")
    .patch(auth, cartController.removeQuantityFromItem);

router
    .route("/clearCart")
    .put(auth, cartController.clearCart);

module.exports = router;