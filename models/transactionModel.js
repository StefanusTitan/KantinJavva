const mongoose = require("mongoose");

// Define the schema for the transaction detail
const transactionDetailSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    quantity: { type: Number, required: true }
});

// Define the schema for the transaction
const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true, default: Date.now },
    table: { type: mongoose.Schema.Types.ObjectId, ref: 'Meja' },
    price: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'paid', 'completed'], default: 'pending' },
    payment_method: { type: String },
    review: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
    transactionDetail: [transactionDetailSchema]
});

const Transaction = mongoose.model('Transaction', transactionSchema, 'transaksi');

module.exports = Transaction;
