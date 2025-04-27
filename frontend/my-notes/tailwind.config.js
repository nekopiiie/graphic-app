/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: '#root', // Контейнер вашего приложения
  corePlugins: {
    preflight: false, // Отключаем сброс стилей Tailwind
  },
  theme: {
    extend: {
      colors: {
        // Синхронизация цветов с Chakra
        teal: {
          500: '#319795', // Как colorScheme="teal" в Chakra
        },
        gray: {
          200: '#E2E8F0', // Как borderColor="gray.200"
        }
      }
    },
  },
  plugins: [],
}