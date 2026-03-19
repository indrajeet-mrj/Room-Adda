import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages & Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AddRoom from './pages/AddRoom';
import RoomDetails from './pages/RoomDetails';
import MyListings from './pages/MyListings';
import EditRoom from './pages/EditRoom';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-[#111827] transition-colors duration-300">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/room/:id" element={<RoomDetails />} />

            {/* Protected Routes */}
            <Route 
              path="/add-room" 
              element={isAuthenticated ? <AddRoom /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/my-listings" 
              element={isAuthenticated ? <MyListings /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/edit-room/:id" 
              element={isAuthenticated ? <EditRoom /> : <Navigate to="/login" />} 
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="border-t dark:border-gray-800 py-10 text-center text-gray-500 dark:text-gray-400">
          <p className="font-bold">© 2026 ROOM ADDA | Built with ❤️ by Indrajeet</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;