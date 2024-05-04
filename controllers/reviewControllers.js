const Review = require('../models/reviewModel');
const Transaction = require('../models/transactionModel');
// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { transaction, rating, comment } = req.body;

        // Check if the transaction exists
        // You might want to add more validation here, like checking if the transaction belongs to the user making the review
        const transactionExists = await Transaction.findById(transaction);
        if (!transactionExists) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        // Check if a review for the transaction already exists
        const existingReview = await Review.findOne({ transaction });
        if (existingReview) {
            return res.status(400).json({ error: "Review already exists for this transaction" });
        }

        const newReview = new Review({
            transaction,
            rating,
            comment
        });

        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// Read reviews
exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get a review by ID
exports.getReviewById = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update a review
// exports.updateReview = async (req, res) => {
//     try {
//         const { rating, comment } = req.body;
//         const { id } = req.params;

//         const updatedReview = await Review.findByIdAndUpdate(id, { rating, comment }, { new: true });

//         if (!updatedReview) {
//             return res.status(404).json({ error: "Review not found" });
//         }

//         res.status(200).json(updatedReview);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

// Delete a review by ID
exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedReview = await Review.findByIdAndDelete(id);

        if (!deletedReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};