/** @type {import('tailwindcss').Config} */
export default {
  content: ["./views/**/*.hbs", "./public/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        typerush: {
          purple: "#6b21a8",
          dark: "#111827",
        },
      },
    },
  },
  plugins: [],
};
