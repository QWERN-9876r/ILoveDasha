import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('not-found-page')
export class NotFoundPage extends LitElement {
	static styles = css`
		:host {
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 400px;
		}

		.content {
			text-align: center;
		}

		.error {
			display: block;

			width: calc(80dvw - 40px);
			border-radius: 16px;
		}

		h1 {
			color: #bd1818;
			margin: 20px 0;
		}

		p {
			color: #7f8c8d;
			font-size: 18px;
		}

		a {
			display: inline-block;
			margin-top: 20px;
			padding: 12px 24px;
			background-color: #3498db;
			color: white;
			text-decoration: none;
			border-radius: 4px;
			transition: background-color 0.3s;
		}

		a:hover {
			background-color: #2980b9;
		}
	`

	render() {
		return html`
			<div class="content">
				<img class="error" src="not-found-image.jpg" alt="" />
				<h1>РЫЖИК!!!</h1>
				<a href="/">К играм</a>
			</div>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'not-found-page': NotFoundPage
	}
}
