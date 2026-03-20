/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#6C47FF', dark: '#4F2FD6', light: '#EDE9FF' },
        accent: { DEFAULT: '#00D4AA', light: '#E0FBF5' },
        surface: '#F8F7FF',
        card: '#FFFFFF',
        border: '#E4E2F0',
        text: { primary: '#1A1033', secondary: '#6B7280', muted: '#A0A3B1' },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(108,71,255,0.08), 0 8px 24px rgba(108,71,255,0.06)',
        button: '0 4px 14px rgba(108,71,255,0.35)',
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
      }
    }
  },
  plugins: [],
}
