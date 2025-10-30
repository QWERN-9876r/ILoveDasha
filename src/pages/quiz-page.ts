import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import '../components/quiz'
import { QUESTIONS } from '../components/quiz'
import { classMap } from 'lit/directives/class-map.js'

const TIME_ON_HIDE_ANIMATION = 300

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
		}

		@keyframes showRing {
			0% {
				transform: scale(0);
			}

			100% {
				transform: scale(1);
			}
		}

		.ring {
			width: calc(100dvw - 40px);

			position: absolute;
			z-index: 100;

			object-fit: cover;
			transition: transform 1s ease-in-out;
			transform: scale(0);

			animation: showRing 300ms forwards;
		}

		.neonBackground {
			width: calc(100dvw - 40px);
			height: calc(100dvw - 40px);
			background: linear-gradient(135deg, #ffd700, #ffaa00);
			opacity: 0;
			transition: opacity 1s ease-in-out 1s;
			animation: pulse 2s ease-in-out infinite;
			border-radius: 50%;
			filter: blur(20px) contrast(20);
			position: relative;
		}

		.neonBackground::before {
			content: '';
			position: absolute;
			inset: 0;
			background:
				radial-gradient(circle at 30% 50%, transparent 10%, #ffd700 10%, transparent 20%),
				radial-gradient(circle at 70% 60%, transparent 15%, #ffaa00 15%, transparent 25%),
				radial-gradient(circle at 50% 30%, transparent 12%, #ffcc33 12%, transparent 22%);
			border-radius: 50%;
			animation: morph 3s ease-in-out infinite;
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
				transform: scale(1);
			}
			50% {
				opacity: 1;
				transform: scale(1.05);
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
			}
		}, TIME_ON_HIDE_ANIMATION)
	}

	render() {
		const shouldShowRing = this.currentQuestionIndex === QUESTIONS.length - 1 && this.isAccepted

		this.currentQuestion = QUESTIONS[this.currentQuestionIndex]
		document.body.style.backgroundImage = `url(${this.currentQuestion.bg})`

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
						<img class="ring" src="ring.png" alt="" />
						<div class="neonBackground"></div>
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
