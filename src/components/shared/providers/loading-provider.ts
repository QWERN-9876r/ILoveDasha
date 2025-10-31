// src/components/loading-provider.ts
import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { preloadImagesWithProgress } from '../../../utils/preload-images'

@customElement('loading-provider')
export class LoadingProvider extends LitElement {
	static styles = css`
		:host {
			display: block;
		}

		.loading-overlay {
			position: fixed;
			inset: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background: var(--color-bg-primary);
			color: var(--color-text-primary);
			z-index: var(--z-modal);
			transition:
				opacity var(--transition-slow),
				visibility var(--transition-slow);
		}

		.loading-overlay.hidden {
			opacity: 0;
			visibility: hidden;
			pointer-events: none;
		}

		.loader-content {
			text-align: center;
			padding: var(--spacing-xl);
		}

		h2 {
			font-size: 28px;
			margin: 0 0 var(--spacing-sm) 0;
			font-weight: 600;
			color: var(--color-text-primary);
			text-shadow: var(--shadow-glow-purple);
		}

		.subtitle {
			font-size: 16px;
			color: var(--color-text-secondary);
			margin: 0 0 var(--spacing-2xl) 0;
		}

		.progress-bar {
			width: 300px;
			height: 8px;
			background: var(--color-bg-tertiary);
			border-radius: var(--radius-full);
			overflow: hidden;
			margin: var(--spacing-lg) auto;
			box-shadow: var(--shadow-md);
			border: 1px solid var(--color-border-primary);
		}

		.progress-fill {
			height: 100%;
			background: linear-gradient(90deg, var(--color-secondary-500), var(--color-accent-500));
			transition: width var(--transition-base);
			border-radius: var(--radius-full);
			box-shadow: var(--shadow-glow-pink);
		}

		.status {
			margin-top: var(--spacing-md);
			color: var(--color-text-secondary);
			font-size: 14px;
			font-weight: 500;
		}

		.spinner {
			width: 50px;
			height: 50px;
			border: 4px solid var(--color-border-primary);
			border-top-color: var(--color-primary-500);
			border-radius: var(--radius-full);
			animation: spin 1s linear infinite;
			margin: var(--spacing-lg) auto;
			box-shadow: var(--shadow-glow-purple);
		}

		@keyframes spin {
			to {
				transform: rotate(360deg);
			}
		}

		.error-message {
			color: var(--color-error-500);
			padding: var(--spacing-lg);
			background: var(--color-bg-tertiary);
			border-radius: var(--radius-lg);
			margin-top: var(--spacing-lg);
			border: 1px solid var(--color-border-error);
			box-shadow: var(--shadow-md);
		}

		@keyframes fadeIn {
			from {
				opacity: 0;
				transform: translateY(var(--spacing-lg));
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		.content-wrapper.loaded {
			animation: fadeIn var(--transition-slow) ease;
		}

		@media (max-width: 768px) {
			.progress-bar {
				width: calc(100vw - var(--spacing-3xl));
			}
		}
	`

	/**
	 * Массив URL изображений для предзагрузки
	 */
	@property({ type: Array, attribute: false })
	images: string[] = []

	/**
	 * Массив промисов загрузки
	 */
	@property({ type: Array, attribute: false })
	promises: Promise<void>[] = []

	/**
	 * Заголовок экрана загрузки
	 */
	@property({ type: String })
	title = 'Подожди...'

	/**
	 * Подзаголовок
	 */
	@property({ type: String })
	subtitle = 'Минуточку сейчас все будет!'

	/**
	 * Показывать ли процент загрузки
	 */
	@property({ type: Boolean, attribute: 'show-percentage' })
	showPercentage = true

	/**
	 * Показывать ли счетчик файлов
	 */
	@property({ type: Boolean, attribute: 'show-counter' })
	showCounter = true

	/**
	 * Показывать ли спиннер
	 */
	@property({ type: Boolean, attribute: 'show-spinner' })
	showSpinner = false

	/**
	 * Минимальное время показа загрузки (мс)
	 */
	@property({ type: Number, attribute: 'min-duration' })
	minDuration = 500

	/**
	 * Задержка перед скрытием загрузки (мс)
	 */
	@property({ type: Number, attribute: 'fade-delay' })
	fadeDelay = 300

	@state()
	private progress = 0

	@state()
	private loaded = 0

	@state()
	private total = 0

	@state()
	private isComplete = false

	@state()
	private hasError = false

	@state()
	private errorMessage = ''

	@state()
	private startTime = 0

	async connectedCallback() {
		super.connectedCallback()
		this.startTime = Date.now()
		this.total = this.images.length + this.promises.length

		await this.loadAll()

		await this.completeLoading()
	}

	private async loadAll() {
		return Promise.all([
			this.loadAllImages(),
			...this.promises.map(promise =>
				promise.then(res => {
					this.loaded++
					this.progress = Math.round((this.loaded / this.total) * 100)

					return res
				})
			),
		])
	}

	private async loadAllImages() {
		try {
			await preloadImagesWithProgress(this.images, () => {
				this.loaded++
				this.progress = Math.round((this.loaded / this.total) * 100)

				// Отправляем событие прогресса
				this.dispatchEvent(
					new CustomEvent('loading-progress', {
						bubbles: true,
						composed: true,
						detail: {
							loaded: this.loaded,
							total: this.total,
							percentage: this.progress,
						},
					})
				)
			})
		} catch (error) {
			this.handleError(error as Error)
		}
	}

	private async completeLoading() {
		// Убеждаемся, что прошло минимальное время
		const elapsed = Date.now() - this.startTime
		const remaining = Math.max(0, this.minDuration - elapsed)

		if (remaining > 0) {
			await new Promise(resolve => setTimeout(resolve, remaining))
		}

		// Задержка перед скрытием
		await new Promise(resolve => setTimeout(resolve, this.fadeDelay))

		this.isComplete = true

		// Уведомляем родительский компонент
		this.dispatchEvent(
			new CustomEvent('loading-complete', {
				bubbles: true,
				composed: true,
				detail: {
					totalImages: this.total,
					duration: Date.now() - this.startTime,
				},
			})
		)
	}

	private handleError(error: Error) {
		this.hasError = true
		this.errorMessage = error.message

		console.error('Loading error:', error)

		this.dispatchEvent(
			new CustomEvent('loading-error', {
				bubbles: true,
				composed: true,
				detail: { error },
			})
		)

		// Опционально: показать контент даже при ошибке через некоторое время
		setTimeout(() => {
			this.isComplete = true
		}, 2000)
	}

	/**
	 * Публичный метод для принудительного завершения загрузки
	 */
	public forceComplete() {
		this.isComplete = true
	}

	/**
	 * Публичный метод для сброса состояния
	 */
	public reset() {
		this.progress = 0
		this.loaded = 0
		this.total = 0
		this.isComplete = false
		this.hasError = false
		this.errorMessage = ''
		this.startTime = Date.now()
	}

	private renderLoadingScreen() {
		return html`
			<div class="loading-overlay ${this.isComplete ? 'hidden' : ''}">
				<div class="loader-content">
					<h2>${this.title}</h2>
					${this.subtitle ? html`<p class="subtitle">${this.subtitle}</p>` : ''}
					${this.showSpinner ? html`<div class="spinner"></div>` : ''}
					${this.total > 0
						? html`
								<div class="progress-bar">
									<div
										class="progress-fill"
										style="width: ${this.progress}%"
									></div>
								</div>

								<div class="status">
									${this.showCounter ? html`${this.loaded} / ${this.total}` : ''}
									${this.showPercentage ? html`(${this.progress}%)` : ''}
								</div>
							`
						: ''}
					${this.hasError
						? html`
								<div class="error-message">
									<strong>Ошибка:</strong> ${this.errorMessage}
								</div>
							`
						: ''}

					<!-- Слот для кастомного контента загрузки -->
					<slot name="loading"></slot>
				</div>
			</div>
		`
	}

	render() {
		return html`
			${this.renderLoadingScreen()}

			<div class="${this.isComplete ? 'loaded' : ''}">
				${this.isComplete ? html`<slot></slot>` : ''}
			</div>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'loading-provider': LoadingProvider
	}
}
