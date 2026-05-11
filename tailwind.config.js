/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6F0',
        blush: {
          50:  '#FDF6F3',
          100: '#F9E8E0',
          200: '#F2C9B8',
          300: '#E8A898',
          400: '#D98A78',
          500: '#C96E5C',
        },
        gold: {
          100: '#F5ECD1',
          200: '#E8D199',
          300: '#D4AF6A',
          400: '#C09A50',
          500: '#A07830',
        },
        charcoal: '#3D3535',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['Montserrat', 'sans-serif'],
        script: ['Great Vibes', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'slide-up': 'slideUp 1s ease-out forwards',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
