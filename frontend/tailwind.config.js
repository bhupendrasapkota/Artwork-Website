/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        animation: {
          rotateSpin: "rotateSpin 1s linear infinite",
        },
        keyframes: {
          rotateSpin: {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
        },
        height: {
          50: "12.5rem", // Adjust this value if needed (this is 200px)
        },
      },
    },
    plugins: [require("tailwind-scrollbar")],
  };
  