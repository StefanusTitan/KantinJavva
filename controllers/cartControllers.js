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

