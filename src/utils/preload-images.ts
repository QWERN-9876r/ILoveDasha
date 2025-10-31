/**
 * Предзагружает одно изображение
 */
export function preloadImage(url: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const img = new Image()

		img.onload = () => resolve(img)
		img.onerror = () => reject(new Error(`Failed to load image: ${url}`))

		img.src = url
	})
}

/**
 * Предзагружает массив изображений
 */
export function preloadImages(urls: string[]): Promise<HTMLImageElement[]> {
	return Promise.all(urls.map(url => preloadImage(url)))
}

/**
 * Предзагружает изображения с обработкой прогресса
 */
export function preloadImagesWithProgress(
	urls: string[],
	onProgress?: (loaded: number, total: number, percentage: number) => void
): Promise<HTMLImageElement[]> {
	let loadedCount = 0
	const total = urls.length

	const promises = urls.map(url => {
		return new Promise<HTMLImageElement>((resolve, reject) => {
			const img = new Image()

			img.onload = () => {
				loadedCount++
				const percentage = Math.round((loadedCount / total) * 100)
				onProgress?.(loadedCount, total, percentage)
				resolve(img)
			}

			img.onerror = () => {
				loadedCount++
				onProgress?.(loadedCount, total, Math.round((loadedCount / total) * 100))
				reject(new Error(`Failed to load image: ${url}`))
			}

			img.src = url
		})
	})

	return Promise.all(promises)
}
