const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// 1. Environment Variables Config
dotenv.config();

const app = express();

// 2. Middleware Setup
app.use(cors()); // Frontend aur Backend ko connect karne ke liye
app.use(express.json()); // JSON data read karne ke liye
app.use(express.urlencoded({ extended: true })); // Form data ke liye

// 3. Static Folder Setup (Images dikhane ke liye)
// Isse browser mein http://localhost:5000/uploads/image.jpg khulega
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4. API Routes
// Note: Ensure karein ki ye files aapke routes folder mein isi naam se hain
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/rooms', require('./routes/roomRoutes'));

// 5. MongoDB Connection Logic
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/RoomAdda';

mongoose.connect(dbURI)
    .then(() => {
        console.log('------------------------------------');
        console.log('✅ MongoDB Connected Successfully!');
        console.log(`📂 Database: ${mongoose.connection.name}`);
        console.log('------------------------------------');
    })
    .catch(err => {
        console.log('------------------------------------');
        console.log('❌ MongoDB Connection Error:');
        console.error(err.message);
        console.log('------------------------------------');
    });

// 6. Base Route (Test karne ke liye)
app.get('/', (req, res) => {
    res.send('Room Adda API is running...');
});

// 7. Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// 8. Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
    console.log(`🔗 Local Link: http://localhost:${PORT}`);
});