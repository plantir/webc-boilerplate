import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelte } from "@sveltejs/vite-plugin-svelte";
export default defineConfig({
	plugins: [tailwindcss(), svelte()],
	build: {
		minify: true,
		lib: {
			name: 'lead-form',
			entry: 'src/main.js'
		},
		rollupOptions: {
			output: {
				assetFileNames: `assets/web-component.css`,
				entryFileNames: 'assets/web-component.js'
			}
		}
	}
});
