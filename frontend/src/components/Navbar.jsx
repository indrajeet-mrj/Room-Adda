import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, User, LogOut, Menu, X, PlusCircle, List } from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="bg-white/80 dark:bg-[#1F2937]/80 backdrop-blur-md border-b dark:border-gray-800 sticky top-0 z-50 px-6 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-black text-gray-900 dark:text-primary flex items-center gap-2 italic tracking-tighter">
          <span className="bg-gray-900 dark:bg-primary text-white dark:text-gray-900 px-3 py-1 rounded-2xl not-italic">RA</span>
          ROOM ADDA
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 font-bold text-sm">
          <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary transition uppercase tracking-widest">Explore</Link>
          
          {user && (
            <>
              <Link to="/my-listings" className="text-gray-600 dark:text-gray-300 hover:text-success flex items-center gap-1 transition uppercase tracking-widest">
                <List size={18} /> My Rooms
              </Link>
              <Link to="/add-room" className="bg-danger text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 hover:bg-red-600 transition shadow-lg shadow-red-500/20 uppercase">
                <PlusCircle size={18} /> Rent Room
              </Link>
            </>
          )}
          
          {/* Theme Toggle */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 hover:scale-110 transition border dark:border-gray-700"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* User Profile / Auth */}
          {user ? (
            <div className="flex items-center gap-4 ml-4">
              <div className="flex items-center gap-2 text-gray-800 dark:text-white bg-primary/10 border border-primary/20 px-4 py-2 rounded-2xl">
                <User size={18} className="text-primary" />
                <span>{user.name.split(' ')[0]}</span>
              </div>
              <button onClick={handleLogout} className="text-gray-400 hover:text-danger transition">
                <LogOut size={22} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-primary underline underline-offset-4">Login</Link>
              <Link to="/register" className="bg-success text-white px-8 py-3 rounded-2xl hover:shadow-xl hover:shadow-green-500/30 transition">
                JOIN FREE
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="text-yellow-500"><Sun size={24}/></button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="dark:text-white">
                {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 pb-6 px-2 border-t dark:border-gray-800 pt-6 animate-in slide-in-from-top duration-300">
            <Link to="/" onClick={()=>setIsMenuOpen(false)} className="block text-xl font-bold dark:text-white">Explore</Link>
            {user ? (
              <>
                <Link to="/my-listings" onClick={()=>setIsMenuOpen(false)} className="block text-xl font-bold text-success">My Rooms</Link>
                <Link to="/add-room" onClick={()=>setIsMenuOpen(false)} className="block text-xl font-bold text-danger">Rent a Room</Link>
                <button onClick={handleLogout} className="w-full text-left text-xl font-bold text-gray-500">Logout ({user.name})</button>
              </>
            ) : (
              <Link to="/login" onClick={()=>setIsMenuOpen(false)} className="block text-xl font-bold text-primary">Login / Register</Link>
            )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;