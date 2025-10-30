import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Question } from './types'

import './ui'
import { repeat } from 'lit/directives/repeat.js'

@customElement('question-component')
export class QuestionComponent extends LitElement {
	static styles = css`
		div {
			flex: 1;
		}

		div + div {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: center;
		}

		.answer {
			margin-bottom: 10px;
		}
	`

	@property({ type: Object, attribute: false })
	question?: Question

	@property({ type: Number })
	scores = 0

	@property({ type: Number, attribute: 'selected-answer-index' })
	private selectedAnswerIndex = -1

	render() {
		return html`
			<div>
				<app-title align="center" aria-level="h2">${this.scores}/5</app-title>
				<app-title align="center" level="h1" color="accent">
					${this.question?.name}
				</app-title>
				${repeat(
					this.question?.answers || [],
					answer => answer,
					(answer, i) =>
						html`<answer-component
							class="answer"
							state="${this.selectedAnswerIndex === i
								? this.question?.rightAnswerIndex === i
									? 'correct'
									: 'incorrect'
								: 'default'}"
							index="${i}"
							>${answer}</answer-component
						>`
				)}
			</div>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'question-component': QuestionComponent
	}
}
