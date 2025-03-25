/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./inance-html/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'flooring': {
          primary: '#2C3E50',    // Deep blue-gray
          secondary: '#E67E22',  // Warm orange
          accent: '#27AE60',     // Forest green
          light: '#ECF0F1',      // Light gray
          dark: '#2C3E50',       // Dark blue-gray
          // New expanded color palette
          terracotta: '#D35400',   // Earthy terracotta
          sand: '#F9E79F',         // Warm sand color
          teal: '#1ABC9C',         // Teal accent
          burgundy: '#922B21',     // Rich burgundy
          slate: '#7F8C8D',        // Neutral slate
          cream: '#FEF5E7',        // Soft cream
          navy: '#34495E',         // Deep navy
          moss: '#7D9D5C',         // Moss green
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-light': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '3rem',
        'blob': '60% 40% 40% 60% / 60% 30% 70% 40%',
        'blob-2': '40% 60% 60% 40% / 40% 70% 30% 60%',
      },
      boxShadow: {
        'inner-lg': 'inset 0 4px 10px 0 rgba(0, 0, 0, 0.1)',
        'glow': '0 0 15px rgba(231, 126, 34, 0.5)',
        'glow-accent': '0 0 15px rgba(39, 174, 96, 0.5)',
      },
    },
  },
  plugins: [],
}