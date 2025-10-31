import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '../components/all-games'

@customElement('home-page')
export class HomePage extends LitElement {
	render() {
		return html`<app-title level="h1" align="center"
				>Это сайт о том как я тебя люблю ♥️</app-title
			><all-games></all-games>`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'home-page': HomePage
	}
}
