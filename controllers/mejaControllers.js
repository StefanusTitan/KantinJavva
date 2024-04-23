const Meja = require("../models/mejaModel");

exports.tambahMeja = async (req, res) => {
    const meja = new Meja({
        number: req.body.number,
        status: req.body.status
    });

    try {
        const newMeja = await meja.save();
        res.status(201).json({ message: 'Meja created successfully', data: newMeja });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete a table
exports.hapusMeja = async (req, res) => {
    try {
        const meja = await Meja.findByIdAndRemove(req.params.id);
        if (!meja) return res.status(404).json({ message: 'Table not found' });
        res.status(200).json({ message: 'Table deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a table status
exports.updateStatusMeja = async (req, res) => {
    try {
        // Valid statuses for the table
        const validStatuses = ['available', 'reserved'];

        // Check if the status sent in the request is valid
        if (!validStatuses.includes(req.body.status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const meja = await Meja.findByIdAndUpdate(req.body.mejaId, { status: req.body.status }, { new: true });
        if (!meja) return res.status(404).json({ message: 'Table not found' });
        res.status(200).json({ message: 'Table status updated successfully', data: meja });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all tables
exports.semuaMeja = async (req, res) => {
    try {
        const meja = await Meja.find();
        res.status(200).json({ message: 'Successfully retrieved all tables', data: meja });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get only 'available' tables
exports.mejaTersedia = async (req, res) => {
    try {
        const meja = await Meja.find({ status: 'available' });
        res.status(200).json({ message: 'Successfully retrieved available tables', data: meja });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


