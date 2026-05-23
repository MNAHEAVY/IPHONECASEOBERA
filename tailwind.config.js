/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // 👇 ACÁ VA
  safelist: [
    {
      pattern:
        /(bg|ring)-(amber|blue|cyan|emerald|fuchsia|gray|green|indigo|lime|neutral|orange|pink|purple|red|rose|sky|slate|stone|teal|violet|yellow|zinc)-(200|300|400|500|600|700|800)/,
    },
    {
      pattern: /(bg|ring)-(black|white|green|red|orange|pink|blue|gray)/,
    },
  ],

  theme: {
    extend: {
      animation: {
        spin: "spin 1s linear infinite",
        fade: "fade 1.5s infinite",
      },
      keyframes: {
        fade: {
          "0%, 100%": { opacity: 0 },
          "50%": { opacity: 1 },
        },
      },
    },
  },

  plugins: [],
};
