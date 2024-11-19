/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-light-red': 'rgb(170, 22, 38)',
        'custom-red': 'rgb(146, 21, 37)',
        'custom-black': 'rgb(24, 26, 27)',
        'custom-blue': 'rgb(45, 86, 154)',
         // Add custom color here
      },
      backgroundImage: {
        
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

