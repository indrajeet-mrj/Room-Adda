import React, { useState } from 'react';
import axios from 'axios';

const AddRoom = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: '', city: '', price: '', description: '', category: 'Room'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    // FormData object banaiye images ke liye
    const data = new FormData();
    data.append('title', formData.title);
    data.append('city', formData.city);
    data.append('price', formData.price);
    data.append('description', formData.description);
    
    // Multiple files add karein
    for (let i = 0; i < files.length; i++) {
      data.append('images', files[i]);
    }

    try {
      await axios.post('http://localhost:5000/api/rooms', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Room Posted Successfully! Green signal from Room Adda.");
    } catch (err) {
      alert("Error uploading room.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-success mb-8">Post Your Property</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-darkCard p-8 rounded-3xl shadow-xl">
        <input type="text" placeholder="Room Title" className="p-4 rounded-xl border dark:bg-gray-900 dark:border-gray-700" 
          onChange={(e) => setFormData({...formData, title: e.target.value})} />
        
        <input type="text" placeholder="City" className="p-4 rounded-xl border dark:bg-gray-900 dark:border-gray-700" 
          onChange={(e) => setFormData({...formData, city: e.target.value})} />

        <input type="number" placeholder="Price per month" className="p-4 rounded-xl border dark:bg-gray-900 dark:border-gray-700" 
          onChange={(e) => setFormData({...formData, price: e.target.value})} />

        <input type="file" multiple className="p-4 text-gray-400" 
          onChange={(e) => setFiles(e.target.files)} />

        <textarea placeholder="Full Description" className="md:col-span-2 p-4 h-32 rounded-xl border dark:bg-gray-900 dark:border-gray-700" 
          onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>

        <button className="md:col-span-2 bg-success text-white py-4 rounded-xl font-bold text-xl hover:bg-green-600 transition">
          List Room Now (Free)
        </button>
      </form>
    </div>
  );
};

export default AddRoom;