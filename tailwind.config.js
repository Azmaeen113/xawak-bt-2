/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textShadow: {
        DEFAULT: '0 0 5px rgba(255, 215, 0, 0.5)',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        space: {
          black: '#000000',
          blue: '#1E3A8A',
          purple: '#6A0DAD',
          gold: '#FFD700',
        },
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scroll': 'scroll 2s ease-in-out infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'particle-move': 'particle-move 4s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
          '50%': {
            opacity: 0.5,
            transform: 'scale(1.05)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        scroll: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(10px)',
          },
        },
        'particle-move': {
          '0%': { opacity: 0, transform: 'translate(-50%, -50%) rotate(var(--rotation)) translateX(50%)' },
          '20%': { opacity: 1, transform: 'translate(-50%, -50%) rotate(var(--rotation)) translateX(100%)' },
          '80%': { opacity: 1, transform: 'translate(-50%, -50%) rotate(var(--rotation)) translateX(200%)' },
          '100%': { opacity: 0, transform: 'translate(-50%, -50%) rotate(var(--rotation)) translateX(250%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: theme('textShadow.DEFAULT'),
        },
      };
      addUtilities(newUtilities);
    },
  ],
};