/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Ye line add karein
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Naye energetic colors definine karte hain
        primary: "#FBBF24",   // Yellow (Accent)
        success: "#22C55E",   // Green (Available/Verified)
        danger: "#EF4444",    // Red (Booked/Alert)
        darkBg: "#111827",    // Main Background (Gray-900)
        darkCard: "#1F2937",  // Card/Navbar Background (Gray-800)
      },
    },
  },
  plugins: [],
}