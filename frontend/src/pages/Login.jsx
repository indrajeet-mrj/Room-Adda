// src/pages/Login.jsx (Full Code)
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Ye dono cheezein save karna zaroori hai
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data)); // Pura user object save karein
      
      alert(`Welcome back, ${data.name}!`);
      navigate('/');
      window.location.reload(); // Page refresh taaki Navbar user ko detect kare
    } catch (err) {
      alert(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="bg-white dark:bg-darkCard p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md border dark:border-gray-800">
        <h2 className="text-4xl font-black mb-2 text-gray-900 dark:text-primary text-center italic">Login</h2>
        <p className="text-center text-gray-500 mb-10 font-medium">Get back to finding your room</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full pl-12 p-4 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-2xl outline-none focus:border-primary text-gray-800 dark:text-white"
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full pl-12 p-4 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-2xl outline-none focus:border-primary text-gray-800 dark:text-white"
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button className="w-full bg-primary text-gray-950 py-4 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-yellow-500/20">
            SIGN IN
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 font-medium">
          New to Room Adda? <Link to="/register" className="text-success font-bold hover:underline italic">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;