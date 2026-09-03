/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050507',
        surface: '#0a0a0e',
        'surface-elevated': '#121218',
        accent: {
          gold: '#c5a880',
          silver: '#d1d5db',
          chrome: '#f3f4f6',
          burgundy: '#4a0e1c',
          glow: '#8b1d38'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glass-luxury': '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(197, 168, 128, 0.08)',
        'glow-gold': '0 0 25px rgba(197, 168, 128, 0.25)',
        'glow-burgundy': '0 0 30px rgba(139, 29, 56, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
