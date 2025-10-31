import { defineConfig } from 'vite'
import litcss from 'vite-plugin-lit-css'

export default defineConfig({
	build: {
		outDir: 'dist',
		emptyOutDir: true,
	},
	preview: {
		port: 80,
	},
	plugins: [
		litcss({
			include: /\.scss$/,
		}),
	],
	assetsInclude: ['**/*.scss'],
})
