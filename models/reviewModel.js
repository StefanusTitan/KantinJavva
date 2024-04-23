const mongoose = require("mongoose");

// Define the schema for the review
const reviewSchema = new mongoose.Schema({
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String }
});

const Review = mongoose.model('Review', reviewSchema, 'reviews');

module.exports = Review;
