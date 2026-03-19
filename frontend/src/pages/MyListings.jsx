import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit, ExternalLink, Loader, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyListings = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRooms = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login first");
            return;
        }

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const { data } = await axios.get('http://localhost:5000/api/rooms/myrooms', config);
        setRooms(data);
      } catch (error) {
        console.error("Error fetching my rooms:", error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMyRooms();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm("Delete this room listing?")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/rooms/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRooms(rooms.filter(room => room._id !== id));
        alert("Deleted successfully");
      } catch (error) {
        alert("Failed to delete");
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24">
        <Loader className="animate-spin text-primary" size={50} />
        <p className="mt-4 dark:text-white font-bold tracking-widest uppercase">Fetching Your Posts...</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <h1 className="text-4xl md:text-5xl font-black dark:text-white italic uppercase tracking-tighter">My Listings</h1>
        <Link to="/add-room" className="bg-success text-white px-8 py-4 rounded-2xl flex items-center gap-2 font-black hover:scale-105 transition shadow-lg shadow-green-500/20">
          <PlusCircle size={24}/> ADD NEW ROOM
        </Link>
      </div>
      
      {rooms.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#1F2937] rounded-[3rem] border-2 border-dashed border-gray-700">
          <p className="text-gray-400 text-xl font-bold italic">No rooms posted yet by you.</p>
          <Link to="/add-room" className="text-primary font-black mt-4 block uppercase underline underline-offset-8">Start Hosting Now</Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {rooms.map(room => (
            <div key={room._id} className="bg-white dark:bg-[#1F2937] p-6 rounded-[2.5rem] shadow-xl border dark:border-gray-800 flex flex-col md:flex-row items-center gap-8 transition-all hover:border-primary">
              <img 
                src={room.images[0]?.startsWith('http') ? room.images[0] : `http://localhost:5000/${room.images[0]}`} 
                className="w-full md:w-44 h-44 object-cover rounded-[2rem] shadow-inner" 
                alt="room" 
              />
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-2xl font-black dark:text-white uppercase italic mb-1">{room.title}</h3>
                <p className="text-primary font-black text-2xl italic">₹{room.price} <span className="text-xs text-gray-500 not-italic uppercase tracking-widest ml-1">Per Month</span></p>
                <p className="text-sm text-gray-400 mt-3 font-bold uppercase flex items-center justify-center md:justify-start gap-1">
                   {room.city} • {room.category}
                </p>
              </div>
              
              <div className="flex gap-4 w-full md:w-auto justify-center">
                <Link to={`/room/${room._id}`} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl text-gray-600 dark:text-gray-300 hover:text-primary transition" title="View Detail">
                  <ExternalLink size={24} />
                </Link>
                <Link to={`/edit-room/${room._id}`} className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-500 hover:scale-110 transition" title="Edit Listing">
                  <Edit size={24} />
                </Link>
                <button 
                  onClick={() => deleteHandler(room._id)}
                  className="p-4 bg-red-50 dark:bg-red-900/30 rounded-2xl text-danger hover:scale-110 transition"
                  title="Delete Listing"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;