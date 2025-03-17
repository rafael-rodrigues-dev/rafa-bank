/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#1A1A1A',
        'card': '#262626',
        'accent': '#8B5CF6',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A0A0A0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}; 