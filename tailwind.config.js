/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Lora"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Deep academic navy — primary brand color
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#627d98',
          500: '#486581',
          600: '#334e68',
          700: '#243b53',
          800: '#102a43',
          900: '#0a1929',
        },
        // Lecturer / fixed classes
        lecture: {
          DEFAULT: '#1c1c1c',
          soft: '#f4f4f5',
        },
        // Self-study / personal — deep academic green (not neon)
        study: {
          DEFAULT: '#1f6d4c',
          soft: '#e8f3ee',
          dark: '#3fa578',
        },
        // Break column
        recess: {
          DEFAULT: '#c7ccd1',
          soft: '#eceef0',
        },
        parchment: '#faf9f6',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 42, 67, 0.06), 0 1px 1px rgba(16, 42, 67, 0.04)',
      },
    },
  },
  plugins: [],
}
