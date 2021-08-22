import sveltePreprocess from "svelte-preprocess"
import { resolve } from "path"

const config = {
  preprocess: [
    sveltePreprocess({
      postcss: true,
    }),
  ],
  kit: {
    target: "#svelte",
    vite: {
      resolve: {
        alias: {
          $src: resolve("./src"),
        },
      },
    },
  },
}

export default config
