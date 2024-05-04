const { Item, Category } = require("../models/itemModel");
const upload = require('../middleware/multer');


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

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            category.name = req.body.name || category.name;

            const updatedCategory = await category.save();
            res.status(200).json({ message: 'Category updated successfully', data: updatedCategory });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createItem = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      const item = new Item({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.file.path
      });
  
      const newItem = await item.save();
      res.status(201).json({ message: 'Item created successfully', data: newItem });
    } catch (error) {
      res.status(400).json({ message: error.message });
      log.error(error.message);
    }
  }
  
  exports.updateItem = async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      if (item) {
        item.name = req.body.name || item.name;
        item.price = req.body.price || item.price;
        item.description = req.body.description || item.description;
        item.category = req.body.category || item.category;
        if (req.file) {
          item.image = req.file.path;
        }
        const updatedItem = await item.save();
        res.status(200).json({ message: 'Item updated successfully', data: updatedItem });
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  exports.updateItem = async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      if (item) {
        item.name = req.body.name || item.name;
        item.price = req.body.price || item.price;
        item.description = req.body.description || item.description;
        item.category = req.body.category || item.category;
        if (req.file) {
          item.image = req.file.path; // Update the image path if a new image is uploaded
        }
        const updatedItem = await item.save();
        res.status(200).json({ message: 'Item updated successfully', data: updatedItem });
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


// Delete an item
exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (item) {
            await item.remove();
            res.status(200).json({ message: 'Item deleted successfully' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a single item
exports.getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('category');
        if (item) {
            res.status(200).json({ message: 'Successfully retrieved item', data: item });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
