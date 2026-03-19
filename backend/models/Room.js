const mongoose = require('mongoose');

const roomSchema = mongoose.Schema(
  {
    // Kis user ne ye room post kiya hai (User model se link)
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title for the room'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    address: {
      type: String,
      required: [true, 'Please add the full address'],
    },
    city: {
      type: String,
      required: [true, 'Please add the city name'],
    },
    price: {
      type: Number,
      required: [true, 'Please add the monthly rent price'],
    },
    category: {
      type: String,
      required: true,
      enum: ['Room', 'Flat', 'PG', 'Shop'], // Sirf inme se hi select ho sakega
      default: 'Room',
    },
    amenities: {
      type: [String], // Example: ['WiFi', 'Parking', 'AC']
      default: [],
    },
    images: {
      type: [String], // Cloudinary ke URLs save honge yahan
      required: [true, 'Please upload at least one image'],
    },
    status: {
      type: String,
      required: true,
      enum: ['Available', 'Booked'],
      default: 'Available',
    },
    contactNumber: {
      type: String,
      required: [true, 'Please add a contact number for inquiries'],
    }
  },
  {
    timestamps: true, // createdAt aur updatedAt apne aap ban jayenge
  }
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;