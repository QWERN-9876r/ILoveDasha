// src/components/loading-screen.ts
import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { preloadImagesWithProgress } from '../../utils/preload-images'

@customElement('loading-screen')
export class LoadingScreen extends LitElement {
	static styles = css`
		:host {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			min-height: 100vh;
			background: var(--color-bg-gradient-hero);
			color: var(--color-text-primary);
		}

		.loader {
			text-align: center;
			padding: var(--spacing-xl);
		}

		h2 {
			font-size: 28px;
			font-weight: 600;
			margin: 0 0 var(--spacing-sm) 0;
			color: var(--color-text-primary);
			text-shadow: var(--shadow-glow-purple);
		}

		.subtitle {
			font-size: 16px;
			color: var(--color-text-secondary);
			margin: 0 0 var(--spacing-2xl) 0;
		}

		.progress-bar {
			position: relative;
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
			position: relative;
			overflow: hidden;
		}

		/* Анимированный shimmer эффект на прогресс-баре */
		.progress-fill::before {
			content: '';
			position: absolute;
			inset: 0;
			background: var(--effect-shimmer);
			background-size: 200% 100%;
			animation: shimmer 2s linear infinite;
		}

		.status {
			margin-top: var(--spacing-md);
			color: var(--color-text-secondary);
			font-size: 14px;
			font-weight: 500;
		}

		.percentage {
			color: var(--color-primary-400);
			font-weight: 600;
			text-shadow: var(--shadow-glow-purple);
		}

		/* Пульсирующий индикатор загрузки */
		.loading-dots {
			display: inline-flex;
			gap: var(--spacing-xs);
			margin-left: var(--spacing-xs);
		}

		.loading-dots span {
			width: 6px;
			height: 6px;
			background: var(--color-primary-500);
			border-radius: var(--radius-full);
			animation: pulse-dot 1.4s ease-in-out infinite;
			box-shadow: var(--shadow-glow-purple);
		}

		.loading-dots span:nth-child(2) {
			animation-delay: 0.2s;
		}

		.loading-dots span:nth-child(3) {
			animation-delay: 0.4s;
		}

		@keyframes pulse-dot {
			0%,
			80%,
			100% {
				opacity: 0.3;
				transform: scale(0.8);
			}
			40% {
				opacity: 1;
				transform: scale(1.2);
			}
		}

		/* Декоративные элементы */
		.glow-circle {
			position: absolute;
			width: 200px;
			height: 200px;
			border-radius: var(--radius-full);
			background: radial-gradient(circle, var(--color-primary-500) 0%, transparent 70%);
			opacity: 0.2;
			filter: blur(40px);
			animation: float 6s ease-in-out infinite;
		}

		.glow-circle:nth-child(2) {
			background: radial-gradient(circle, var(--color-secondary-500) 0%, transparent 70%);
			animation-delay: -3s;
			animation-duration: 8s;
		}

		@keyframes float {
			0%,
			100% {
				transform: translate(0, 0);
			}
			25% {
				transform: translate(30px, -30px);
			}
			50% {
				transform: translate(-20px, 20px);
			}
			75% {
				transform: translate(20px, 30px);
			}
		}

		/* Holographic border эффект */
		.loader::before {
			content: '';
			position: absolute;
			inset: -2px;
			background: var(--effect-holographic);
			background-size: 400% 400%;
			border-radius: var(--radius-xl);
			opacity: 0.3;
			filter: blur(20px);
			animation: holographic 3s ease-in-out infinite;
			z-index: -1;
		}

		/* Адаптивность */
		@media (max-width: 768px) {
			.progress-bar {
				width: calc(100vw - var(--spacing-3xl));
			}

			h2 {
				font-size: 24px;
			}

			.subtitle {
				font-size: 14px;
			}
		}
	`

	@property({ type: Array, attribute: false })
	images = []

	@property({ type: String })
	title = 'Загрузка изображений'

	@property({ type: String })
	subtitle = 'Подготавливаем романтический квиз...'

	@state()
	private progress = 0

	@state()
	private loaded = 0

	@state()
	private total = 0

	@state()
	private isComplete = false

	async connectedCallback() {
		super.connectedCallback()
		await this.loadAllImages()
	}

	private async loadAllImages() {
		this.total = this.images.length

		try {
			await preloadImagesWithProgress(this.images, (loaded, total, percentage) => {
				this.loaded = loaded
				this.total = total
				this.progress = percentage
			})

			// Небольшая задержка для плавности
			await new Promise(resolve => setTimeout(resolve, 300))

			this.isComplete = true

			// Уведомляем родительский компонент
			this.dispatchEvent(
				new CustomEvent('loading-complete', {
					bubbles: true,
					composed: true,
					detail: { totalImages: this.total },
				})
			)
		} catch (error) {
			console.error('Error loading images:', error)
			this.dispatchEvent(
				new CustomEvent('loading-error', {
					bubbles: true,
					composed: true,
					detail: { error },
				})
			)
		}
	}

	render() {
		if (this.isComplete) {
			return html``
		}

		return html`
			<!-- Декоративные светящиеся круги -->
			<div class="glow-circle"></div>
			<div class="glow-circle"></div>

			<div class="loader">
				<h2>${this.title}</h2>
				${this.subtitle ? html`<p class="subtitle">${this.subtitle}</p>` : ''}

				<div class="progress-bar">
					<div class="progress-fill" style="width: ${this.progress}%"></div>
				</div>

				<div class="status">
					${this.loaded} / ${this.total}
					<span class="percentage">(${this.progress}%)</span>
					<span class="loading-dots">
						<span></span>
						<span></span>
						<span></span>
					</span>
				</div>
			</div>
		`
	}
}
