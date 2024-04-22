const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    quantity: { type: Number, default: 1 }
});

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema]
});

const Cart = mongoose.model('Cart', cartSchema, 'cart');

module.exports = Cart;
