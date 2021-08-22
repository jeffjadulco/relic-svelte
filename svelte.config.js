import { resolve } from "path"
import sveltePreprocess from "svelte-preprocess"
import vercel from "@sveltejs/adapter-vercel"

const config = {
  preprocess: [
    sveltePreprocess({
      postcss: true,
    }),
  ],
  kit: {
    target: "#svelte",
    adapter: vercel(),
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
