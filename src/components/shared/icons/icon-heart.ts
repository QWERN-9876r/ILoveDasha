import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('icon-heart')
export class IconHeart extends LitElement {
	static styles = css`
		:host {
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}

		svg {
			width: 100%;
			height: 100%;
			stroke: currentColor;
		}

		svg[filled] {
			fill: var(--icon-fill, currentColor);
		}
	`

	@property({ type: Number })
	size = 20

	@property({ type: Number, attribute: 'stroke-width' })
	strokeWidth = 2

	@property({ type: Boolean })
	filled = false

	render() {
		return html`
			<svg
				width="${this.size}"
				height="${this.size}"
				viewBox="0 0 24 24"
				fill="${this.filled ? 'currentColor' : 'none'}"
				stroke="currentColor"
				stroke-width="${this.strokeWidth}"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path
					d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
				></path>
			</svg>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'icon-heart': IconHeart
	}
}
