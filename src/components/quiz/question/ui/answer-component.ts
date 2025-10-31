import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styles } from './answer-component.css'

export type AnswerState = 'default' | 'selected' | 'correct' | 'incorrect'

@customElement('answer-component')
export class AnswerComponent extends LitElement {
	static styles = styles

	@property({ type: Number })
	index = 0

	@property({ type: String, reflect: true })
	state: AnswerState = 'default'

	@property({ type: Boolean })
	disabled = false

	@property({ attribute: false })
	onClick?: (index: number) => void

	private handleClick() {
		if (this.disabled || this.state !== 'default') return

		if (this.onClick) {
			this.onClick(this.index)
		}

		this.dispatchEvent(
			new CustomEvent('answer-select', {
				detail: { index: this.index },
				bubbles: true,
				composed: true,
			})
		)
	}

	private getLetterLabel(): string {
		const letters = ['A', 'B', 'C', 'D']
		return letters[this.index % letters.length]
	}

	private renderResultIcon() {
		if (this.state === 'correct') {
			return html`<span class="result-icon">✓</span>`
		}
		if (this.state === 'incorrect') {
			return html`<span class="result-icon">✗</span>`
		}
		return null
	}

	render() {
		return html`
			<div
				class="answer-wrapper ${this.state} ${this.disabled ? 'disabled' : ''}"
				@click=${this.handleClick}
			>
				<div class="answer-content">
					<div class="answer-letter">${this.getLetterLabel()}</div>

					<div class="answer-text">
						<slot></slot>
					</div>

					${this.renderResultIcon()}
				</div>
			</div>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'answer-component': AnswerComponent
	}
}
