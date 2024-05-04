const mongoose = require("mongoose");

// Define the schema for the review
const reviewSchema = new mongoose.Schema({
    transaction: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
    // transaction: { type: String }, // for test
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String }
});

const Review = mongoose.model('Review', reviewSchema, 'reviews');

module.exports = Review;
