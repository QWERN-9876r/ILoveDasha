import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		outDir: 'dist',
		emptyOutDir: true,
	},
	preview: {
		host: '0.0.0.0',
		port: 8080,
	},
	assetsInclude: ['**/*.scss'],
})
