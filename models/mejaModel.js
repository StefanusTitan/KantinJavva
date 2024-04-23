const mongoose = require("mongoose");

// Define the schema for the category
const mejaSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    status: { type: String, enum: ['available', 'reserved'], default: 'available' }
});

const Meja = mongoose.model('Meja', mejaSchema, 'meja');

module.exports = Meja;