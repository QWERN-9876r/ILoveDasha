import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { Router } from '@vaadin/router'

import '../pages'
import { PRELOAD_AUDIO, PRELOAD_IMAGES } from '../utils/constants'
import { soundManager } from '../utils/audio'

export type NavLink = '/' | '/quiz'

@customElement('app-root')
export class AppRoot extends LitElement {
	static styles = css`
		:host {
			display: block;
			min-height: 100vh;
		}

		.app-container {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			margin: 0;
			padding: 15px 20px;

			min-height: 100dvh;
			width: 100dvw;
		}

		header {
			position: sticky;
			top: 0;
			z-index: 100;
			background: white;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		}

		main {
			flex: 1;
			max-width: var(--max-layout-width);
		}

		footer {
			color: white;
			padding: 20px 5px 0 0;
			text-align: end;
		}
	`

	@state()
	private router?: Router

	firstUpdated() {
		const outlet = this.shadowRoot?.getElementById('outlet')
		if (outlet) {
			this.router = new Router(outlet)
			this.router.setRoutes([
				{ path: '/', component: 'home-page' },
				{ path: '/quiz', component: 'quiz-page' },
				{ path: '(.*)', component: 'not-found-page' },
			])
		}

		this.addEventListener('navigate', ((e: CustomEvent) => {
			Router.go(e.detail.path)
		}) as EventListener)
	}

	render() {
		return html`
			<loading-provider
				.promises=${soundManager.preload(PRELOAD_AUDIO)}
				.images=${PRELOAD_IMAGES}
				><div class="app-container">
					<main id="outlet"></main></div
			></loading-provider>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'app-root': AppRoot
	}
}
