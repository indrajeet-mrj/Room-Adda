import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Loader } from 'lucide-react';

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '', description: '', city: '', price: '', address: '', contactNumber: ''
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/rooms/${id}`);
        setFormData(data);
        setLoading(false);
      } catch (error) {
        alert("Room fetch failed");
        navigate('/my-listings');
      }
    };
    fetchRoom();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/rooms/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Room updated successfully!");
      navigate('/my-listings');
    } catch (error) {
      alert("Update failed");
    }
  };

  if (loading) return <div className="text-center py-20"><Loader className="animate-spin mx-auto text-primary" size={48}/></div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 mb-6">
        <ArrowLeft size={20} /> Cancel Edit
      </button>
      
      <div className="bg-white dark:bg-darkCard p-8 rounded-[2.5rem] shadow-xl border dark:border-gray-800">
        <h2 className="text-3xl font-black dark:text-white mb-8 italic uppercase">Edit Room Details</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            type="text" placeholder="Title" value={formData.title}
            className="w-full p-4 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-2xl dark:text-white"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <input 
            type="number" placeholder="Price" value={formData.price}
            className="w-full p-4 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-2xl dark:text-white"
            onChange={(e) => setFormData({...formData, price: e.target.value})}
          />
          <input 
            type="text" placeholder="City" value={formData.city}
            className="w-full p-4 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-2xl dark:text-white"
            onChange={(e) => setFormData({...formData, city: e.target.value})}
          />
          <input 
            type="text" placeholder="Contact Number" value={formData.contactNumber}
            className="w-full p-4 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-2xl dark:text-white"
            onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
          />
          <textarea 
            placeholder="Description" value={formData.description}
            className="w-full p-4 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-2xl dark:text-white md:col-span-2 h-32"
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          ></textarea>
          
          <button className="md:col-span-2 bg-success text-white py-4 rounded-2xl font-bold text-xl flex items-center justify-center gap-2 hover:scale-95 transition">
            <Save size={24} /> SAVE CHANGES
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRoom;