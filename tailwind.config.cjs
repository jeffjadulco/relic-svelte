const { fontFamily } = require("tailwindcss/defaultTheme")

const config = {
  mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        serif: ["Space Mono", ...fontFamily.serif],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}

module.exports = config
