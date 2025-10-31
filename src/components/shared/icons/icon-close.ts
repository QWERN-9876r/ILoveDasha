import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('icon-close')
export class IconClose extends LitElement {
	static styles = css`
		:host {
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}

		svg {
			width: var(--icon-size, 20px);
			height: var(--icon-size, 20px);
			stroke: currentColor;
		}
	`

	@property({ type: Number })
	size = 20

	@property({ type: Number, attribute: 'stroke-width' })
	strokeWidth = 2

	render() {
		return html`
			<svg
				width="${this.size}"
				height="${this.size}"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="${this.strokeWidth}"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		`
	}
}
