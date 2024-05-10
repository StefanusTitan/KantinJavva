const Transaction = require("../models/transactionModel");
const Meja = require("../models/mejaModel");
const Cart = require("../models/cartModel");
const Booking = require("../models/bookingModel");

exports.bookTable = async (req, res) => {
    try {
        // Find the user's cart
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.item');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Please add at least one item to the cart before booking a table' });
        }

        // Find the table
        const table = await Meja.findById(req.body.tableId);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }

        // Check if the table is already reserved
        if (table.status === 'reserved') {
            return res.status(400).json({ message: 'Table is already reserved' });
        }

        // Calculate the total price based on the price of the items and their quantities
        let totalPrice = 0;
        cart.items.forEach(item => {
            totalPrice += item.item.price * item.quantity;
        });

        // Create a new transaction
        const transaction = new Transaction({
            user: req.user.id,
            date: Date.now(),
            table: table._id,
            price: totalPrice,
            status: 'pending',
            transactionDetail: cart.items.map(item => ({
                item: item.item._id,
                quantity: item.quantity
            }))
        });

        // Save the transaction
        const newTransaction = await transaction.save();

        // Update the table status to 'reserved'
        table.status = 'reserved';
        await table.save();

        res.status(201).json({ message: 'Table booked successfully', data: newTransaction });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createBooking = async (req, res) => {
    try {
        const table = await Meja.findById(req.body.tableId);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }

        // Check if the table is already reserved
        if (table.status === 'reserved') {
            return res.status(400).json({ message: 'Table is already reserved' });
        }

        // Update the table status to 'reserved'
        table.status = 'reserved';
        await table.save();

        const booking = new Booking({
            user: req.user.id,
            table: table._id,
            date: req.body.date || Date.now()
        });

        const newBooking = await booking.save();

        res.status(201).json({ message: 'Booking created successfully', data: newBooking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndRemove(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}