import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Router } from '@vaadin/router'

export type AppLinkTarget = '_self' | '_blank' | '_parent' | '_top'

@customElement('app-link')
export class AppLink extends LitElement {
	@property({ type: String })
	href = ''

	@property({ type: String })
	target: AppLinkTarget = '_self'

	@property({ type: String })
	rel = ''

	@property({ type: Boolean })
	disabled = false

	@property({ type: String, attribute: 'aria-label' })
	ariaLabel = ''

	// Отключаем Shadow DOM
	protected createRenderRoot() {
		return this
	}

	connectedCallback() {
		super.connectedCallback()
		// Слушаем клик на самом компоненте
		this.addEventListener('click', this.handleClick)
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this.removeEventListener('click', this.handleClick)
	}

	private handleClick = (e: MouseEvent) => {
		console.log({ href: this.href })

		if (this.disabled) {
			e.preventDefault()
			e.stopPropagation()
			return
		}

		if (this.isExternal || this.target !== '_self') {
			return
		}

		if (this.href) {
			e.preventDefault()
			e.stopPropagation()

			console.log('Navigating to:', this.href)

			Router.go(this.href)

			this.dispatchEvent(
				new CustomEvent('navigate', {
					detail: { href: this.href },
					bubbles: true,
					composed: true,
				})
			)
		}

		this.dispatchEvent(
			new CustomEvent('link-click', {
				detail: { href: this.href, target: this.target },
				bubbles: true,
				composed: true,
			})
		)
	}

	private get isExternal(): boolean {
		if (!this.href) return false
		return (
			this.href.startsWith('http://') ||
			this.href.startsWith('https://') ||
			this.href.startsWith('//')
		)
	}

	private get computedRel(): string {
		if (this.rel) return this.rel
		if (this.isExternal && this.target === '_blank') {
			return 'noopener noreferrer'
		}
		return ''
	}

	render() {
		return html`
			<a
				href=${this.href || '#'}
				target=${this.target}
				rel=${this.computedRel}
				aria-label=${this.ariaLabel}
			>
				<slot></slot>
			</a>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'app-link': AppLink
	}
}
