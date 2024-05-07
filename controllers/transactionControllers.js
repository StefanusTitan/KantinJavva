const Transaction = require("../models/transactionModel");
const Meja = require("../models/mejaModel");
const Cart = require("../models/cartModel");

exports.addTransaction = async (req, res) => {
    try {
        let table;
        if (req.body.tableId) {
            // Find the table only if tableId is provided
            table = await Meja.findById(req.body.tableId);
            if (!table) {
                return res.status(404).json({ message: 'Table not found' });
            }
        }

        // Find the user's cart
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.item');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Please add at least one item to the cart' });
        }

        // Calculate the total price based on the price of the items and their quantities
        let totalPrice = 0;
        cart.items.forEach(item => {
            totalPrice += item.item.price * item.quantity;
        });

        // Create a new transaction
        const transaction = new Transaction({
            user: req.user.id,
            date: req.body.date || Date.now(), // Use the current date if no date is provided
            table: table ? table._id : undefined, // Use the table ID if a table is found
            price: totalPrice, // Use the calculated total price
            status: req.body.status,
            payment_method: req.body.payment_method || undefined,
            review: req.body.reviewId,
            transactionDetail: cart.items.map(item => ({
                item: item.item._id,
                quantity: item.quantity
            }))
        });

        // Save the transaction
        const newTransaction = await transaction.save();

        // Clear the cart
        cart.items = [];
        await cart.save();

        res.status(201).json({ message: 'Transaction created successfully', data: newTransaction });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.simulatePayment = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.body.transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Update the payment method and status
        transaction.payment_method = req.body.payment_method;
        transaction.status = 'paid';

        const updatedTransaction = await transaction.save();
        res.status(200).json({ message: 'Payment simulated successfully', data: updatedTransaction });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.completeTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.body.transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Update the status
        transaction.status = 'completed';

        const updatedTransaction = await transaction.save();
        res.status(200).json({ message: 'Transaction completed successfully', data: updatedTransaction });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        if (!transactions) {
            return res.status(404).json({ message: 'No transactions found' });
        }
        res.status(200).json({ message: 'Transactions retrieved successfully', data: transactions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getUserTransaction = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id });
        if (!transactions) {
            return res.status(404).json({ message: 'No transactions found for this user' });
        }
        res.status(200).json({ message: 'User transactions retrieved successfully', data: transactions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}