/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gflo-sovereign': '#2563eb',
        'gflo-ai': '#7c3aed',
        'gflo-ethics': '#10b981',
        'gflo-xp': '#f59e0b',
        'gflo-gas': '#ef4444',
      },
      backgroundImage: {
        'gradient-sovereign': 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        'gradient-ai': 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
        'gradient-ethics': 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
        'pulse-fast': 'pulse 1.5s infinite',
        'float': 'float 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
