import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import { classMap } from 'lit/directives/class-map.js'
import { Router } from '@vaadin/router'

import { NavLink } from '../app-root'

interface Game {
	path: NavLink
	icon: string
}

const GAMES: Game[] = [{ path: '/quiz', icon: 'game-1-icon.png' }]

@customElement('all-games')
export class AllGames extends LitElement {
	static styles = css`
		:host {
			display: block;
			width: 100%;
			transition: all 300ms;
		}

		.navbar {
			padding: 0;
		}

		.nav-list {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			width: calc(100dvw - 40px);
			height: 100%;
			list-style: none;
			margin: 0;
			padding: 0;
			display: flex;
			flex-direction: row;
			gap: 0;
		}

		.nav-item {
			display: block;
		}

		.nav-link img {
			width: calc(80dvw - 40px);
			max-width: 500px;
		}

		.nav-link::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 3px;
			background-color: white;
			transform: scaleX(0);
			transition: transform 0.3s ease;
		}

		.nav-link img {
			transition: transform 0.3s ease;
		}

		.nav-link img:hover {
			transform: scale(1.1);
		}

		.nav-link.active::after {
			transform: scaleX(1);
		}

		.nav-icon {
			font-size: 24px;
		}

		.nav-label {
			font-size: 12px;
			text-align: center;
		}

		@media (max-width: 768px) {
			.nav-label {
				display: none;
			}

			.nav-link {
				min-height: 50px;
				padding: 12px;
			}

			.nav-icon {
				font-size: 20px;
			}
		}
	`

	@state()
	private currentPath = '/'

	private unsubscribe?: () => void

	disconnectedCallback() {
		super.disconnectedCallback()
		this.unsubscribe?.()
	}

	private handleLinkClick(e: Event, path: string) {
		e.preventDefault()

		Router.go(path)
	}

	private isActive(path: string): boolean {
		return this.currentPath === path
	}

	render() {
		return html`
			<nav class="navbar">
				<ul class="nav-list">
					${repeat(
						GAMES,
						game => game.path,
						({ icon, path }) => html`
							<li class="nav-item">
								<a
									href="${path}"
									class=${classMap({
										'nav-link': true,
										active: this.isActive(path),
									})}
									@click=${(e: Event) => this.handleLinkClick(e, path)}
								>
									<img src="${icon}" alt="" />
								</a>
							</li>
						`
					)}
				</ul>
			</nav>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'all-games': AllGames
	}
}
