// src/utils/sound-manager.ts

import { wait } from './wait'

export interface SoundOptions {
	volume?: number
	loop?: boolean
	playbackRate?: number
}

const TIMEOUT = 3000

export class SoundManager {
	private sounds: Map<string, HTMLAudioElement> = new Map()
	private globalVolume: number = 1
	private muted: boolean = false

	/**
	 * Предзагрузить звуки
	 */
	preload(sounds: Record<string, string>) {
		const promises = Object.entries(sounds).map(([key, src]) => {
			return Promise.race([
				new Promise<void>((resolve, reject) => {
					const audio = new Audio()
					audio.preload = 'auto'

					audio.oncanplaythrough = () => {
						this.sounds.set(key, audio)
						resolve()
					}

					audio.onerror = () => {
						reject(new Error(`Failed to load sound: ${src}`))
					}

					audio.src = src
				}),
				wait(TIMEOUT),
			])
		})

		return promises
	}

	/**
	 * Воспроизвести звук
	 */
	play(key: string, options: SoundOptions = {}): void {
		const sound = this.sounds.get(key)
		if (!sound) {
			console.warn(`Sound "${key}" not found`)
			return
		}

		sound.volume = (options.volume ?? 1) * this.globalVolume * (this.muted ? 0 : 1)
		sound.loop = options.loop ?? false
		sound.playbackRate = options.playbackRate ?? 1

		sound.play().catch(err => {
			console.error('Error playing sound:', err)
		})

		// Удаляем после завершения если не зациклен
		if (!sound.loop) {
			sound.onended = () => {
				sound.remove()
			}
		}
	}

	/**
	 * Остановить все звуки
	 */
	stopAll(): void {
		for (const sound of this.sounds.values()) {
			sound.currentTime = 0
			sound.pause()
		}
	}

	/**
	 * Установить глобальную громкость
	 */
	setVolume(volume: number): void {
		this.globalVolume = Math.max(0, Math.min(1, volume))
	}

	/**
	 * Включить/выключить звук
	 */
	setMuted(muted: boolean): void {
		this.muted = muted
	}

	/**
	 * Получить звук для ручного управления
	 */
	getSound(key: string): HTMLAudioElement | undefined {
		return this.sounds.get(key)
	}
}

// Синглтон
export const soundManager = new SoundManager()
