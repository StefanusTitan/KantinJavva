const mongoose = require("mongoose");

// Define the schema for the booking
const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    table: { type: mongoose.Schema.Types.ObjectId, ref: 'Meja', required: true },
    date: { type: Date, required: true, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema, 'bookings');

module.exports = Booking;
