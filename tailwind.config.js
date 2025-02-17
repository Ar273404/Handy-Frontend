/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      extend: {
        colors: {
          lightBlue: '#3B82F6', // Tailwind's blue-500
          darkBlue: '#1E3A8A',  // Tailwind's blue-800
          yellow: '#F59E0B',    // Tailwind's amber-500
        },
      },
    },
  },
  plugins: [],
}

