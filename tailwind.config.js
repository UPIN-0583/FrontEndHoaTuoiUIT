/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}", // Nếu dùng App Router
      "./pages/**/*.{js,ts,jsx,tsx}", // Nếu dùng Pages Router
      "./components/**/*.{js,ts,jsx,tsx}",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
  };
  