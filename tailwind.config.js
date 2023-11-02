/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jalnan: ["Jalnan"],
        pretendard: ["Pretendard-Bold"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
