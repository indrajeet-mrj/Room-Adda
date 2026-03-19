const Room = require('../models/Room');
const fs = require('fs');

// 1. Get All Rooms
exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.find().sort({ createdAt: -1 });
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Get Single Room
exports.getRoomById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || id === 'undefined' || id.length !== 24) {
            return res.status(400).json({ message: "Invalid Room ID" });
        }
        const room = await Room.findById(id).populate('owner', 'name email phone');
        if (room) res.json(room);
        else res.status(404).json({ message: "Room not found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Get My Rooms
exports.getMyRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ owner: req.user._id }).sort({ createdAt: -1 });
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Create Room
exports.createRoom = async (req, res) => {
    try {
        const { title, description, address, city, price, category, contactNumber } = req.body;
        let imageUrls = req.files ? req.files.map(file => file.path) : [];
        const room = new Room({
            owner: req.user._id, title, description, address, city, price, category, contactNumber, images: imageUrls
        });
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 5. Update Room
exports.updateRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 6. Delete Room
exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        await room.deleteOne();
        res.json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};