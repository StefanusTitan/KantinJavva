const express = require('express');
const transactionController = require('../controllers/transactionControllers');
const auth = require('./../middleware/auth');
const isAdmin = require('./../middleware/isAdmin')

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

router
    .route("/getAllTransactions")
    .get(auth, isAdmin, transactionController.getAllTransactions);

router
    .route("/getCurrentUserTransactions")
    .get(auth, transactionController.getUserTransaction);

module.exports = router;