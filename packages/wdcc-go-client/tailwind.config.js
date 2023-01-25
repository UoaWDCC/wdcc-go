/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      display: ["Montserrat"],
      body: ["Open Sans"],
    },
    colors: {
      wdcc: {
        blue: {
          100: "#087DF1",
          200: "#085DD1"
        },
        dark_blue: "#03045E",
        purple: "#7209B7",
        yellow: "#FFD166",
        bg_dark: "#183249",
        bg_light: "#EFF8FA",
        white: "white",
        black: "black",
      },
    },
  },
  plugins: [],
};
