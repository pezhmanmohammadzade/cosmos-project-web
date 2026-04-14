/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#020205', /* Slightly shifted from #050505 for a midnight core */
        cosmo: {
          dark: '#010103',
          navy: '#060B19',
          indigo: '#180B3A',
          midnight: '#0C0A20',
          blue: '#00D2FF',
          purple: '#BD00FF',
          violet: '#7A00FF',
          gold: '#FFD700',
          red: '#FF3D3D',
          aurora: '#00FFD1',
          cyan: '#00FFFF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
