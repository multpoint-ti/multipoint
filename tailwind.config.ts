import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-ignition": "#0A223D",
        "red-amber-torque": "#EB2121",
        "gray-oxide-steel": "#D9D9DF",
        "gray-shuttle-white": "#FEFEFE",
        "blue-gravel-mist": "#0944DB",
        "gray-soft": "#F4F4F4",
      },
    },
  },
  plugins: [],
}
export default config
