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
      colors: {
        theme: {
          background: 'var(--color-background)',
          'background-secondary': 'var(--color-background-secondary)',
          'text-primary': 'var(--color-text-primary)',
          'text-secondary': 'var(--color-text-secondary)',
          'text-muted': 'var(--color-text-muted)',
          accent: 'var(--color-accent)',
          'accent-hover': 'var(--color-accent-hover)',
          border: 'var(--color-border)',
          cursor: 'var(--color-cursor-bg)',
          'cursor-blend': 'var(--color-cursor-blend)',
          button: 'var(--color-button-bg)',
          'button-text': 'var(--color-button-text)',
          'button-hover': 'var(--color-button-hover)',
          particles: 'var(--color-particles-bg)',
          loader: 'var(--color-loader-text)',
        },
      },
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
