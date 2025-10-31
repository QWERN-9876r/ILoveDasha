import { defineConfig } from 'vite'
import litcss from 'vite-plugin-lit-css'

export default defineConfig({
	build: {
		outDir: 'dist',
		emptyOutDir: true,
	},
	preview: {
		host: '0.0.0.0',
		port: 80,
	},
	plugins: [
		litcss({
			include: /\.scss$/,
		}),
	],
	assetsInclude: ['**/*.scss'],
})
