const Cart = require('../models/cartModel');
const { Item, _ } = require('../models/itemModel');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.item');
        res.status(200).json({ message: 'Successfully retrieved cart', data: cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addItemToCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        const item = await Item.findById(req.body.itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Check if the item is already in the cart
        const cartItem = cart.items.find(i => i.item.toString() === req.body.itemId);
        if (cartItem) {
            // If the item is already in the cart, update its quantity
            cartItem.quantity += req.body.quantity;
        } else {
            // If the item is not in the cart, add it
            cart.items.push({ item: req.body.itemId, quantity: req.body.quantity });
        }

        const updatedCart = await cart.save();
        res.status(200).json({ message: 'Item added to cart successfully', data: updatedCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Remove an item from the cart
exports.removeItemFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        // Filter out the item to be removed
        cart.items = cart.items.filter(i => i.item.toString() !== req.body.itemId);

        const updatedCart = await cart.save();
        res.status(200).json({ message: 'Item removed from cart successfully', data: updatedCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Remove a specified quantity from a certain item
exports.removeQuantityFromItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        // Find the item
        const cartItem = cart.items.find(i => i.item.toString() === req.body.itemId);
        if (cartItem) {
            // If the item is in the cart, decrease its quantity
            cartItem.quantity -= req.body.quantity;
            // If the quantity becomes 0 or less, remove the item from the cart
            if (cartItem.quantity <= 0) {
                cart.items = cart.items.filter(i => i.item.toString() !== req.body.itemId);
            }
        }

        const updatedCart = await cart.save();
        res.status(200).json({ message: 'Quantity removed from item successfully', data: updatedCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Clear the cart
exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        // Remove all items from the cart
        cart.items = [];

        const updatedCart = await cart.save();
        res.status(200).json({ message: 'Cart cleared successfully', data: updatedCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
