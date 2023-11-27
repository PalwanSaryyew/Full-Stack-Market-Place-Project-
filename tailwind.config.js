/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}", "./public/**/*.{html,js,ejs,svg}"],
  theme: {
    extend: {
      keyframes: {
        newMessage: {
          '10%':{
            maxHeight: "200px",
            maxWidth: "640px",
            padding: '5px',
            marginTop: '5px'
          },
          '90%':{
            maxHeight: "200px",
            maxWidth: "640px",
            padding: '5px',
            marginTop: '5px'
          },
          '100%': {
            display: 'none',
            maxHeight: "0",
            maxWidth: "0",
            padding: '0',
            marginTop: '0'
          },
        }
      },
      animation: {
        newMessage: 'newMessage 6s forwards',
      }
    },
  },
  plugins: [],
}