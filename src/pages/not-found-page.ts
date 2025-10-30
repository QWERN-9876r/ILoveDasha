import { Router } from '@vaadin/router'
import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('not-found-page')
export class NotFoundPage extends LitElement {
	static styles = css`
		:host {
			display: flex;
			align-items: center;
			justify-content: center;

			min-width: calc(100dvw - 40px);
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

		.title {
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

	private handleButtonClick() {
		Router.go('/')
	}

	render() {
		return html`
			<div class="content">
				<img class="error" src="not-found-image.jpg" alt="" />
				<app-title class="title" level="h1">РЫЖИК!!!</app-title>
				<app-button @button-click=${this.handleButtonClick}>К играм</app-button>
			</div>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'not-found-page': NotFoundPage
	}
}
