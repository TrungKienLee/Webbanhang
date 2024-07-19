/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    ".public/index.html"
  ],

   theme: {
    fontFamily: {
      main: ['Poppins', 'sans-serif;']
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman'
    },
    extend: {
      width: {
        main: '1220px'
      },
      backgroundColor: {
        main: '#ee3131',
        overlay: 'rgba(0,0,0,0.8)'
      },
      colors: {
        main: '#ee3131'
      },
      
    },
  },
  plugins: [
  
  ],
  
}