const mongoose = require("mongoose");

// Define the schema for the category
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true }
});

// Create the model for the category
const Category = mongoose.model('Category', categorySchema, 'kategoriItem');

// Define the schema for the item
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to the Category model
    image: { type: String }
});

// Create the model for the item
const Item = mongoose.model('Item', itemSchema, 'item');

module.exports = { Item, Category }; // Export both models