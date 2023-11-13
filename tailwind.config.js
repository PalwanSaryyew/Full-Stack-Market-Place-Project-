/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}", "./public/**/*.{html,js,ejs,svg}"],
  theme: {
    extend: {
      keyframes: {
        newMessage: {
          '100%': { display: 'none' },
        }
      },
      animation: {
        newMessage: 'newMessage 6s forwards',
      }
    },
  },
  plugins: [],
}