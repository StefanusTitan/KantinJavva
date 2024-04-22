const { Item, Category } = require("../models/itemModel");

exports.getAllMenuItems = async (req, res) => {
    try {
        const items = await Item.find().populate('category');
        res.status(200).json({ message: 'Successfully retrieved all menu items', data: items });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createCategory = async (req, res) => {
    const category = new Category({
        name: req.body.name
    });

    try {
        const newCategory = await category.save();
        res.status(201).json({ message: 'Category created successfully', data: newCategory });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.createItem = async (req, res) => {
    const item = new Item({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category
    });

    try {
        const newItem = await item.save();
        res.status(201).json({ message: 'Item created successfully', data: newItem });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}