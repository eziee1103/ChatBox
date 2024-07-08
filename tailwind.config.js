/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1476ff",
        secondary: "#f3f5ff",
        light: "#f9faff",
        usred: "#B31942",
        usblue: "#0A3161",
        glacier: "#ffffff1a",
      },
      backgroundImage: {
        "my-gradient": "linear-gradient(102deg, #B31942 2.11%, #0A3161 100%)",
        "my-gradient-top":
          "linear-gradient(200deg, #B31942 2.11%, #0A3161 100%)",
      },
    },
  },
  plugins: [],
};
