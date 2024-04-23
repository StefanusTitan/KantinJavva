const express = require('express');
const transactionController = require('../controllers/transactionControllers');
const auth = require('./../middleware/auth');

const router = express.Router();

router
    .route("/addTransaction")
    .post(auth, transactionController.addTransaction);

router
    .route("/simulatePayment")
    .post(auth, transactionController.simulatePayment);

router
    .route("/completeTransaction")
    .post(auth, transactionController.completeTransaction);

module.exports = router;