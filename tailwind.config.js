/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E1E1E',
        secondary: '#2F2F2F',
        tertiary: '#3F3F3F',
        quaternary: '#4F4F4F',
        quinary: '#5F5F5F',
        senary: '#6F6F6F',
        septenary: '#7F7F7F',
        octonary: '#8F8F8F',
        nonary: '#9F9F9F',
        denary: '#AFAFAF',
        white: '#FFFFFF',
        black: '#000000',
        red: '#FF0000',
        green: '#00FF00',
        blue: '#0000FF',
        yellow: '#FFFF00',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
      xxl: '1440px',
    },
  },
  plugins: [require('flowbite/plugin')],
};
