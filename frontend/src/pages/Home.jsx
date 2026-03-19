import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle, XCircle, Loader, Search, Home as HomeIcon } from 'lucide-react';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/rooms');
        setRooms(data);
        setFilteredRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    const results = rooms.filter(room =>
      room.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRooms(results);
  }, [searchTerm, rooms]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24">
      <Loader className="animate-spin text-primary mb-4" size={50} />
      <p className="text-gray-500 font-bold animate-pulse">FINDING BEST ROOMS...</p>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-[#111827]">
      {/* Hero Section */}
      <div className="bg-white dark:bg-[#111827] py-16 px-6 text-center border-b dark:border-gray-800">
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-tight uppercase italic">
          Room <span className="text-primary">Adda</span>
        </h1>
        <div className="relative max-w-2xl mx-auto group">
          <input 
            type="text" 
            placeholder="Search city (Maharajganj, Lucknow...)" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-6 pr-6 py-5 bg-white dark:bg-[#1F2937] shadow-2xl rounded-2xl outline-none border-2 border-transparent focus:border-success text-gray-800 dark:text-white text-lg transition-all"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredRooms.map(room => (
            <div key={room._id} className="bg-white dark:bg-[#1F2937] rounded-[2.5rem] shadow-xl overflow-hidden group border dark:border-gray-800 transition-all hover:scale-[1.02]">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={room.images[0]?.startsWith('http') ? room.images[0] : `http://localhost:5000/${room.images[0]}`} 
                  alt={room.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-5 left-5 bg-primary text-gray-900 px-4 py-1 rounded-xl font-black text-xs uppercase italic shadow-lg">
                  {room.category}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase italic truncate mb-2">{room.title}</h3>
                <p className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-bold mb-6">
                  <MapPin size={18} className="text-danger" /> {room.city}
                </p>

                <div className="flex justify-between items-center pt-6 border-t dark:border-gray-800">
                  <span className="text-2xl font-black text-gray-900 dark:text-white italic">₹{room.price}</span>
                  {/* ID FIX HERE: room._id is used */}
                  <Link 
                    to={`/room/${room._id}`} 
                    className="bg-gray-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-2xl font-black text-xs hover:bg-primary transition-all shadow-lg"
                  >
                    VIEW DETAILS
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;