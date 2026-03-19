import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowRight, Home } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    phone: '' 
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      // Success Alert
      alert(`Swagat hai, ${res.data.name}! Registration successful.`);

      // Token aur User Data save karna (Profile dikhane ke liye zaroori hai)
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));

      // Home page par bhej dena
      navigate('/');
      
      // Page refresh taaki Navbar user data fetch kar sake
      window.location.reload();
      
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] px-4 bg-gray-50 dark:bg-[#111827] transition-colors duration-300">
      {/* Registration Card */}
      <div className="bg-white dark:bg-[#1F2937] p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-lg border dark:border-gray-800 relative overflow-hidden">
        
        {/* Top Decoration */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-green-500 to-red-500"></div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 text-primary">
            <Home size={32} />
          </div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Create Account</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Join Room Adda today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name Field */}
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 text-gray-800 dark:text-white transition-all"
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>

          {/* Email Field */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 text-gray-800 dark:text-white transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>

          {/* Phone Field */}
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-success transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Phone Number" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl outline-none focus:border-success focus:ring-4 focus:ring-success/10 text-gray-800 dark:text-white transition-all"
              onChange={(e) => setFormData({...formData, phone: e.target.value})} 
              required 
            />
          </div>

          {/* Password Field */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-danger transition-colors" size={20} />
            <input 
              type="password" 
              placeholder="Password (Min. 6 chars)" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl outline-none focus:border-danger focus:ring-4 focus:ring-danger/10 text-gray-800 dark:text-white transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
              minLength="6"
            />
          </div>

          {/* Register Button (Yellow/Primary) */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-yellow-500 text-gray-900 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-95 shadow-xl shadow-yellow-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "CREATING ACCOUNT..." : "REGISTER NOW"}
            <ArrowRight size={22} />
          </button>
        </form>

        <div className="mt-8 text-center border-t dark:border-gray-700 pt-6">
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Already a member? 
            <Link to="/login" className="ml-2 text-success font-black hover:underline decoration-2 underline-offset-4">
              LOGIN HERE
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;