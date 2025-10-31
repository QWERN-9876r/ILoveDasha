import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('icon-arrow-left')
export class IconArrowLeft extends LitElement {
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
				<path d="M19 12H5M12 19l-7-7 7-7" />
			</svg>
		`
	}
}
