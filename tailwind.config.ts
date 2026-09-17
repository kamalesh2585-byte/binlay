import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f4f2',
          100: '#dbe5e0',
          200: '#b8d0c8',
          300: '#8eb5a8',
          400: '#5d9880',
          500: '#2d7860',
          600: '#1f5a47',
          700: '#164738',
          800: '#10342b',
          900: '#0a1f17',
        },
        sage: {
          50: '#f7f9f6',
          100: '#ecf2ed',
          200: '#dbe6dc',
          300: '#c4d8c6',
          400: '#a3c7a8',
          500: '#85b791',
          600: '#6fa17f',
          700: '#558766',
          800: '#446b52',
          900: '#355443',
        },
        coconut: {
          light: '#faf8f3',
          beige: '#e8dcc8',
          dark: '#2d1810',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(45, 120, 96, 0.08)',
        'soft-lg': '0 8px 24px rgba(45, 120, 96, 0.12)',
        'soft-md': '0 6px 16px rgba(45, 120, 96, 0.1)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}
export default config
