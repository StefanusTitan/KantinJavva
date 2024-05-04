const express = require('express');
const reviewController = require('../controllers/reviewControllers');
// const isAdmin = require('./../middleware/isAdmin');
const auth = require('./../middleware/auth');

const router = express.Router();

router
    .route("/addReview")
    .post(auth, reviewController.createReview);

router
    .route("/")
    .get(auth, reviewController.getReviews);

router
    .route("/:id")
    .get(auth, reviewController.getReviewById)
    .delete(auth, reviewController.deleteReview);
    
module.exports = router;