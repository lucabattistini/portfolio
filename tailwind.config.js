module.exports = {
  content: [
    './src/common/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto Mono', 'sans-serif'],
    },
    extend: {
      keyframes: {
        hello: {
          '0%, 10%': { transform: 'rotate(0deg)' },
          '5%': { transform: 'rotate(20deg)' },
        },
        back: {
          '0%, 10%': { transform: 'translateX(0)' },
          '5%': { transform: 'translateX(-12px)' },
        },
      },
      animation: {
        hello: 'hello 5s ease-in-out infinite',
        back: 'back 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
