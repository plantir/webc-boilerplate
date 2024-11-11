import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { sveltekit } from '@sveltejs/kit/vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify:true,
    lib:{
      name:'lead-form',
      entry:'src/main.js',
    },
    rollupOptions: {
      output: {
        assetFileNames: `assets/web-component.css`,
        entryFileNames: "assets/web-component.js",
      },
    },
  },
  plugins: [
    svelte({
      // compilerOptions: {
      //   customElement: true
      // }
    }),
  ],
});
