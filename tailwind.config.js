/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}','node_modules/daisyui/dist/**/*.js', 
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/react-daisyui/dist/**/*.js'
  ],

  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
}
