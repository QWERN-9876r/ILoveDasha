import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import '../components/quiz'
import { QUESTIONS } from '../components/quiz'
import { classMap } from 'lit/directives/class-map.js'

const TIME_ON_HIDE_ANIMATION = 300
const MAX_RING_CLICKS = 10

@customElement('quiz-page')
export class QuizPage extends LitElement {
	static styles = css`
		:host {
			display: flex;
			flex-direction: column;
			min-height: calc(100dvh - 50px);

			flex: 1 1;
		}

		@keyframes show {
			0% {
				opacity: 0;
				transform: translateY(200px);
			}

			100% {
				opacity: 1;
				transform: translateY(0);
			}
		}

		@keyframes close {
			0% {
				transform: translateY(0);
				opacity: 1;
			}

			100% {
				transform: translateY(-200px);
				opacity: 0;
			}
		}

		app-button {
			position: absolute;
			inset-block-end: 15px;

			display: block;
			width: calc(100dvw - 40px);
		}

		question-component {
			animation: show ${TIME_ON_HIDE_ANIMATION}ms forwards;
		}

		question-component.hide {
			animation: close ${TIME_ON_HIDE_ANIMATION}ms forwards;
		}

		.ringWrapper {
			position: absolute;
			width: 100%;
			height: 100%;
			inset: 0;

			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 100;
		}

		@keyframes showRing {
			0% {
				opacity: 0;
				transform: scale(0);
			}

			100% {
				opacity: 1;
				transform: scale(var(--ring-scale, 1));
			}
		}

		@keyframes ringFlyAway {
			0% {
				transform: translateY(0) scale(var(--ring-scale));
			}
			30% {
				transform: translateY(-50vh) scale(var(--ring-scale));
			}
			100% {
				transform: translateY(150vh) scale(var(--ring-scale));
			}
		}

		.ring {
			width: 150px;
			height: 150px;

			position: absolute;
			z-index: 102;

			object-fit: contain;
			cursor: pointer;
			transition: transform 0.3s ease;
			transform: scale(0);
		}

		.ring.show {
			animation: showRing 300ms forwards;
		}

		.ring.flyaway {
			animation: ringFlyAway 2s ease-in forwards;
		}

		.neonBackground {
			background: linear-gradient(135deg, #9b4fff, #764ba2);
			opacity: 0;
			transition:
				opacity 1s ease-in-out 1s,
				background 0.5s ease,
				width 0.3s ease,
				height 0.3s ease,
				transform 0.3s ease;
			animation: pulse 2s ease-in-out infinite;
			border-radius: 50%;
			filter: blur(20px) contrast(20);
			position: relative;
			z-index: 101;
			width: var(--bg-size, 150px);
			height: var(--bg-size, 150px);
		}

		.neonBackground.visible {
			opacity: 0.6;
		}

		.neonBackground::before {
			content: '';
			position: absolute;
			inset: 0;
			background:
				radial-gradient(circle at 30% 50%, transparent 10%, #9b4fff 10%, transparent 20%),
				radial-gradient(circle at 70% 60%, transparent 15%, #764ba2 15%, transparent 25%),
				radial-gradient(circle at 50% 30%, transparent 12%, #ac6dff 12%, transparent 22%);
			border-radius: 50%;
			animation: morph 3s ease-in-out infinite;
		}

		@keyframes hide {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		.ring.flyaway + .neonBackground {
			animation: hide 2s ease-in forwards;
		}

		@keyframes morph {
			0%,
			100% {
				border-radius: 50% 40% 45% 55% / 55% 45% 40% 50%;
			}
			25% {
				border-radius: 45% 55% 50% 40% / 40% 50% 55% 45%;
			}
			50% {
				border-radius: 55% 45% 40% 50% / 50% 40% 45% 55%;
			}
			75% {
				border-radius: 40% 50% 55% 45% / 45% 55% 50% 40%;
			}
		}

		@keyframes pulse {
			0%,
			100% {
				opacity: 0.6;
			}
			50% {
				opacity: 1;
			}
		}
	`

	@state()
	private currentQuestionIndex = 0

	@state()
	private scores = 0

	@state()
	private selectedAnswerIndex = -1

	@state()
	private isAccepted = false

	@state()
	private ringClicks = 0

	@state()
	private ringFlyingAway = false

	@state()
	private ringShown = false

	private lastBodyOverflow = ''
	private lastBodyBackgroundImage = ''

	connectedCallback() {
		super.connectedCallback()

		this.lastBodyOverflow = document.body.style.overflow
		this.lastBodyBackgroundImage = document.body.style.backgroundImage

		document.body.style.overflow = 'hidden'
		document.body.classList.add('darkBg')
		document.body.style.backgroundImage = `url(${this.currentQuestion.bg})`
	}

	disconnectedCallback() {
		super.disconnectedCallback()

		document.body.style.backgroundImage = this.lastBodyOverflow
		document.body.style.overflow = this.lastBodyBackgroundImage
		document.body.classList.remove('darkBg')
	}

	private currentQuestion = QUESTIONS[this.currentQuestionIndex]

	private handleSelectSolution({ detail: { index } }: { detail: { index: number } }) {
		if (this.selectedAnswerIndex !== -1) return

		this.selectedAnswerIndex = index

		if (this.selectedAnswerIndex === this.currentQuestion.rightAnswerIndex) this.scores++
	}

	private answer() {
		this.isAccepted = true

		setTimeout(() => {
			if (this.currentQuestionIndex + 1 < QUESTIONS.length) {
				this.currentQuestionIndex++
				this.selectedAnswerIndex = -1
				this.isAccepted = false

				return
			} else {
				// Показываем кольцо после небольшой задержки
				setTimeout(() => {
					this.ringShown = true
				}, 100)
			}
		}, TIME_ON_HIDE_ANIMATION)
	}

	private handleRingClick() {
		if (this.ringFlyingAway) return

		this.ringClicks++

		// Форсируем перерисовку
		this.requestUpdate()

		if (this.ringClicks >= MAX_RING_CLICKS) {
			this.ringFlyingAway = true
			setTimeout(() => {
				this.dispatchEvent(
					new CustomEvent('ring-complete', { bubbles: true, composed: true })
				)
			}, 2000)
		}
	}

	private getRingScale() {
		return 1 + (this.ringClicks / MAX_RING_CLICKS) * 1.5 // Увеличивается до 2.5x
	}

	private getBackgroundColor() {
		const progress = this.ringClicks / MAX_RING_CLICKS

		if (progress < 0.5) {
			// От фиолетового к промежуточному
			const t = progress * 2
			return `linear-gradient(135deg, 
				rgb(${155 + (255 - 155) * t}, ${79 + (136 - 79) * t}, ${255 - 255 * t}), 
				rgb(${118 + (255 - 118) * t}, ${75 + (95 - 75) * t}, ${162 - 162 * t})
			)`
		} else {
			// От промежуточного к желтому
			const t = (progress - 0.5) * 2
			return `linear-gradient(135deg, 
				rgb(${255}, ${136 + (215 - 136) * t}, ${0}), 
				rgb(${255}, ${95 + (170 - 95) * t}, ${0})
			)`
		}
	}

	private getBackgroundSize() {
		const baseSize = 150
		const scale = this.getRingScale()
		return baseSize * scale
	}

	render() {
		const shouldShowRing = this.currentQuestionIndex === QUESTIONS.length - 1 && this.isAccepted

		this.currentQuestion = QUESTIONS[this.currentQuestionIndex]
		document.body.style.backgroundImage = `url(${this.currentQuestion.bg})`

		const ringScale = this.getRingScale()
		const backgroundColor = this.getBackgroundColor()
		const backgroundSize = this.getBackgroundSize()

		return html`
			<question-component
				@answer-select=${this.handleSelectSolution}
				.question=${this.currentQuestion}
				scores="${this.scores}"
				selected-answer-index="${this.selectedAnswerIndex}"
				class=${classMap({ hide: this.isAccepted })}
			></question-component>
			<div>
				${this.selectedAnswerIndex !== -1 && !shouldShowRing
					? html`<app-button @button-click=${this.answer} animate pulse
							>Дальше</app-button
						>`
					: null}
			</div>
			${shouldShowRing
				? html`<div class="ringWrapper">
						<img
							class="ring ${classMap({
								show: this.ringShown,
								flyaway: this.ringFlyingAway,
							})}"
							src="ring.png"
							alt="Кольцо"
							@click=${this.handleRingClick}
							style="--ring-scale: ${ringScale};"
						/>
						<div
							class="neonBackground ${classMap({ visible: shouldShowRing })}"
							style="--bg-size: ${backgroundSize}px; background: ${backgroundColor};"
						></div>
					</div>`
				: null}
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'quiz-page': QuizPage
	}
}
