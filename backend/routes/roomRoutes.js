const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');

// Import Controllers (Destructuring)
const { 
    getRooms, 
    getRoomById, 
    getMyRooms, 
    createRoom, 
    updateRoom, 
    deleteRoom 
} = require('../controllers/roomController');

// Multer Setup
const upload = multer({ dest: 'uploads/' });

// Routes Definition
router.get('/', getRooms); // /api/rooms/
router.get('/myrooms', protect, getMyRooms); // /api/rooms/myrooms
router.get('/:id', getRoomById); // /api/rooms/:id
router.post('/', protect, upload.array('images', 5), createRoom);
router.put('/:id', protect, upload.array('images', 5), updateRoom);
router.delete('/:id', protect, deleteRoom);

module.exports = router;