import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Phone, User, Calendar, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/rooms/${id}`);
        setRoom(data);
      } catch (error) {
        console.error("Error fetching room details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  if (loading) return <div className="text-center py-20 dark:text-white text-2xl">Loading Room Details...</div>;
  if (!room) return <div className="text-center py-20 dark:text-white text-2xl">Room not found!</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition">
        <ArrowLeft size={20} /> Back to Listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image Section */}
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border dark:border-gray-800 h-[500px]">
          <img 
            src={room.images[0]?.startsWith('http') ? room.images[0] : `http://localhost:5000/${room.images[0]}`} 
            className="w-full h-full object-cover" 
            alt={room.title}
          />
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">{room.title}</h1>
            <span className="bg-success/20 text-success px-4 py-1 rounded-full text-sm font-bold">
              {room.status}
            </span>
          </div>

          <p className="flex items-center gap-2 text-xl text-gray-500 dark:text-gray-400">
            <MapPin className="text-danger" /> {room.city}, {room.address}
          </p>

          <div className="bg-gray-100 dark:bg-darkCard p-6 rounded-3xl border dark:border-gray-800">
            <p className="text-sm text-gray-500 mb-1 font-bold uppercase tracking-widest">Monthly Rent</p>
            <p className="text-5xl font-black text-primary italic">₹{room.price}<span className="text-lg text-gray-400 not-italic font-normal"> / month</span></p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold dark:text-white border-b dark:border-gray-800 pb-2">Description</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              {room.description}
            </p>
          </div>

          {/* Owner & Contact Card */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700 space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-2xl text-primary">
                <User size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Posted By</p>
                <p className="font-bold text-lg dark:text-white">{room.owner?.name || "Verified Owner"}</p>
              </div>
            </div>

            <a 
              href={`tel:${room.contactNumber}`}
              className="w-full bg-success text-white py-4 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition shadow-xl shadow-green-500/20"
            >
              <Phone size={24} /> Contact Owner
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;