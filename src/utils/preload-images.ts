import { wait } from './wait'

const TIMEOUT = 3000

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
) {
	let loadedCount = 0
	const total = urls.length

	const promises = urls.map(url => {
		let isLoaded = false

		const onLoad = () => {
			if (isLoaded) return

			isLoaded = true
			loadedCount++
			const percentage = Math.round((loadedCount / total) * 100)
			onProgress?.(loadedCount, total, percentage)
		}
		return Promise.race([
			new Promise<HTMLImageElement>((resolve, reject) => {
				const img = new Image()

				img.onload = () => {
					onLoad()
					resolve(img)
				}

				img.onerror = () => {
					loadedCount++
					onProgress?.(loadedCount, total, Math.round((loadedCount / total) * 100))
					reject(new Error(`Failed to load image: ${url}`))
				}

				img.src = url
			}),
			wait(TIMEOUT).then(onLoad),
		])
	})

	return Promise.all(promises)
}
