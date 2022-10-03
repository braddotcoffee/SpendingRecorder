/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "bg-violet-600",
    "bg-violet-700",
    "bg-violet-800",
    "bg-gray-600",
    "bg-gray-700",
    "bg-gray-800",
  ]
}
