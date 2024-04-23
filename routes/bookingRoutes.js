const express = require('express');
const bookingController = require('../controllers/bookingControllers');
const isAdmin = require('./../middleware/isAdmin');
const auth = require('./../middleware/auth');

const router = express.Router();

router
    .route("/addBooking")
    .post(auth, bookingController.createBooking);

router
    .route("/bookTableAndPurchase")
    .post(auth, bookingController.bookTable);

router
    .route("/deleteBooking/:id'")
    .delete(auth, isAdmin, bookingController.deleteBooking);
    
module.exports = router;
