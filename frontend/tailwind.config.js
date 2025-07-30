module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#a259ff',
        secondary: '#3f2b96',
        glass: 'rgba(255,255,255,0.08)',
      },
      boxShadow: {
        neon: '0 0 20px #a259ff, 0 0 40px #3f2b96',
      },
    },
  },
  plugins: [],
}; 