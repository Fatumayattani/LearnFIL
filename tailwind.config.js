/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfcfb',
          100: '#f8f6f3',
          200: '#f1ede6',
          300: '#e9e3d9',
          400: '#e0d8cc',
          500: '#d7cebf',
        },
        beige: {
          50: '#faf8f5',
          100: '#f5f1ea',
          200: '#e8e0d3',
          300: '#dbcfbc',
          400: '#cebea5',
          500: '#c1ad8e',
        },
        blob: {
          50: '#fef5f8',
          100: '#fde6ee',
          200: '#fbc5dc',
          300: '#f8a3cb',
          400: '#f582b9',
          500: '#f261a8',
        },
        sunshine: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
        },
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
        },
        redwood: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#7f1d1d',
          500: '#5c1919',
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        'full': '9999px',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
        '5': '5px',
        '6': '6px',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
